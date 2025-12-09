import React from "react";
import { ArrowRight, Zap, ShieldCheck, Sparkles, FileText } from "lucide-react";
import { useRouter } from "../utils/router";

const HomePage = () => {
  const { navigate } = useRouter();
  const year = new Date().getFullYear();

  return (
    <div className="min-h-screen bg-white pt-20">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-28">
        <div className="text-center space-y-8 max-w-4xl mx-auto">
          <h1 className="text-6xl md:text-7xl font-semibold text-gray-900 leading-tight">
            Build PDFs.
            <br />
            Effortlessly.
          </h1>

          <p className="text-xl md:text-2xl text-gray-500 font-light max-w-2xl mx-auto">
            Professional documents in seconds. No complexity, no hassle.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
            <button
              onClick={() => navigate("generator")}
              className="group px-8 py-4 bg-black text-white text-base font-medium rounded-full hover:bg-gray-800 transition-all flex items-center justify-center gap-2"
            >
              Start Building
              <ArrowRight
                size={20}
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>
            <button
              onClick={() => navigate("signup")}
              className="px-8 py-4 text-black text-base font-medium rounded-full hover:bg-gray-100 transition-colors"
            >
              Create Account
            </button>
          </div>
        </div>

        {/* Visual Preview */}
        <div className="mt-20 relative">
          <div className="aspect-[16/5] md:aspect-[16/4] lg:aspect-[16/3.3] bg-gray-200 rounded-3xl overflow-hidden shadow-2xl">
            <div
              className="w-full h-full flex items-center justify-center
      bg-gradient-to-br from-gray-200 to-gray-300"
            >
              <div className="w-4/5 h-[75%] bg-white/95 rounded-2xl shadow-2xl p-10 space-y-5 border border-gray-300">
                <div className="h-5 bg-gray-900 rounded w-1/3"></div>

                <div className="space-y-4">
                  <div className="h-3.5 bg-gray-300 rounded w-full"></div>
                  <div className="h-3.5 bg-gray-300 rounded w-4/6"></div>
                </div>

                <div className="space-y-4 pt-6">
                  <div className="h-3.5 bg-gray-300 rounded w-full"></div>
                  <div className="h-3.5 bg-gray-300 rounded w-3/4"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-y border-gray-200 py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <Stat number="2.5M+" label="PDFs Created" />
            <Stat number="98%" label="Satisfaction" />
            <Stat number="< 2s" label="Generation Time" />
            <Stat number="150K+" label="Active Users" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-24">
        <div className="grid md:grid-cols-3 gap-16">
          <Feature
            icon={<Zap className="w-12 h-12 text-gray-900" />}
            title="Lightning Fast"
            desc="Generate professional documents in seconds with an optimized engine."
          />
          <Feature
            icon={<ShieldCheck className="w-12 h-12 text-gray-900" />}
            title="Secure & Private"
            desc="Your data stays with you. No storage, no retention, no risks."
          />
          <Feature
            icon={<Sparkles className="w-12 h-12 text-gray-900" />}
            title="Professional Quality"
            desc="Clean, polished, and business-ready without any design skills."
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-900 text-white py-24">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-8">
          <h2 className="text-5xl font-semibold">Ready to start?</h2>
          <p className="text-xl text-gray-400 font-light">
            Join thousands creating professional PDFs daily.
          </p>
          <button
            onClick={() => navigate("signup")}
            className="px-8 py-4 bg-white text-black text-base font-medium rounded-full hover:bg-gray-100 transition-colors"
          >
            Get Started Free
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-black rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform">
              <FileText className="text-white" size={15} />
            </div>
            <span className="text-sm text-gray-700 font-medium">
              © {year} Builder
            </span>
          </div>

          <div className="flex gap-6 text-gray-500">
            <a href="#" className="hover:text-gray-900 text-sm">
              Privacy
            </a>
            <a href="#" className="hover:text-gray-900 text-sm">
              Terms
            </a>
            <a href="#" className="hover:text-gray-900 text-sm">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

/* Shared Components */
const Stat = ({ number, label }) => (
  <div className="text-center">
    <div className="text-4xl font-semibold text-gray-900 mb-1">{number}</div>
    <div className="text-sm text-gray-500">{label}</div>
  </div>
);

const Feature = ({ icon, title, desc }) => (
  <div className="space-y-4">
    {icon}
    <h3 className="text-2xl font-semibold text-gray-900">{title}</h3>
    <p className="text-lg text-gray-500 font-light leading-relaxed">{desc}</p>
  </div>
);

export default HomePage;
