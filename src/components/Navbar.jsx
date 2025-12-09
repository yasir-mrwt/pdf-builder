import React, { useState } from "react";
import { FileText } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { useToast } from "../hooks/useToast";
import { useRouter } from "../utils/router";

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const { showToast } = useToast();
  const { navigate } = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    showToast("Logged out successfully");
    navigate("home");
    setIsOpen(false);
  };

  const handleNavigation = (page) => {
    navigate(page);
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-xl border-b border-gray-100 z-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div
            className="flex items-center gap-2 cursor-pointer group"
            onClick={() => handleNavigation("home")}
          >
            <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform">
              <FileText className="text-white" size={20} />
            </div>
            <span className="text-xl font-semibold text-gray-900">Builder</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-12">
            <button
              onClick={() => handleNavigation("home")}
              className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
            >
              Home
            </button>
            <button
              onClick={() => handleNavigation("generator")}
              className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
            >
              Generator
            </button>

            {isAuthenticated ? (
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-gray-900">
                  {user?.name}
                </span>
                <button
                  onClick={handleLogout}
                  className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <button
                  onClick={() => handleNavigation("login")}
                  className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Login
                </button>
                <button
                  onClick={() => handleNavigation("signup")}
                  className="px-5 py-2.5 bg-black text-white text-sm font-medium rounded-full hover:bg-gray-800 transition-colors"
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span
              className={`w-5 h-0.5 bg-gray-900 transition-all ${
                isOpen ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <span
              className={`w-5 h-0.5 bg-gray-900 transition-all ${
                isOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`w-5 h-0.5 bg-gray-900 transition-all ${
                isOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-6 space-y-4">
            <button
              onClick={() => handleNavigation("home")}
              className="block w-full text-left text-sm font-medium text-gray-900 py-2"
            >
              Home
            </button>
            <button
              onClick={() => handleNavigation("generator")}
              className="block w-full text-left text-sm font-medium text-gray-900 py-2"
            >
              Generator
            </button>

            {isAuthenticated ? (
              <>
                <div className="py-2 text-sm font-medium text-gray-900">
                  {user?.name}
                </div>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left text-sm font-medium text-gray-600 py-2"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => handleNavigation("login")}
                  className="block w-full text-left text-sm font-medium text-gray-900 py-2"
                >
                  Login
                </button>
                <button
                  onClick={() => handleNavigation("signup")}
                  className="w-full px-5 py-2.5 bg-black text-white text-sm font-medium rounded-full"
                >
                  Sign Up
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
