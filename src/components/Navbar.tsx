import React from "react";

const Navbar: React.FC = () => {
  return (
    <nav className="bg-white border-b border-gray-200 py-4">
      <div className="max-w-screen-lg mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <img src="/svg/logo.svg" alt="Logo" className="h-8 w-auto" />
        </div>
        <div className="flex items-center">
          <div className="relative">
            <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
              <span className="text-white text-sm font-medium">U</span>
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 bg-green-400 border-2 border-white rounded-full"></div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
