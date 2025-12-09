import React from "react";
import { Check, X, AlertCircle, Info } from "lucide-react";

const Toast = ({ message, type = "success", onClose }) => {
  const config = {
    success: {
      bg: "bg-gray-900",
      icon: Check,
    },
    error: {
      bg: "bg-red-600",
      icon: X,
    },
    warning: {
      bg: "bg-yellow-600",
      icon: AlertCircle,
    },
    info: {
      bg: "bg-gray-700",
      icon: Info,
    },
  };

  const { bg, icon: Icon } = config[type] || config.success;

  return (
    <div
      className={`${bg} text-white px-6 py-4 rounded-2xl shadow-lg flex items-center gap-3 animate-slide-in min-w-[300px]`}
    >
      <Icon size={20} />
      <span className="flex-1 text-sm font-medium">{message}</span>
      {onClose && (
        <button
          onClick={onClose}
          className="hover:opacity-75 transition-opacity"
        >
          <X size={18} />
        </button>
      )}
    </div>
  );
};

export default Toast;
