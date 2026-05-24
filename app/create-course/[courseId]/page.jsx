"use client";
import { db } from "@/configs/db";
import { CourseList, Chapters } from "@/configs/schema";
import { useUser } from "@clerk/nextjs";
import { and, eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import CourseBasicInfo from "./_components/CourseBasicInfo";
import CourseDetail from "./_components/CourseDetail";
import ChapterList from "./_components/ChapterList";
import { Button } from "@/components/ui/button";
import { GenerateChapterContent_AI } from "@/configs/AiModel";
import LoadingDialog from "../_components/LoadingDialog";
import getVideos from "@/configs/service";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft } from "lucide-react";

function CourseLayout({ params }) {
  const Params = React.use(params);
  const { user } = useUser();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const { toast } = useToast();

  useEffect(() => {
    // console.log(Params); //courseId
    // console.log(user);

    if (Params && user) {
      GetCourse();
    }
  }, [Params, user]);

  const GetCourse = async () => {
    try {
      const params = await Params;
      const result = await db
        .select()
        .from(CourseList)
        .where(
          and(
            eq(CourseList.courseId, params?.courseId),
            eq(CourseList?.createdBy, user?.primaryEmailAddress?.emailAddress)
          )
        );
      setCourse(result[0]);
      // console.log("Course data:", result[0]);
    } catch (error) {
      // console.error("Error fetching course:", error);
      toast({
        variant: "destructive",
        duration: 3000,
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
    }
  };

  const GenerateChapterContent = async () => {
    setLoading(true);

    try {
      const chapters = course?.courseOutput?.Chapters;
      const includeVideo = course?.includeVideo;

      // Delete previous content if generated and got any error
      await db.delete(Chapters).where(eq(Chapters.courseId, course?.courseId));

      const updatedChapters = await Promise.all(
        chapters.map(async (chapter, index) => {
          let videoId = null;

          if (includeVideo === "Yes") {
            const query = `${course?.name} ${chapter?.ChapterName} tutorial for beginners`;
            const videos = await getVideos(query);
            // Collect up to 3 video IDs
            videoId = videos?.map(v => v?.id?.videoId).filter(id => !!id) || [];
          }

          console.log("Chapter:", chapter.ChapterName);
          console.log("Video:", videoId);

          // Save Chapter Content + Video URL
          await db.insert(Chapters).values({
            chapterId: index,
            courseId: course?.courseId,
            content: { chapters: chapter.content }, // Wrapped to match ChapterContent.jsx expectation
            videoId: videoId,
          });

          return {
            ...chapter,
            videoId: videoId,
          };
        })
      );

      await db
        .update(CourseList)
        .set({
          publish: true,
        })
        .where(eq(CourseList.courseId, course?.courseId));

      toast({
        variant: "success",
        duration: 3000,
        title: "Course Content Generated Successfully!",
        description: "Course Content has been generated successfully!",
      });
      router.replace("/create-course/" + course?.courseId + "/finish");
    } catch (error) {
      console.error("Error in GenerateChapterContent:", error);
      toast({
        variant: "destructive",
        duration: 5000,
        title: "Uh oh! Something went wrong.",
        description: error?.message || "An unexpected error occurred!",
      });
      await GetCourse();
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <LoadingDialog loading={loading} />
      <div className="max-w-3xl mx-auto px-6 py-10 min-h-screen">
        <Button
          variant="ghost"
          onClick={() => router.replace("/dashboard")}
          className="flex items-center gap-1.5 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors duration-150 mb-6 -ml-3 rounded-lg h-8 px-3 text-sm"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span className="font-medium">Back</span>
        </Button>
        <h2 className="text-lg font-semibold text-center tracking-tight text-zinc-900 dark:text-zinc-100 mb-6">Course Layout</h2>
        {/* Basic Info */}
        <CourseBasicInfo course={course} refreshData={() => GetCourse()} />
        {/* Course Detail */}
        <CourseDetail course={course} />
        {/* List of Lesson */}
        <ChapterList course={course} refreshData={() => GetCourse()} />

        <Button
          onClick={() => GenerateChapterContent()}
          className="my-8 h-9 px-6 text-sm font-medium rounded-lg bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-50 dark:hover:bg-zinc-200 text-white dark:text-zinc-900 transition-colors duration-150"
        >
          Generate Course Content
        </Button>
      </div>
    </>
  );
}

export default CourseLayout;
