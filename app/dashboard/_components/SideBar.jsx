"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useContext, useEffect } from "react";
import { Progress } from "@/components/ui/progress";
import Logo from "@/components/Logo";

import {
  HiOutlineHome,
  HiOutlineSquare3Stack3D,
  HiOutlineShieldCheck,
  HiMiniPower,
} from "react-icons/hi2";
import { UserCourseListContext } from "@/app/_context/UserCourseListContext";

function SideBar() {
  const { userCourseList, setUserCourseList } = useContext(
    UserCourseListContext
  );

  useEffect(() => {
    setUserCourseList(JSON.parse(localStorage.getItem("userCourseList")));
  }, []);

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
    <div className="fixed h-full md:w-64 p-5 bg-white dark:bg-zinc-950 border-r border-zinc-200 dark:border-zinc-800 transition-colors">
      <div className="mb-8">
        <Logo />
      </div>
      
      <div className="space-y-0.5">
        {Menu.map((item, index) => (
          <Link href={item.path} key={index}>
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
      </div>

      <div className="absolute bottom-6 left-5 right-5 p-4 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
        <div className="flex justify-between items-center mb-2">
           <span className="text-xs font-medium text-zinc-500">Usage</span>
           <span className="text-xs font-medium text-zinc-900 dark:text-zinc-100">{userCourseList?.length}/5</span>
        </div>
        <Progress 
          value={(userCourseList?.length / 5) * 100} 
          className="h-1.5 rounded-full overflow-hidden"
        />

        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-3 leading-snug">
          Upgrade for unlimited course generations.
        </p>
        <Link href="/dashboard/upgrade">
          <button
            className="w-full mt-3 py-2 text-xs font-medium text-white dark:text-zinc-900 bg-zinc-900 dark:bg-zinc-50 rounded-lg hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors duration-150"
          >
            Upgrade
          </button>
        </Link>
      </div>
    </div>
  );
}

export default SideBar;
