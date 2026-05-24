import Image from "next/image";
import React from "react";
import { HiOutlineBookOpen, HiEllipsisVertical } from "react-icons/hi2";
import DropdownOption from "./DropdownOption";
import { db } from "@/configs/db";
import { Chapters, CourseList } from "@/configs/schema";
import { eq } from "drizzle-orm";
import { deleteObject, ref } from "firebase/storage";
import { storage } from "@/configs/firebaseConfig";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";

function CourseCard({ course, refreshData, displayUser = false }) {
  const { toast } = useToast();
  const handleOnDelete = async () => {
    try {
      // console.log("Course : " + course?.courseId);

      // Delete Banner Image
      if (course?.courseBanner != "/placeholder.png") {
        const filePath = course?.courseBanner
          .replace(
            "https://firebasestorage.googleapis.com/v0/b/explorer-1844f.firebasestorage.app/o/",
            ""
          )
          .split("?")[0];
        const fileRef = ref(storage, decodeURIComponent(filePath));

        await deleteObject(fileRef);
        // console.log("Image Deleted");
      }

      // Delete Course
      const courseResponse = await db
        .delete(CourseList)
        .where(eq(CourseList.id, course?.id))
        .returning({ id: CourseList?.id });

      // console.log("Course Deleted : " + courseResponse);

      // Delete Chapters
      const chapterResponse = await db
        .delete(Chapters)
        .where(eq(Chapters.courseId, course?.courseId))
        .returning({ id: Chapters?.id });

      // console.log("Chapters Deleted : " + chapterResponse);

      if (courseResponse && chapterResponse) {
        refreshData();
        toast({
          variant: "success",
          duration: 3000,
          title: "Course Deleted Successfully!",
          description: "Course has been deleted successfully!",
        });
      }
    } catch (error) {
      // console.log("Error during deletion : " + error);
      toast({
        variant: "destructive",
        duration: 3000,
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
    }
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 transition-colors duration-150 hover:border-zinc-300 dark:hover:border-zinc-700 group relative overflow-hidden">
      <div className="relative aspect-video overflow-hidden">
        <Link
          href={
            course?.publish
              ? `/course/${course.courseId}`
              : `/create-course/${course?.courseId}`
          }
        >
          <Image
            src={course?.courseBanner}
            alt="course"
            fill
            className="object-cover rounded-t-lg"
          />
        </Link>
        {!displayUser && course?.publish == false && (
          <div className="absolute top-2 left-2">
             <span className="px-2 py-0.5 text-[11px] font-medium bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300 rounded-md">
               Draft
             </span>
          </div>
        )}
      </div>

      <div className="flex flex-col flex-grow p-4">
        <div className="flex justify-between items-start mb-1">
          <Link
            href={
              course?.publish
                ? `/course/${course.courseId}`
                : `/create-course/${course?.courseId}`
            }
            className="flex-grow"
          >
            <h2 className="font-medium text-sm text-zinc-900 dark:text-zinc-100 line-clamp-2 leading-snug">
              {course?.courseOutput?.CourseName}
            </h2>
          </Link>
          {!displayUser && (
            <div className="ml-2">
              <DropdownOption
                courseId={course?.courseId}
                handleOnDelete={() => handleOnDelete()}
              >
                <div className="p-1 -mr-1 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-400 hover:text-zinc-600 transition-colors duration-150 cursor-pointer">
                  <HiEllipsisVertical size={16} />
                </div>
              </DropdownOption>
            </div>
          )}
        </div>

        <p className="text-xs text-zinc-400 mb-3">
          {course?.category}
        </p>

        <div className="mt-auto flex items-center justify-between pt-3 border-t border-zinc-100 dark:border-zinc-800">
          <div className="flex items-center gap-1.5 text-zinc-500 dark:text-zinc-400">
            <HiOutlineBookOpen className="w-3.5 h-3.5" />
            <span className="text-xs">{course?.courseOutput?.NoOfChapters} Chapters</span>
          </div>

          <span className="px-2 py-0.5 text-[11px] font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 rounded-md">
            {course?.level}
          </span>
        </div>

        {displayUser && (
          <div className="flex items-center gap-2 mt-3 pt-3 border-t border-zinc-100 dark:border-zinc-800">
            <Image
              src={course?.userProfileImage}
              width={20}
              height={20}
              alt={course?.userName}
              className="rounded-full"
            />
            <span className="text-xs text-zinc-500 dark:text-zinc-400">{course?.userName}</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default CourseCard;
