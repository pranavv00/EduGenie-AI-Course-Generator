import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { HiMiniPencilSquare } from "react-icons/hi2";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { db } from "@/configs/db";
import { CourseList } from "@/configs/schema";
import { eq } from "drizzle-orm";
import { useToast } from "@/hooks/use-toast";

function EditCourseBasicInfo({ course, refreshData }) {
  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const { toast } = useToast();

  useEffect(() => {
    setName(course?.courseOutput?.CourseName);
    setDescription(course?.courseOutput?.Description);
  }, [course]);

  const onUpdateHandler = async () => {
    try {
      course.courseOutput.CourseName = name;
      course.courseOutput.Description = description;
      const result = await db
        .update(CourseList)
        .set({ courseOutput: course?.courseOutput })
        .where(eq(CourseList?.id, course?.id))
        .returning({ id: CourseList.id });

      // console.log(result);
      refreshData(true);
      toast({
        variant: "success",
        duration: 3000,
        title: "Course Updated Successfully!",
        description: "Course has been updated successfully!",
      });
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
      <Dialog>
        <DialogTrigger>
          <HiMiniPencilSquare />
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Course Title & Description</DialogTitle>
            <DialogDescription>
              Please update the course title and description below.
            </DialogDescription>
          </DialogHeader>

          <div className="text-zinc-600 dark:text-zinc-400 text-sm space-y-4">
            <div>
              <label className="font-medium text-zinc-900 dark:text-zinc-100 mb-1.5 block">Course Title</label>
              <Input
                onChange={(e) => setName(e.target.value)}
                defaultValue={course?.courseOutput?.CourseName}
                className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 focus:ring-1 focus:ring-zinc-400"
              />
            </div>
            <div>
              <label className="font-medium text-zinc-900 dark:text-zinc-100 mb-1.5 block">Description</label>
              <Textarea
                onChange={(e) => setDescription(e.target.value)}
                className="h-40 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 focus:ring-1 focus:ring-zinc-400 resize-none"
                defaultValue={course?.courseOutput?.Description}
              />
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button onClick={() => onUpdateHandler()}>Update</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default EditCourseBasicInfo;
