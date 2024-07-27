import React, { useState } from 'react';

export const Tabs = ({ children, defaultValue }) => {
  const [activeTab, setActiveTab] = useState(defaultValue);
  return (
    <div>
      {React.Children.map(children, child => {
        if (child.type === TabsList) {
          return React.cloneElement(child, { activeTab, setActiveTab });
        }
        if (child.type === TabsContent) {
          return React.cloneElement(child, { activeTab });
        }
        return child;
      })}
    </div>
  );
};

export const TabsList = ({ children, activeTab, setActiveTab, className }) => (
  <div className={`flex ${className}`}>
    {React.Children.map(children, (child, index) =>
      React.cloneElement(child, {
        activeTab,
        setActiveTab,
        tabValue: child.props.value,
      })
    )}
  </div>
);

export const TabsTrigger = ({ children, activeTab, setActiveTab, tabValue }) => (
  <button
    onClick={() => setActiveTab(tabValue)}
    className={`px-4 py-2 ${activeTab === tabValue ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
  >
    {children}
  </button>
);

export const TabsContent = ({ children, value, activeTab }) => (
  <div className={`mt-4 ${activeTab === value ? 'block' : 'hidden'}`}>
    {children}
  </div>
);
