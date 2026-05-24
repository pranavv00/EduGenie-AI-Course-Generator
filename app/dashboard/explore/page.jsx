"use client";
import { db } from "@/configs/db";
import { CourseList } from "@/configs/schema";
import React, { useEffect, useState } from "react";
import CourseCard from "../_components/CourseCard";
import { Button } from "@/components/ui/button";
import { desc, eq } from "drizzle-orm";
import { useToast } from "@/hooks/use-toast";

function Explore() {
  const [courseList, setCourseList] = useState([]);
  // const [pageIndex, setPageIndex] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    GetAllCourses();
  }, []); // set dependency array value to pageIndex

  const GetAllCourses = async () => {
    // const result = await db
    //   .select()
    //   .from(CourseList)
    //   .limit(9)
    //   .offset(pageIndex * 9);

    try {
      const result = await db
        .select()
        .from(CourseList)
        .where(eq(CourseList.publish, true))
        .orderBy(desc(CourseList.id));
      // console.log(result);
      setCourseList(result);
    } catch (error) {
      // console.log(error);
      toast({
        variant: "destructive",
        duration: 3000,
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
    }
  };
  return (
    <div>
      <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Explore Courses</h2>
      <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1 mb-6">
        Discover courses created by the community.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {courseList.length > 0
          ? courseList?.map((course, index) => (
              <CourseCard
                key={index}
                course={course}
                refreshData={() => GetAllCourses()}
                displayUser={true}
              />
            ))
          : [1, 2, 3, 4, 5, 6].map((item, index) => (
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
            ))}
      </div>

      {/* <div className="flex justify-between mt-5">
        <Button
          disabled={pageIndex == 0}
          onClick={() => setPageIndex(pageIndex - 1)}
        >
          Previous Page
        </Button>
        <Button onClick={() => setPageIndex(pageIndex + 1)}>Next Page</Button>
      </div> */}
    </div>
  );
}

export default Explore;
