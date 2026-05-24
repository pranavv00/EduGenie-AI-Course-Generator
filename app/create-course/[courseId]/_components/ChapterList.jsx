import React from "react";
import { HiOutlineClock, HiOutlineCheckCircle } from "react-icons/hi2";
import EditChapters from "./EditChapters";
function ChapterList({ course, refreshData, edit = true }) {
  return (
    <div className="mt-6">
      <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
        Curriculum
      </h2>
      <div className="space-y-2">
        {course?.courseOutput?.Chapters.map((chapter, index) => (
          <div
            key={index}
            className="group p-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg transition-colors duration-150 hover:border-zinc-300 dark:hover:border-zinc-700 flex items-center justify-between gap-4"
          >
            <div className="flex gap-4 items-center flex-grow">
              <div className="flex-none h-8 w-8 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-500 flex items-center justify-center text-sm font-medium">
                {index + 1}
              </div>
              <div className="space-y-0.5">
                <h3 className="text-sm font-medium text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                  {chapter?.ChapterName}
                  {edit && (
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                      <EditChapters
                        course={course}
                        index={index}
                        refreshData={() => refreshData(true)}
                      />
                    </div>
                  )}
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-1">
                  {chapter?.About}
                </p>
                <div className="flex items-center gap-1 pt-1">
                   <div className="flex items-center gap-1 text-xs text-zinc-400">
                    <HiOutlineClock size={12} />
                    {chapter?.Duration}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-none">
              <HiOutlineCheckCircle className="text-xl text-zinc-200 dark:text-zinc-700 group-hover:text-zinc-400 transition-colors duration-150" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ChapterList;
