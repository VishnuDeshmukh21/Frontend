import React from 'react';

function Message({ variant, children }) {
  const variantClasses = {
    danger: 'bg-red-100 border border-red-400 text-red-700',
    success: 'bg-green-100 border border-green-400 text-green-700',
    warning: 'bg-yellow-100 border border-yellow-400 text-yellow-700',
    info: 'bg-blue-100 border border-blue-400 text-blue-700',
    default: 'bg-gray-100 border border-gray-400 text-gray-700',
  };

  return (
    <div className={`p-4 mb-4 rounded ${variantClasses[variant] || variantClasses.default}`}>
      {children}
    </div>
  );
}

export default Message;
