import React from "react";

const Card = ({ children, className = "", hover = false, padding = "p-8" }) => {
  return (
    <div
      className={`bg-white rounded-2xl ${padding} ${
        hover ? "transition-transform hover:scale-[1.02] cursor-pointer" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
