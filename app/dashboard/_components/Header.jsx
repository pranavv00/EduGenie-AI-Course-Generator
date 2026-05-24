import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";
import { HiMenuAlt2 } from "react-icons/hi";
import Logo from "@/components/Logo";
import { ThemeToggle } from "@/components/ThemeToggle";

function Header({hamBurger = false, handleMobileSidebar}) {
  return (
    <div className="flex items-center justify-between px-6 py-3 bg-white dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800 sticky top-0 z-40">
      <div className="flex items-center gap-3">
        {hamBurger && (
          <button 
            onClick={() => handleMobileSidebar(true)}
            className="md:hidden p-1.5 rounded-md text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors duration-150"
          >
            <HiMenuAlt2 size={20} />
          </button>
        )}
        <div className="md:hidden">
          <Logo />
        </div>
      </div>
      <div className="flex items-center gap-3">
        <ThemeToggle />
        <UserButton 
          appearance={{
            elements: {
              userButtonAvatarBox: "w-8 h-8 rounded-lg"
            }
          }}
        />
      </div>
    </div>
  );
}

export default Header;
