"use client";
import { db } from "@/configs/db";
import { CourseList } from "@/configs/schema";
import { useUser } from "@clerk/nextjs";
import { desc, eq } from "drizzle-orm";
import React, { useContext, useEffect, useState } from "react";
import CourseCard from "./CourseCard";
import { UserCourseListContext } from "@/app/_context/UserCourseListContext";
import { useToast } from "@/hooks/use-toast";

function UserCourseList() {
  const [courseList, setCourseList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const { userCourseList, setUserCourseList } = useContext(
    UserCourseListContext
  );

  const { user } = useUser();
  useEffect(() => {
    user && getUserCourses();
    // console.log("User : " + user?.fullName);
  }, [user]);

  const getUserCourses = async () => {
    try {
      const result = await db
        .select()
        .from(CourseList)
        .where(
          eq(CourseList.createdBy, user?.primaryEmailAddress?.emailAddress)
        )
        .orderBy(desc(CourseList.id));

      // console.log(result);
      setCourseList(result);
      setUserCourseList(result);
      localStorage.setItem("userCourseList", JSON.stringify(result));
    } catch (error) {
      toast({
        variant: "destructive",
        duration: 3000,
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-8">
      <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
        My Courses
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {isLoading ? (
          [1, 2, 3, 4, 5, 6].map((item, index) => (
            <div
              key={index}
              className="rounded-lg border border-zinc-200 dark:border-zinc-800 p-3 animate-pulse bg-white dark:bg-zinc-900"
            >
              <div className="w-full h-40 bg-zinc-100 dark:bg-zinc-800 rounded-md mb-3"> </div>
              <div className="space-y-2">
                <div className="h-5 bg-zinc-100 dark:bg-zinc-800 rounded-md w-3/4"> </div>
                <div className="h-4 bg-zinc-100 dark:bg-zinc-800 rounded-md w-1/2"> </div>
                <div className="flex items-center justify-between pt-3">
                  <div className="h-4 bg-zinc-100 dark:bg-zinc-800 rounded-md w-1/3"> </div>
                  <div className="h-4 bg-zinc-100 dark:bg-zinc-800 rounded-md w-1/4"> </div>
                </div>
              </div>
            </div>
          ))
        ) : courseList?.length != 0 ? (
          courseList.map((course, index) => (
            <div key={index}>
              <CourseCard
                course={course}
                refreshData={() => getUserCourses()}
              />
            </div>
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center py-16 px-6 rounded-lg border border-dashed border-zinc-300 dark:border-zinc-700 bg-zinc-50/50 dark:bg-zinc-900/50">
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">No courses yet</h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1 text-center max-w-sm">
              Your generated courses will appear here. Create your first course to get started.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserCourseList;
