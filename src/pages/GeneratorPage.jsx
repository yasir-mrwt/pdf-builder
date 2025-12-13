import React, { useState } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { useToast } from "../hooks/useToast";
import { useRouter } from "../utils/router";
import { pdfAPI } from "../services/api";

const GeneratorPage = () => {
  const { showToast } = useToast();
  const { navigate } = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    name: "",
    email: "",
    description: "",
    notes: "",
  });
  const [useAI, setUseAI] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleGenerate = async () => {
    if (!formData.title || !formData.name) {
      showToast("Please fill in title and name", "error");
      return;
    }

    setIsLoading(true);

    try {
      // Call backend API
      const response = await pdfAPI.generate({
        ...formData,
        useLLM: useAI,
      });

      if (response.success) {
        // Store PDF data for download page
        localStorage.setItem("currentPDF", JSON.stringify(response.data));

        showToast(
          useAI
            ? "AI content generated and PDF created!"
            : "PDF generated successfully!",
          "success"
        );

        navigate("download");
      } else {
        showToast("PDF generation failed", "error");
      }
    } catch (error) {
      console.error("Generation error:", error);
      showToast(error.message || "Failed to generate PDF", "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white pt-32 pb-20">
      <div className="max-w-3xl mx-auto px-6">
        <div className="mb-16">
          <h1 className="text-6xl font-semibold text-gray-900 mb-4">
            Generate PDF
          </h1>
          <p className="text-xl text-gray-500 font-light">
            Fill in your details to create a professional document
          </p>
        </div>

        <div className="space-y-8">
          {/* Title */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-900">
              Document Title *
            </label>
            <input
              type="text"
              placeholder="Enter document title"
              value={formData.title}
              onChange={(e) => handleChange("title", e.target.value)}
              disabled={isLoading}
              className="w-full px-0 py-4 border-b-2 border-gray-200 focus:border-gray-900 outline-none text-lg transition-colors bg-transparent placeholder:text-gray-400 disabled:opacity-50"
            />
          </div>

          {/* Name */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-900">
              Your Name *
            </label>
            <input
              type="text"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              disabled={isLoading}
              className="w-full px-0 py-4 border-b-2 border-gray-200 focus:border-gray-900 outline-none text-lg transition-colors bg-transparent placeholder:text-gray-400 disabled:opacity-50"
            />
          </div>

          {/* Email */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-900">
              Email Address
            </label>
            <input
              type="email"
              placeholder="your@email.com"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              disabled={isLoading}
              className="w-full px-0 py-4 border-b-2 border-gray-200 focus:border-gray-900 outline-none text-lg transition-colors bg-transparent placeholder:text-gray-400 disabled:opacity-50"
            />
          </div>

          {/* Description */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-900">
              Description {useAI && "(AI will enhance this)"}
            </label>
            <textarea
              placeholder={
                useAI
                  ? "Describe what you want the AI to write about..."
                  : "Enter a detailed description..."
              }
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              disabled={isLoading}
              className="w-full px-0 py-4 border-b-2 border-gray-200 focus:border-gray-900 outline-none text-lg transition-colors resize-none bg-transparent placeholder:text-gray-400 disabled:opacity-50"
              rows="3"
            />
          </div>

          {/* Notes */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-900">
              Additional Notes
            </label>
            <textarea
              placeholder="Any additional information..."
              value={formData.notes}
              onChange={(e) => handleChange("notes", e.target.value)}
              disabled={isLoading}
              className="w-full px-0 py-4 border-b-2 border-gray-200 focus:border-gray-900 outline-none text-lg transition-colors resize-none bg-transparent placeholder:text-gray-400 disabled:opacity-50"
              rows="2"
            />
          </div>

          {/* AI Toggle */}
          <div className="pt-8 pb-4">
            <button
              onClick={() => setUseAI(!useAI)}
              disabled={isLoading}
              className={`w-full p-6 border-2 rounded-2xl transition-all ${
                useAI
                  ? "border-black bg-black/5"
                  : "border-gray-200 hover:border-gray-300"
              } disabled:opacity-50`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Sparkles
                    className={useAI ? "text-black" : "text-gray-400"}
                    size={24}
                  />
                  <div className="text-left">
                    <div className="text-base font-medium text-gray-900">
                      Use AI Content Generation
                    </div>
                    <div className="text-sm text-gray-500">
                      Let AI write professional content for your PDF
                    </div>
                  </div>
                </div>
                <div
                  className={`w-12 h-6 rounded-full transition-colors ${
                    useAI ? "bg-black" : "bg-gray-300"
                  }`}
                >
                  <div
                    className={`w-5 h-5 bg-white rounded-full transition-transform transform ${
                      useAI ? "translate-x-6" : "translate-x-0.5"
                    } mt-0.5`}
                  />
                </div>
              </div>
            </button>
          </div>

          {/* Preview */}
          {(formData.title || formData.name) && (
            <div className="mt-16 pt-16 border-t border-gray-200">
              <h3 className="text-sm font-medium text-gray-900 mb-6">
                Preview
              </h3>
              <div className="bg-gray-50 rounded-2xl p-12 space-y-6">
                {formData.title && (
                  <div className="text-3xl font-semibold text-gray-900">
                    {formData.title}
                  </div>
                )}
                {formData.name && (
                  <div className="text-lg text-gray-600">
                    By {formData.name}
                  </div>
                )}
                {formData.email && (
                  <div className="text-sm text-gray-500">{formData.email}</div>
                )}
                {formData.description && (
                  <div className="text-base text-gray-700 leading-relaxed mt-8">
                    {useAI
                      ? "(AI will generate enhanced content based on this)"
                      : formData.description}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Generate Button */}
          <div className="pt-8">
            <button
              onClick={handleGenerate}
              disabled={isLoading}
              className="group w-full px-8 py-5 bg-black text-white text-base font-medium rounded-full hover:bg-gray-800 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  {useAI ? "Generating with AI..." : "Generating PDF..."}
                </div>
              ) : (
                <>
                  {useAI ? "Generate with AI" : "Generate PDF Document"}
                  <ArrowRight
                    size={20}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneratorPage;
