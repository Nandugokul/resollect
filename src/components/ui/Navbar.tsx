import React from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/components/use-theme";
const Navbar: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";
  const [open, setOpen] = React.useState(false);
  const handleThemeToggle = () => {
    setTheme(isDark ? "light" : "dark");
    setOpen(false);
  };
  // Dynamic avatar background and stroke color
  const avatarBg = isDark ? "bg-white" : "bg-black";
  const avatarStroke = isDark ? "black" : "white";
  return (
    <nav className="bg-white border-b border-gray-200 py-4 dark:bg-black dark:border-gray-800">
      <div className="max-w-screen-lg mx-auto flex items-center justify-between">
        <div className="flex items-center px-4 md:px-8">
          <img src="/svg/logo.svg" alt="Logo" className="h-8 w-auto" />
        </div>
        <div className="flex items-center px-4 md:px-8">
          <DropdownMenu.Root open={open} onOpenChange={setOpen}>
            <DropdownMenu.Trigger asChild>
              <div className="relative cursor-pointer">
                <div
                  className={`h-10 w-10 rounded-full flex items-center justify-center ${avatarBg}`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke={avatarStroke}
                    className="h-5 w-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 7.5a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 19.5a7.5 7.5 0 0115 0v.75a.75.75 0 01-.75.75h-13.5a.75.75 0 01-.75-.75V19.5z"
                    />
                  </svg>
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 bg-green-400 border-2 border-white rounded-full"></div>
              </div>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content className="bg-white dark:bg-gray-900 rounded-md shadow-lg p-4 min-w-[140px] mt-2 border border-gray-200 dark:border-gray-700">
              <DropdownMenu.Item
                onClick={handleThemeToggle}
                className="flex items-center gap-2 cursor-pointer rounded px-2 py-1 hover:bg-gray-100 focus:bg-gray-100 dark:hover:bg-gray-800 dark:focus:bg-gray-800 outline-none"
              >
                {isDark ? (
                  <Sun className="h-4 w-4" />
                ) : (
                  <Moon className="h-4 w-4" />
                )}
                {isDark ? "Light" : "Dark"}
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
