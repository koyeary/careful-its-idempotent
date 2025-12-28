import React from "react";

interface ShellProps {
  title?: string;
  children: React.ReactNode;
}

const Shell: React.FC<ShellProps> = ({ title, children }) => {
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-900">
            {title || "Thirsty"}
          </h1>
        </div>
      </header>
      <main className="max-w-7xl mx-auto">{children}</main>
    </div>
  );
};

export default Shell;
