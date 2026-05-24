"use client";
import React, { useContext } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Progress } from "@/components/ui/progress";
import Logo from "@/components/Logo";
import {
  HiOutlineHome,
  HiOutlineSquare3Stack3D,
  HiOutlineShieldCheck,
  HiMiniPower,
  HiChevronDoubleLeft,
} from "react-icons/hi2";
import { UserCourseListContext } from "@/app/_context/UserCourseListContext";

function MobileSideBar({ handleMobileSidebar }) {
  const { userCourseList } = useContext(UserCourseListContext);
  const path = usePathname();

  const Menu = [
    {
      id: 1,
      name: "Home",
      icon: <HiOutlineHome />,
      path: "/dashboard",
    },
    {
      id: 2,
      name: "Explore",
      icon: <HiOutlineSquare3Stack3D />,
      path: "/dashboard/explore",
    },
    {
      id: 3,
      name: "Upgrade",
      icon: <HiOutlineShieldCheck />,
      path: "/dashboard/upgrade",
    },
    {
      id: 4,
      name: "LogOut",
      icon: <HiMiniPower />,
      path: "/dashboard/logout",
    },
  ];

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      {/* Backdrop */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => handleMobileSidebar(false)}
        className="absolute inset-0 bg-black/40"
      />

      {/* Sidebar Content */}
      <motion.div 
        initial={{ x: "-100%" }}
        animate={{ x: 0 }}
        exit={{ x: "-100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="absolute left-0 top-0 h-full w-[280px] bg-white dark:bg-zinc-950 p-5 border-r border-zinc-200 dark:border-zinc-800"
      >
        <div className="flex items-center justify-between mb-8">
          <Logo />
          <button
            onClick={() => handleMobileSidebar(false)}
            className="p-1.5 rounded-md text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors duration-150"
          >
            <HiChevronDoubleLeft size={18} />
          </button>
        </div>

        <nav className="space-y-0.5">
          {Menu.map((item) => (
            <Link 
              href={item.path} 
              key={item.id}
              onClick={() => handleMobileSidebar(false)}
            >
              <div
                className={`flex items-center gap-3 px-3 py-2.5 cursor-pointer rounded-md transition-colors duration-150 ${
                  item.path === path 
                  ? "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50" 
                  : "text-zinc-500 hover:bg-zinc-50 dark:hover:bg-zinc-900 hover:text-zinc-900 dark:hover:text-zinc-50"
                }`}
              >
                <div className="text-lg">
                  {item.icon}
                </div>
                <span className="text-sm font-medium">{item.name}</span>
              </div>
            </Link>
          ))}
        </nav>

        <div className="absolute bottom-8 left-5 right-5 p-4 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
          <div className="flex justify-between items-center mb-2">
             <span className="text-xs font-medium text-zinc-500">Usage</span>
             <span className="text-xs font-medium text-zinc-900 dark:text-zinc-100">{userCourseList?.length}/5</span>
          </div>
          <Progress 
            value={(userCourseList?.length / 5) * 100} 
            className="h-1.5 rounded-full overflow-hidden"
          />
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-3 leading-snug">
            Generate up to 5 courses on the Free Plan.
          </p>
          <Link href="/dashboard/upgrade" onClick={() => handleMobileSidebar(false)}>
            <button className="w-full mt-3 py-2 text-xs font-medium text-white dark:text-zinc-900 bg-zinc-900 dark:bg-zinc-50 rounded-lg hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors duration-150">
              Upgrade
            </button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

export default MobileSideBar;
