"use client";
import Skeleton from "react-loading-skeleton"; // Install via: npm install react-loading-skeleton
import "react-loading-skeleton/dist/skeleton.css"; // Import default styles
import { HiChevronDoubleLeft } from "react-icons/hi";
import ChapterListCard from "./_components/ChapterListCard";
import ChapterContent from "./_components/ChapterContent";
import React, { useState, useEffect } from "react";
import { db } from "@/configs/db";
import { Chapters, CourseList } from "@/configs/schema";
import { and, eq } from "drizzle-orm";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

function CourseStart({ params }) {
  const Params = React.use(params);
  const router = useRouter();
  const [course, setCourse] = useState(null);
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [selectedChapterContent, setSelectedChapterContent] = useState(null);
  const [handleSidebar, setHandleSidebar] = useState(false);
  const [courseLoading, setCourseLoading] = useState(true);
  const [contentLoading, setContentLoading] = useState(true);
  const { toast } = useToast();

  const handleSideBarFunction = () => {
    setHandleSidebar(!handleSidebar);
  };

  useEffect(() => {
    if (Params) GetCourse();
  }, [Params]);

  useEffect(() => {
    if (course && course?.courseOutput?.Chapters?.length > 0) {
      const firstChapter = course?.courseOutput?.Chapters[0];
      setSelectedChapter(firstChapter);
      GetSelectedChapterContent(0);
    }
  }, [course]);

  useEffect(() => {
    setHandleSidebar(false);
  }, [selectedChapter]);

  const GetCourse = async () => {
    setCourseLoading(true);
    try {
      const result = await db
        .select()
        .from(CourseList)
        .where(eq(CourseList.courseId, Params?.courseId));

      if (result.length > 0) {
        const fetchedCourse = result[0];
        setCourse(fetchedCourse);
      }
    } catch (error) {
      // console.error(error);
      toast({
        variant: "destructive",
        duration: 3000,
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
    } finally {
      setCourseLoading(false);
    }
  };

  const GetSelectedChapterContent = async (chapterId) => {
    setContentLoading(true);
    try {
      const result = await db
        .select()
        .from(Chapters)
        .where(
          and(
            eq(Chapters.courseId, course?.courseId),
            eq(Chapters.chapterId, chapterId)
          )
        );

      if (result.length > 0) {
        setSelectedChapterContent(result[0]);
      }
    } catch (error) {
      // console.log(error);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
    } finally {
      setContentLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 transition-colors">
      {/* Chapter Sidebar */}
      <div
        className={`fixed md:w-72 overflow-y-auto bg-zinc-50 dark:bg-zinc-900 transition-all duration-200 ${
          handleSidebar ? "inset-0 z-50 w-full" : "hidden md:block"
        } h-screen border-r border-zinc-200 dark:border-zinc-800`}
      >
        <div className="sticky top-0 z-10 flex bg-white dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800 justify-between px-4 py-3 items-center">
          <h2 className="text-sm font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 line-clamp-1">
            {courseLoading ? (
              <div className="h-5 w-28 bg-zinc-100 dark:bg-zinc-800 animate-pulse rounded-md" />
            ) : (
              course?.courseOutput?.CourseName
            )}
          </h2>
          <button 
            onClick={() => setHandleSidebar(false)}
            className="md:hidden p-1.5 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-500"
          >
            <HiChevronDoubleLeft size={16} />
          </button>
        </div>

        <div className="p-2 space-y-0.5">
          {courseLoading
            ? Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="h-16 bg-zinc-100/50 dark:bg-zinc-800/50 animate-pulse rounded-md" />
              ))
            : course?.courseOutput?.Chapters.map((chapter, index) => (
                <div
                  key={index}
                  className={`cursor-pointer transition-colors duration-150 rounded-md ${
                    selectedChapter?.ChapterName === chapter?.ChapterName
                      ? "bg-white dark:bg-zinc-800"
                      : "hover:bg-zinc-100 dark:hover:bg-zinc-800/50"
                  }`}
                  onClick={() => {
                    setSelectedChapter(chapter);
                    GetSelectedChapterContent(index);
                  }}
                >
                  <ChapterListCard chapter={chapter} index={index} active={selectedChapter?.ChapterName === chapter?.ChapterName} />
                </div>
              ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="md:ml-72">
        <div className="max-w-3xl mx-auto px-6 py-8 md:px-10 md:py-12">
          <Button
            variant="ghost"
            onClick={() => router.replace("/course/" + course?.courseId)}
            className="flex items-center gap-1.5 text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors duration-150 mb-6 -ml-3 rounded-lg h-8 px-3 text-sm"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="font-medium">Exit Course</span>
          </Button>
          {contentLoading ? (
            <div className="space-y-6 animate-pulse">
              <div className="h-8 bg-zinc-100 dark:bg-zinc-800 rounded-md w-2/3" />
              <div className="h-64 bg-zinc-100 dark:bg-zinc-800 rounded-lg" />
              <div className="space-y-3">
                <div className="h-4 bg-zinc-100 dark:bg-zinc-800 rounded-md w-full" />
                <div className="h-4 bg-zinc-100 dark:bg-zinc-800 rounded-md w-full" />
                <div className="h-4 bg-zinc-100 dark:bg-zinc-800 rounded-md w-3/4" />
              </div>
            </div>
          ) : (
            <div>
              <ChapterContent
                chapter={selectedChapter}
                content={selectedChapterContent}
                handleSideBarFunction={() => handleSideBarFunction()}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CourseStart;
