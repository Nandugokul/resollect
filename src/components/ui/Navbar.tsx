import React from "react";
const avtar = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="white"
    className="h-5 w-5"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15.75 7.5a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 19.5a7.5 7.5 0 0115 0v.75a.75.75 0 01-.75.75h-13.5a.75.75 0 01-.75-.75V19.5z"
    />
  </svg>
);
const Navbar: React.FC = () => {
  return (
    <nav className="bg-white border-b border-gray-200 py-4 ">
      <div className="max-w-screen-lg mx-auto flex items-center justify-between">
        <div className="flex items-center px-4 md:px-8">
          <img src="/svg/logo.svg" alt="Logo" className="h-8 w-auto" />
        </div>
        <div className="flex items-center px-4 md:px-8">
          <div className="relative ">
            <div className="h-10 w-10 rounded-full bg-black flex items-center justify-center">
              {avtar}
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 bg-green-400 border-2 border-white rounded-full"></div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
