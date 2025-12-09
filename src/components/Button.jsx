import React from "react";

const Button = ({
  children,
  variant = "primary",
  className = "",
  onClick,
  disabled,
  icon: Icon,
  type = "button",
}) => {
  const baseStyles =
    "px-6 py-3 rounded-full font-medium transition-all duration-200 flex items-center gap-2 justify-center disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary: "bg-black text-white hover:bg-gray-800",
    secondary:
      "bg-white text-gray-900 border-2 border-gray-200 hover:border-gray-900",
    outline: "border-2 border-gray-900 text-gray-900 hover:bg-gray-50",
    danger: "bg-red-600 text-white hover:bg-red-700",
  };

  return (
    <button
      type={type}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {Icon && <Icon size={20} />}
      {children}
    </button>
  );
};

export default Button;
