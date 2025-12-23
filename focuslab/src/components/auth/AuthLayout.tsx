import React from 'react';

const AuthLayout: React.FC<{ children: React.ReactNode; title?: string }> = ({ children, title }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        {title && <h2 className="text-2xl font-semibold mb-4">{title}</h2>}
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
