"use client";
import { UserInputContext } from "@/app/_context/UserInputContext";
import CategoryList from "@/app/_shared/CategoryList";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import React, { useContext, useState } from "react";

function SelectCategory() {
  const { userCourseInput, setUserCourseInput } = useContext(UserInputContext);
  const [inputCategory, setInputCategory] = useState("");

  const handleCategoryChange = (category, active) => {
    setUserCourseInput((prev) => ({
      ...prev,
      category: category,
      activeInput: active,
    }));
  };

  return (
    <div className="space-y-6">
      <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
        Select a course category
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {CategoryList.map((item, index) => (
          <div
            key={item.id}
            className={`flex flex-col p-5 border items-center justify-center rounded-lg transition-colors duration-150 cursor-pointer ${
              userCourseInput?.category === item.name && !userCourseInput?.activeInput
                ? "border-zinc-900 dark:border-zinc-100 bg-zinc-50 dark:bg-zinc-800"
                : "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700"
            }`}
            onClick={() => handleCategoryChange(item.name, false)}
          >
            <div className="p-3 rounded-lg bg-zinc-100 dark:bg-zinc-800">
              <Image src={item.icon} alt={item.name} width={32} height={32} className="w-8 h-8 object-contain" />
            </div>
            <h2 className={`mt-3 text-sm font-medium transition-colors duration-150 ${
              userCourseInput?.category === item.name && !userCourseInput?.activeInput ? "text-zinc-900 dark:text-zinc-100" : "text-zinc-600 dark:text-zinc-400"
            }`}>
              {item.name}
            </h2>
          </div>
        ))}

        {userCourseInput?.category === "Others" && !userCourseInput?.activeInput && (
          <div
            className="col-span-1 sm:col-span-2 lg:col-span-1 p-5 border border-zinc-900 dark:border-zinc-100 bg-zinc-50 dark:bg-zinc-800 rounded-lg"
          >
            <Input
              placeholder="Type custom category..."
              className="h-10 text-sm bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 rounded-lg mb-3"
              onChange={(e) => setInputCategory(e.target.value)}
              autoFocus
            />
            <Button
              disabled={inputCategory.length === 0}
              onClick={() => handleCategoryChange(inputCategory, true)}
              className="w-full h-9 rounded-lg bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-50 dark:hover:bg-zinc-200 text-white dark:text-zinc-900 text-sm font-medium transition-colors duration-150"
            >
              Save Category
            </Button>
          </div>
        )}

        {userCourseInput?.activeInput && (
          <div
            className="flex flex-col p-5 border border-zinc-900 dark:border-zinc-100 bg-zinc-50 dark:bg-zinc-800 items-center justify-center rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
            onClick={() => {
               // Allow resetting/changing if needed
               setUserCourseInput(prev => ({...prev, category: "Others", activeInput: false}))
            }}
          >
            <div className="p-3 rounded-lg bg-zinc-100 dark:bg-zinc-700">
              <Image
                src={"/other.png"}
                alt={"Others Image"}
                width={32}
                height={32}
                className="w-8 h-8 object-contain"
              />
            </div>
            <h2 className="mt-3 text-sm font-medium text-zinc-900 dark:text-zinc-100">{userCourseInput?.category}</h2>
            <p className="text-xs text-zinc-400 mt-0.5">Custom</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default SelectCategory;
