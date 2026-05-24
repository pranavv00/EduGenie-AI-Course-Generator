import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { HiOutlinePuzzle } from "react-icons/hi";
import EditCourseBasicInfo from "./EditCourseBasicInfo";
import { storage } from "@/configs/firebaseConfig";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import { db } from "@/configs/db";
import { CourseList } from "@/configs/schema";
import { eq } from "drizzle-orm";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";

function CourseBasicInfo({ course, refreshData, edit = true }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const { toast } = useToast();

  const onFileChanged = async (e) => {
    try {
      const file = e.target.files[0];
      setSelectedFile(URL.createObjectURL(file));

      // Delete Previous Image
      if (course?.courseBanner != "/placeholder.png") {
        const filePath = course?.courseBanner
          .replace(
            "https://firebasestorage.googleapis.com/v0/b/explorer-1844f.firebasestorage.app/o/",
            ""
          )
          .split("?")[0];
        const fileRef = ref(storage, decodeURIComponent(filePath));

        await deleteObject(fileRef);
        // console.log("Previous Image Deleted");
      }

      // Upload new image in storage
      const fileName = Date.now() + file.name;
      const storageRef = ref(storage, "ai-course/" + fileName);

      const snapshot = await uploadBytes(storageRef, file);
      // console.log("Uploaded Completed!");
      toast({
        variant: "success",
        duration: 3000,
        title: "Image Uploaded Successfully!",
        description: "Image has been uploaded successfully.",
      });

      const imageLink = await getDownloadURL(storageRef);
      // console.log("Image Link Generated!", imageLink);

      const result = await db
        .update(CourseList)
        .set({ courseBanner: imageLink })
        .where(eq(CourseList.id, course?.id));
      // console.log(result);
      refreshData(true);
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
    <div className="p-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg mt-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <div className="space-y-4">
          <div className="space-y-2">
            <h2 className="text-lg font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 flex items-start gap-2">
              {course?.courseOutput?.CourseName}
              {edit && (
                <div className="mt-0.5">
                  <EditCourseBasicInfo
                    course={course}
                    refreshData={() => {
                      refreshData(true);
                    }}
                  />
                </div>
              )}
            </h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
              {course?.courseOutput?.Description}
            </p>
          </div>
          
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 w-fit">
            <span className="text-xs font-medium">{course?.category}</span>
          </div>

          {!edit && (
            <Link href={`/course/${course?.courseId}/start`} className="block pt-2">
              <Button className="w-full h-10 rounded-lg text-sm font-medium bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-50 dark:hover:bg-zinc-200 text-white dark:text-zinc-900 transition-colors duration-150">
                 Get Started
              </Button>
            </Link>
          )}
        </div>

        <div className="relative group">
          <label htmlFor="upload-image" className="block w-full h-full relative overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-800">
            <Image
              src={
                selectedFile
                  ? selectedFile
                  : course?.courseBanner || "/placeholder.png"
              }
              quality={100}
              priority={true}
              alt="course banner"
              width={500}
              height={300}
              className={`w-full object-cover aspect-video ${
                edit ? "cursor-pointer" : ""
              }`}
            />
            {edit && (
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-150 flex items-center justify-center opacity-0 group-hover:opacity-100">
                 <span className="bg-white/90 px-3 py-1.5 rounded-md text-xs font-medium text-zinc-900">Change Banner</span>
              </div>
            )}
          </label>
          {edit && (
            <input
              type="file"
              accept="image/*"
              id="upload-image"
              className="hidden"
              onChange={onFileChanged}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default CourseBasicInfo;
