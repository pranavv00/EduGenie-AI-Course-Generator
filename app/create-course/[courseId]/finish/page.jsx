"use client";
import { db } from "@/configs/db";
import { CourseList } from "@/configs/schema";
import { useUser } from "@clerk/nextjs";
import { and, eq } from "drizzle-orm";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import CourseBasicInfo from "../_components/CourseBasicInfo";
import { HiOutlineClipboardDocumentCheck } from "react-icons/hi2";
import {
  EmailIcon,
  EmailShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { ArrowLeft } from "lucide-react";

function FinishScreen({ params }) {
  const Params = React.use(params);
  const { user } = useUser();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    // console.log(Params); //courseId
    // console.log(user);

    Params && GetCourse();
  }, [Params, user]);

  const GetCourse = async () => {
    try {
      const params = await Params;
      const result = await db
        .select()
        .from(CourseList)
        .where(
          and(
            eq(CourseList.courseId, Params?.courseId),
            eq(CourseList?.createdBy, user?.primaryEmailAddress?.emailAddress)
          )
        );
      if (result[0]?.publish == false) {
        router.replace("/create-course/" + params?.courseId);
        toast({
          variant: "destructive",
          duration: 3000,
          title: "Course is not published yet.",
          description: "Please complete the course generation process!",
        });
        return;
      }
      setCourse(result[0]);
      setLoading(false);
      // console.log("Course data:", result[0]);
    } catch (error) {
      // console.error("Error fetching course:", error);
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
    <div>
      {loading && !course ? (
        <div className="px-10 md:px-20 lg:px-44 my-7">
          <Skeleton height={30} width={200} className="mx-auto my-3" />

          <div className="my-3">
            <Skeleton height={20} width="100%" />
            <Skeleton height={20} width="90%" />
            <Skeleton height={20} width="95%" />
          </div>

          <div className="flex justify-center">
            <Skeleton height={40} width={150} />
          </div>

          <Skeleton height={20} width="50%" className="mt-3" />
          <Skeleton height={40} width="100%" className="mt-2 rounded" />

          <div className="flex justify-center items-center gap-5 p-2 mt-2">
            <Skeleton circle={true} height={30} width={30} />
            <Skeleton circle={true} height={30} width={30} />
            <Skeleton circle={true} height={30} width={30} />
          </div>
        </div>
      ) : course ? (
        <div className="max-w-3xl mx-auto px-6 py-10 min-h-screen">
          <Button
            variant="ghost"
            onClick={() => router.replace("/dashboard")}
            className="flex items-center gap-1.5 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors duration-150 mb-6 -ml-3 rounded-lg h-8 px-3 text-sm"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="font-medium">Back</span>
          </Button>
          <h2 className="text-center text-lg font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 mb-6">
            Your course is ready
          </h2>

          <CourseBasicInfo course={course} refreshData={() => GetCourse()} />

          <div className="flex justify-center mt-6">
            <Link href="/dashboard">
              <Button className="h-9 px-5 text-sm font-medium rounded-lg bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-50 dark:hover:bg-zinc-200 text-white dark:text-zinc-900 transition-colors duration-150">
                Go to Dashboard
              </Button>
            </Link>
          </div>

          <div className="mt-6 space-y-2">
            <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Course URL</p>
            <div className="flex items-center gap-3 text-sm text-zinc-500 border border-zinc-200 dark:border-zinc-800 p-3 rounded-lg bg-zinc-50 dark:bg-zinc-900">
              <span className="flex-grow truncate">
                {process.env.NEXT_PUBLIC_HOST_NAME}/course/{course?.courseId}
              </span>
              <HiOutlineClipboardDocumentCheck
                className="h-4 w-4 cursor-pointer text-zinc-400 hover:text-zinc-700 transition-colors duration-150 flex-none"
                onClick={async () =>
                  await navigator.clipboard.writeText(
                    process.env.NEXT_PUBLIC_HOST_NAME +
                      "/course/" +
                      course?.courseId
                  )
                }
              />
            </div>
          </div>

          <div className="flex items-center gap-4 mt-4">
            <span className="text-sm text-zinc-500">Share</span>
            <WhatsappShareButton
              title="Check out this course from SeedOfCode. "
              url={`${
                process.env.NEXT_PUBLIC_HOST_NAME +
                "/course/" +
                course?.courseId
              }`}
              windowWidth={800}
              windowHeight={600}
              separator={`Course Name : ${course?.courseOutput?.CourseName} \n Created By : ${course?.userName} \nClick on the link to view the course : `}
            >
              <WhatsappIcon size={28} round={true} />
            </WhatsappShareButton>

            <EmailShareButton
              url={`${
                process.env.NEXT_PUBLIC_HOST_NAME +
                "/course/" +
                course?.courseId
              }`}
              windowWidth={800}
              windowHeight={600}
              subject={`SeedOfCode Course : ${course?.courseOutput?.CourseName}`}
              body="Check out this course from SeedOfCode. "
              separator={`\nCourse Name : ${course?.courseOutput?.CourseName}\n Created By : ${course?.userName} \nClick on the link to view the course : `}
            >
              <EmailIcon size={28} round={true} />
            </EmailShareButton>

            <LinkedinShareButton
              title="Check out this course from SeedOfCode. "
              summary={`\nCourse Name : ${course?.courseOutput?.CourseName}\n Created By : ${course?.userName} \nClick on the link to view the course : `}
              source={`https://seedofcode-ai-course-generator.vercel.app/`}
              url={`${
                process.env.NEXT_PUBLIC_HOST_NAME +
                "/course/" +
                course?.courseId
              }`}
            >
              <LinkedinIcon size={28} round={true} />
            </LinkedinShareButton>
          </div>
        </div>
      ) : (
        <div className="px-10 md:px-20 lg:px-44 my-7">
          <h2 className="text-center text-lg font-medium text-zinc-500 my-3">
            Course not found...
          </h2>
        </div>
      )}
    </div>
  );
}

export default FinishScreen;
