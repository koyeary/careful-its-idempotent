"use client";

import React from "react";
import { useRouter, usePathname } from "next/navigation";
import { ChevronLeft } from "lucide-react";

interface ShellProps {
  title?: string;
  children: React.ReactNode;
}

const Shell: React.FC<ShellProps> = ({ title, children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  const handleBackClick = () => {
    router.back();
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 max-w-lvw">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            {!isHomePage && (
              <button
                onClick={handleBackClick}
                className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Back to home"
              >
                <ChevronLeft className="w-5 h-5 text-gray-700" />
              </button>
            )}
            <h1 className="text-2xl font-bold text-gray-900">
              {title || "Thirsty"}
            </h1>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto">{children}</main>
    </div>
  );
};

export default Shell;
