import React from 'react';

export const Separator = ({ className = "" }) => {
    return (
      <div className={`w-full h-px bg-gray-300 ${className}`} />
    );
  };