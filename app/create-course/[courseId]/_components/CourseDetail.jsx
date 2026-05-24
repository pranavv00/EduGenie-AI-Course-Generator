import React from "react";
import {
  HiOutlineChartBar,
  HiOutlineClock,
  HiOutlineBookOpen,
  HiOutlinePlayCircle,
} from "react-icons/hi2";

function CourseDetail({ course }) {
  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-5 rounded-lg mt-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-500">
            <HiOutlineChartBar size={18} />
          </div>
          <div className="space-y-0.5">
            <p className="text-xs text-zinc-400">Level</p>
            <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{course?.level}</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="p-2 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-500">
            <HiOutlineClock size={18} />
          </div>
          <div className="space-y-0.5">
            <p className="text-xs text-zinc-400">Duration</p>
            <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
              {course?.courseOutput?.Duration || "Unknown"}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="p-2 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-500">
            <HiOutlineBookOpen size={18} />
          </div>
          <div className="space-y-0.5">
            <p className="text-xs text-zinc-400">Chapters</p>
            <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
              {course?.courseOutput?.NoOfChapters || course?.courseOutput?.Chapters?.length || "0"}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="p-2 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-500">
            <HiOutlinePlayCircle size={18} />
          </div>
          <div className="space-y-0.5">
            <p className="text-xs text-zinc-400">Video</p>
            <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{course?.includeVideo === "Yes" ? "Included" : "None"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseDetail;
