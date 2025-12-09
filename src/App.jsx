import React from "react";
import { AuthProvider } from "./context/AuthContext";
import { ToastProvider } from "./context/ToastContext";
import { RouterProvider, useRouter } from "./utils/router";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import GeneratorPage from "./pages/GeneratorPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import DownloadPage from "./pages/DownloadPage";

const AppContent = () => {
  const { currentPage } = useRouter();

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <HomePage />;
      case "generator":
        return <GeneratorPage />;
      case "login":
        return <LoginPage />;
      case "signup":
        return <SignupPage />;
      case "download":
        return <DownloadPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main>{renderPage()}</main>
    </div>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <ToastProvider>
        <RouterProvider>
          <AppContent />
        </RouterProvider>
      </ToastProvider>
    </AuthProvider>
  );
};

export default App;
