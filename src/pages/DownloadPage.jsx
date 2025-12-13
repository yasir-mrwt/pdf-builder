import React, { useState, useEffect } from "react";
import { Download, Share2, ArrowLeft, Check } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { useToast } from "../hooks/useToast";
import { useRouter } from "../utils/router";
import { pdfAPI } from "../services/api";

const DownloadPage = () => {
  const { isAuthenticated } = useAuth();
  const { showToast } = useToast();
  const { navigate } = useRouter();
  const [pdfData, setPdfData] = useState(null);
  const [shareLink, setShareLink] = useState("");
  const [isLoadingShare, setIsLoadingShare] = useState(false);
  const [hasShareLink, setHasShareLink] = useState(false);

  useEffect(() => {
    const storedPDF = localStorage.getItem("currentPDF");
    if (storedPDF) {
      setPdfData(JSON.parse(storedPDF));
    } else {
      showToast("No PDF found. Please generate one first.", "error");
      navigate("generator");
    }
  }, []);

  const handleDownload = async () => {
    if (!isAuthenticated) {
      showToast("Please login to download your PDF", "error");
      navigate("login");
      return;
    }

    try {
      // Get download URL from backend
      const response = await pdfAPI.getDownloadURL(pdfData.pdfId);

      if (response.success) {
        // Open download URL in new tab
        window.open(response.data.downloadUrl, "_blank");
        showToast("PDF download started!", "success");
      }
    } catch (error) {
      console.error("Download error:", error);
      showToast(error.message || "Failed to download PDF", "error");
    }
  };

  const handleCreateShareLink = async () => {
    if (!isAuthenticated) {
      showToast("Please login to create share links", "error");
      navigate("login");
      return;
    }

    setIsLoadingShare(true);

    try {
      const response = await pdfAPI.createShareLink(pdfData.pdfId, {
        expiresInDays: 30,
      });

      if (response.success) {
        setShareLink(response.data.shareUrl);
        setHasShareLink(true);
        showToast("Share link created!", "success");
      }
    } catch (error) {
      console.error("Share link error:", error);
      showToast(error.message || "Failed to create share link", "error");
    } finally {
      setIsLoadingShare(false);
    }
  };

  const handleCopyShareLink = () => {
    if (shareLink) {
      navigator.clipboard.writeText(shareLink);
      showToast("Share link copied to clipboard!", "success");
    } else {
      handleCreateShareLink();
    }
  };

  if (!pdfData) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gray-200 border-t-gray-900 rounded-full animate-spin mx-auto"></div>
          <p className="mt-6 text-gray-500">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-32 pb-20">
      <div className="max-w-3xl mx-auto px-6">
        {/* Success Message */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-900 rounded-full mb-8">
            <Check className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-6xl font-semibold text-gray-900 mb-4">All Set</h1>
          <p className="text-xl text-gray-500 font-light">
            Your document is ready to download
          </p>
          {pdfData.aiGenerated && (
            <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full text-sm text-gray-700">
              ✨ Content generated with AI
            </div>
          )}
        </div>

        {/* PDF Preview */}
        <div className="bg-gray-50 rounded-2xl p-12 mb-12">
          <div className="space-y-4">
            <div className="text-3xl font-semibold text-gray-900">
              {pdfData.title}
            </div>
            <div className="text-sm text-gray-500">PDF ID: {pdfData.pdfId}</div>
            <div className="text-sm text-gray-500">
              Size: {(pdfData.size / 1024).toFixed(2)} KB
            </div>
            <div className="text-sm text-gray-500">
              Status: {pdfData.status}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4 mb-12">
          <button
            onClick={handleDownload}
            disabled={!isAuthenticated}
            className="w-full px-8 py-5 bg-black text-white text-base font-medium rounded-full hover:bg-gray-800 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <Download size={20} />
            {isAuthenticated ? "Download PDF" : "Login to Download"}
          </button>

          <button
            onClick={handleCopyShareLink}
            disabled={!isAuthenticated || isLoadingShare}
            className="w-full px-8 py-5 bg-white text-gray-900 text-base font-medium rounded-full border-2 border-gray-200 hover:border-gray-900 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <Share2 size={20} />
            {isLoadingShare
              ? "Creating Share Link..."
              : hasShareLink
              ? "Copy Share Link"
              : "Create Share Link"}
          </button>
        </div>

        {/* Login Prompt */}
        {!isAuthenticated && (
          <div className="bg-gray-50 rounded-2xl p-8 mb-12">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Login Required
            </h3>
            <p className="text-gray-600 mb-4">
              Create a free account to download your PDF document and create
              share links
            </p>
            <button
              onClick={() => navigate("login")}
              className="text-sm font-medium text-gray-900 hover:underline"
            >
              Login Now →
            </button>
          </div>
        )}

        {/* Share Link Display */}
        {shareLink && (
          <div className="border-t border-gray-200 pt-12">
            <label className="block text-sm font-medium text-gray-900 mb-4">
              Shareable Link
            </label>
            <div className="flex gap-3">
              <input
                type="text"
                value={shareLink}
                readOnly
                className="flex-1 px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl text-sm text-gray-600"
              />
              <button
                onClick={handleCopyShareLink}
                className="px-6 py-3 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-colors"
              >
                Copy
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-3">
              Anyone with this link can download your PDF (expires in 30 days)
            </p>
          </div>
        )}

        {/* Direct View Link */}
        {isAuthenticated && pdfData.fileUrl && (
          <div className="mt-8">
            <a
              href={pdfData.fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-600 hover:text-gray-900 underline"
            >
              View PDF in browser →
            </a>
          </div>
        )}

        {/* Back Button */}
        <div className="mt-12 text-center">
          <button
            onClick={() => navigate("generator")}
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft size={16} />
            Generate Another PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default DownloadPage;
