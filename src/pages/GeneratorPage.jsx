import React, { useState } from "react";
import { ArrowRight } from "lucide-react";
import { useToast } from "../hooks/useToast";
import { useRouter } from "../utils/router";

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
  const [generationMode, setGenerationMode] = useState("pdf"); // "pdf" or "content"

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleGenerate = () => {
    if (!formData.title || !formData.name) {
      showToast("Please fill in all required fields", "error");
      return;
    }

    const pdfData = {
      ...formData,
      generatedAt: new Date().toISOString(),
      id: Date.now(),
      generationMode: generationMode,
    };

    try {
      localStorage.setItem("currentPDF", JSON.stringify(pdfData));

      if (generationMode === "content") {
        showToast("Generating content and PDF...", "success");
        // Add your content generation logic here
        // For example, call an AI API to generate content
        // Then proceed to download
      } else {
        showToast("PDF generated successfully!", "success");
      }

      navigate("download");
    } catch (error) {
      showToast("Failed to generate PDF", "error");
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
              className="w-full px-0 py-4 border-b-2 border-gray-200 focus:border-gray-900 outline-none text-lg transition-colors bg-transparent placeholder:text-gray-400"
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
              className="w-full px-0 py-4 border-b-2 border-gray-200 focus:border-gray-900 outline-none text-lg transition-colors bg-transparent placeholder:text-gray-400"
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
              className="w-full px-0 py-4 border-b-2 border-gray-200 focus:border-gray-900 outline-none text-lg transition-colors bg-transparent placeholder:text-gray-400"
            />
          </div>

          {/* Description */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-900">
              Description
            </label>
            <textarea
              placeholder="Enter a detailed description..."
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              className="w-full px-0 py-4 border-b-2 border-gray-200 focus:border-gray-900 outline-none text-lg transition-colors resize-none bg-transparent placeholder:text-gray-400"
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
              className="w-full px-0 py-4 border-b-2 border-gray-200 focus:border-gray-900 outline-none text-lg transition-colors resize-none bg-transparent placeholder:text-gray-400"
              rows="2"
            />
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
                    {formData.description}
                  </div>
                )}
                {formData.notes && (
                  <div className="text-sm text-gray-500 mt-6 pt-6 border-t border-gray-200">
                    {formData.notes}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Generation Mode Selection */}
          <div className="pt-8 space-y-4">
            <label className="block text-sm font-medium text-gray-900 mb-4">
              Generation Mode
            </label>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <input
                  type="radio"
                  id="pdf-only"
                  name="generation-mode"
                  checked={generationMode === "pdf"}
                  onChange={() => setGenerationMode("pdf")}
                  className="sr-only peer"
                />
                <label
                  htmlFor="pdf-only"
                  className="flex items-center justify-center w-full p-6 border-2 border-gray-200 rounded-2xl cursor-pointer transition-all peer-checked:border-black peer-checked:bg-black/5 hover:border-gray-300"
                >
                  <div className="text-center">
                    <div className="text-base font-medium text-gray-900 mb-1">
                      Generate PDF Only
                    </div>
                    <div className="text-sm text-gray-500">
                      Create PDF with provided content
                    </div>
                  </div>
                </label>
              </div>

              <div className="flex-1">
                <input
                  type="radio"
                  id="write-content"
                  name="generation-mode"
                  checked={generationMode === "content"}
                  onChange={() => setGenerationMode("content")}
                  className="sr-only peer"
                />
                <label
                  htmlFor="write-content"
                  className="flex items-center justify-center w-full p-6 border-2 border-gray-200 rounded-2xl cursor-pointer transition-all peer-checked:border-black peer-checked:bg-black/5 hover:border-gray-300"
                >
                  <div className="text-center">
                    <div className="text-base font-medium text-gray-900 mb-1">
                      Write Content & Generate PDF
                    </div>
                    <div className="text-sm text-gray-500">
                      AI generates content then creates PDF
                    </div>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Generate Button */}
          <div className="pt-8">
            <button
              onClick={handleGenerate}
              className="group w-full px-8 py-5 bg-black text-white text-base font-medium rounded-full hover:bg-gray-800 transition-all flex items-center justify-center gap-2"
            >
              {generationMode === "content"
                ? "Write Content & Generate PDF"
                : "Generate PDF Document"}
              <ArrowRight
                size={20}
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneratorPage;
