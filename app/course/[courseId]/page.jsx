"use client";
import ChapterList from "@/app/create-course/[courseId]/_components/ChapterList";
import CourseBasicInfo from "@/app/create-course/[courseId]/_components/CourseBasicInfo";
import CourseDetail from "@/app/create-course/[courseId]/_components/CourseDetail";
import Header from "@/app/dashboard/_components/Header";
import { db } from "@/configs/db";
import { CourseList } from "@/configs/schema";
import { useToast } from "@/hooks/use-toast";
import { eq } from "drizzle-orm";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

function Course({ params }) {
  const Params = React.use(params);
  const { toast } = useToast();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  useEffect(() => {
    params && GetCourse();
  }, [params]);

  const GetCourse = async () => {
    try {
      const result = await db
        .select()
        .from(CourseList)
        .where(eq(CourseList.courseId, Params?.courseId));

      if (result[0]?.publish == false) {
        router.replace("/dashboard");
        toast({
          variant: "destructive",
          duration: 3000,
          title: "Course is not published yet.",
        });
        return;
      }
      // console.log(result[0]);
      setCourse(result[0]);
      setLoading(false);
    } catch (error) {
      // console.log(error);
      toast({
        variant: "destructive",
        duration: 3000,
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 transition-colors">
      <Header />
      <div className="max-w-3xl mx-auto px-6 py-10 space-y-6">
        <Button
          variant="ghost"
          onClick={() => router.replace("/dashboard")}
          className="flex items-center gap-1.5 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors duration-150 -ml-3 rounded-lg h-8 px-3 text-sm"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span className="font-medium">Back</span>
        </Button>
        {loading && !course ? (
          <div className="space-y-4 animate-pulse">
            <div className="h-48 bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="h-20 bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800" />
              <div className="h-20 bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800" />
              <div className="h-20 bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800" />
            </div>
            <div className="space-y-2">
               {[1,2,3,4].map(i => (
                 <div key={i} className="h-14 bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800" />
               ))}
            </div>
          </div>
        ) : course ? (
          <div className="space-y-6">
            <CourseBasicInfo course={course} edit={false} />
            <div className="grid grid-cols-1 gap-6">
              <CourseDetail course={course} />
              <ChapterList course={course} edit={false} />
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
              Course not found
            </h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
              The course you are looking for might have been deleted or moved.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Course;
