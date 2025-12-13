import React, { useState, useEffect, useRef } from "react";
import { FileText, ChevronDown, LogOut } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { useToast } from "../hooks/useToast";
import { useRouter } from "../utils/router";

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const { showToast } = useToast();
  const { navigate } = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef(null);

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    showToast("Logged out successfully", "success");
    navigate("home");
    setIsOpen(false);
    setIsProfileOpen(false);
  };

  const handleNavigation = (page) => {
    navigate(page);
    setIsOpen(false);
    setIsProfileOpen(false);
  };

  // Get user initials for avatar
  const getUserInitials = () => {
    if (!user?.name) return "U";
    return user.name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-xl border-b border-gray-100 z-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div
            className="flex items-center gap-2 cursor-pointer group"
            onClick={() => handleNavigation("home")}
          >
            <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
              <FileText className="text-white" size={20} />
            </div>
            <span className="text-xl font-semibold text-gray-900">Builder</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={() => handleNavigation("home")}
              className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors px-3 py-2 rounded-lg hover:bg-gray-50"
            >
              Home
            </button>
            <button
              onClick={() => handleNavigation("generator")}
              className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors px-3 py-2 rounded-lg hover:bg-gray-50"
            >
              Generator
            </button>

            {isAuthenticated ? (
              <div className="relative" ref={profileRef}>
                {/* Profile Dropdown Button */}
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors group"
                >
                  {/* Avatar with Initials */}
                  <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center text-sm font-medium">
                    {getUserInitials()}
                  </div>

                  <ChevronDown
                    size={16}
                    className={`text-gray-500 transition-transform duration-200 ${
                      isProfileOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Profile Dropdown Menu - SIMPLIFIED */}
                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden z-50">
                    {/* User Info Only */}
                    <div className="p-4 border-b border-gray-100">
                      <div className="text-center mb-2">
                        <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center text-base font-semibold mx-auto mb-3">
                          {getUserInitials()}
                        </div>
                        <h3 className="text-base font-semibold text-gray-900">
                          {user?.name}
                        </h3>
                      </div>
                      <p className="text-sm text-gray-500 text-center">
                        {user?.email}
                      </p>
                    </div>

                    {/* Logout Button Only */}
                    <div className="p-2">
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <LogOut size={16} />
                        <span>Logout</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleNavigation("login")}
                  className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors px-4 py-2 rounded-lg hover:bg-gray-50"
                >
                  Login
                </button>
                <button
                  onClick={() => handleNavigation("signup")}
                  className="px-5 py-2.5 bg-black text-white text-sm font-medium rounded-full hover:bg-gray-800 transition-colors shadow-sm"
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
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            <span
              className={`w-5 h-0.5 bg-gray-900 transition-all duration-300 ${
                isOpen ? "rotate-45 translate-y-1.5" : ""
              }`}
            />
            <span
              className={`w-5 h-0.5 bg-gray-900 transition-all duration-300 ${
                isOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`w-5 h-0.5 bg-gray-900 transition-all duration-300 ${
                isOpen ? "-rotate-45 -translate-y-1.5" : ""
              }`}
            />
          </button>
        </div>

        {/* Mobile Menu - Centered Items */}
        {isOpen && (
          <div className="md:hidden py-6 space-y-4 border-t border-gray-100">
            {/* Menu Items Container */}
            <div className="flex flex-col items-center space-y-3">
              <button
                onClick={() => handleNavigation("home")}
                className="text-base font-medium text-gray-900 py-2 px-4 rounded-lg hover:bg-gray-50 w-full text-center"
              >
                Home
              </button>
              <button
                onClick={() => handleNavigation("generator")}
                className="text-base font-medium text-gray-900 py-2 px-4 rounded-lg hover:bg-gray-50 w-full text-center"
              >
                Generator
              </button>

              {isAuthenticated ? (
                <>
                  {/* User Info - Centered */}
                  <div className="flex flex-col items-center py-4 px-4 w-full border-t border-gray-100 pt-6 mt-2">
                    <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center text-base font-semibold mb-3">
                      {getUserInitials()}
                    </div>
                    <div className="text-center">
                      <div className="text-base font-semibold text-gray-900">
                        {user?.name}
                      </div>
                      <div className="text-sm text-gray-500 mt-1">
                        {user?.email}
                      </div>
                    </div>
                  </div>

                  {/* Logout Button Only */}
                  <button
                    onClick={handleLogout}
                    className="flex items-center justify-center gap-2 text-sm font-medium text-red-600 py-3 px-4 rounded-lg hover:bg-red-50 w-full mx-4"
                  >
                    <LogOut size={16} />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <div className="flex flex-col space-y-3 w-full px-4 pt-2">
                  <button
                    onClick={() => handleNavigation("login")}
                    className="text-base font-medium text-gray-900 py-3 px-4 rounded-lg hover:bg-gray-50"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => handleNavigation("signup")}
                    className="py-3 px-4 bg-black text-white text-base font-medium rounded-full"
                  >
                    Sign Up
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
