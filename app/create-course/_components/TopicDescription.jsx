import { UserInputContext } from "@/app/_context/UserInputContext";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import React, { useContext } from "react";

function TopicDescription() {
  const { userCourseInput, setUserCourseInput } = useContext(UserInputContext);

  const handleInputChange = (fieldName, value) => {
    setUserCourseInput((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  return (
    <div className="space-y-8 max-w-xl mx-auto w-full">
      {/* Input Topic */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
          Course Topic
        </label>
        <Input
          placeholder="e.g. Next.js Masterclass, SDE Interview Prep, UI/UX Design..."
          className="h-10 text-sm px-4 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 rounded-lg focus:ring-1 focus:ring-zinc-400 transition-colors duration-150"
          defaultValue={userCourseInput?.topic}
          onChange={(e) => handleInputChange("topic", e.target.value)}
        />
        <p className="text-xs text-zinc-400 pl-0.5">
          Be specific for better results.
        </p>
      </div>

      {/* Description Area */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
          Additional Context <span className="text-zinc-400 font-normal">(Optional)</span>
        </label>
        <Textarea
          placeholder="Tell us about specific topics, tools, or goals you want to include..."
          className="h-28 text-sm p-4 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 rounded-lg focus:ring-1 focus:ring-zinc-400 transition-colors duration-150 resize-none"
          defaultValue={userCourseInput?.description}
          onChange={(e) => handleInputChange("description", e.target.value)}
        />
      </div>
    </div>
  );
}

export default TopicDescription;
