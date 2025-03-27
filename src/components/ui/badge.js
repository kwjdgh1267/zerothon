import React from "react";

const Badge = ({ children, className = "" }) => {
  return (
    <span
      className={`inline-block px-2 py-1 text-sm font-semibold rounded-md ${className}`}
    >
      {children}
    </span>
  );
};

export default Badge;