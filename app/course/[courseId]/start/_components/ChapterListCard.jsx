import React from "react";
import { HiOutlineClock } from "react-icons/hi";

function ChapterListCard({ chapter, index, active = false }) {
  return (
    <div className={`flex items-center gap-3 px-3 py-2 transition-colors duration-150 group ${active ? "opacity-100" : "opacity-70 hover:opacity-100"}`}>
      <div className={`flex items-center justify-center flex-none w-7 h-7 rounded-md text-xs font-medium transition-colors duration-150 ${
        active 
          ? "bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-900 border border-zinc-900 dark:border-zinc-50" 
          : "bg-white dark:bg-zinc-900 text-zinc-500 border border-zinc-200 dark:border-zinc-800 group-hover:border-zinc-300 dark:group-hover:border-zinc-700"
      }`}>
        {index + 1}
      </div>

      <div className="flex-grow space-y-0.5">
        <h3 className={`font-medium text-xs tracking-tight line-clamp-2 ${
          active ? "text-zinc-900 dark:text-zinc-100" : "text-zinc-600 dark:text-zinc-400"
        }`}>
          {chapter?.ChapterName}
        </h3>
        <div className={`flex items-center gap-1 text-[10px] font-medium ${
          active ? "text-zinc-600 dark:text-zinc-400" : "text-zinc-400"
        }`}>
          <HiOutlineClock size={10} />
          {chapter?.Duration}
        </div>
      </div>
    </div>
  );
}

export default ChapterListCard;
