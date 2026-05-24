"use client";
import { UserCourseListContext } from "@/app/_context/UserCourseListContext";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import React, { useContext } from "react";
import { Plus } from "lucide-react";

function AddCourse() {
  const { user } = useUser();
  const { userCourseList } = useContext(UserCourseListContext);
  
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
      <div>
        <h2 className="text-lg font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
          Welcome back, {user?.fullName || "Scholar"}
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
          Generate a custom AI-powered course in seconds.
        </p>
      </div>
      <Link
        href={
          userCourseList?.length >= 5 ? "/dashboard/upgrade" : "/create-course"
        }
      >
        <Button className="h-9 px-4 text-sm font-medium rounded-lg bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-50 dark:hover:bg-zinc-200 text-white dark:text-zinc-900 transition-colors duration-150 flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Create Course
        </Button>
      </Link>
    </div>
  );
}

export default AddCourse;
