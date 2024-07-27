import React from 'react';

export const Input = ({ value, onChange, placeholder, className }) => (
  <input
    type="text"
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    className={`p-2 border rounded ${className}`}
  />
);
