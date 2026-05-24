import React, { useContext } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { UserInputContext } from "@/app/_context/UserInputContext";

function SelectOptions() {
  const { userCourseInput, setUserCourseInput } = useContext(UserInputContext);

  const handleInputChange = (fieldName, value) => {
    setUserCourseInput((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Difficulty Level</label>
          <Select
            onValueChange={(value) => handleInputChange("level", value)}
            defaultValue={userCourseInput?.level}
          >
            <SelectTrigger className="h-10 rounded-lg bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 px-3 text-sm focus:ring-1 focus:ring-zinc-400 transition-colors duration-150">
              <SelectValue placeholder="Select Difficulty" />
            </SelectTrigger>
            <SelectContent className="rounded-lg border-zinc-200 dark:border-zinc-800">
              <SelectItem value="Beginner">Beginner</SelectItem>
              <SelectItem value="Intermediate">Intermediate</SelectItem>
              <SelectItem value="Advance">Advance</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Course Duration</label>
          <Select
            defaultValue={userCourseInput?.duration}
            onValueChange={(value) => handleInputChange("duration", value)}
          >
            <SelectTrigger className="h-10 rounded-lg bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 px-3 text-sm focus:ring-1 focus:ring-zinc-400 transition-colors duration-150">
              <SelectValue placeholder="Select Duration" />
            </SelectTrigger>
            <SelectContent className="rounded-lg border-zinc-200 dark:border-zinc-800">
              <SelectItem value="1 Hours">1 Hours</SelectItem>
              <SelectItem value="2 Hours">2 Hours</SelectItem>
              <SelectItem value="More than 3 Hours">More than 3 Hours</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Include Video</label>
          <Select
            defaultValue={userCourseInput?.displayVideo}
            onValueChange={(value) => handleInputChange("displayVideo", value)}
          >
            <SelectTrigger className="h-10 rounded-lg bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 px-3 text-sm focus:ring-1 focus:ring-zinc-400 transition-colors duration-150">
              <SelectValue placeholder="Include YouTube Videos?" />
            </SelectTrigger>
            <SelectContent className="rounded-lg border-zinc-200 dark:border-zinc-800">
              <SelectItem value="Yes">Yes</SelectItem>
              <SelectItem value="No">No</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">No. of Chapters</label>
          <Input
            type="number"
            placeholder="1–20"
            className="h-10 rounded-lg bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 px-3 text-sm focus:ring-1 focus:ring-zinc-400 transition-colors duration-150"
            defaultValue={userCourseInput?.noOfChapters}
            onChange={(e) => handleInputChange("noOfChapters", e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}

export default SelectOptions;
