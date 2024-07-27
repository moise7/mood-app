import React from 'react';

export const Card = ({ children, className }) => (
  <div className={`p-4 shadow-lg rounded-lg ${className}`}>
    {children}
  </div>
);

export const CardHeader = ({ children }) => (
  <div className="mb-4">
    {children}
  </div>
);

export const CardTitle = ({ children }) => (
  <h2 className="text-xl font-semibold mb-2">
    {children}
  </h2>
);

export const CardContent = ({ children }) => (
  <div className="mb-4">
    {children}
  </div>
);

export const CardFooter = ({ children, className }) => (
  <div className={`mt-4 ${className}`}>
    {children}
  </div>
);
