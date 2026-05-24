"use client";
import { Button } from "@/components/ui/button";
import React, { useContext, useEffect, useState } from "react";
import {
  HiMiniSquares2X2,
  HiLightBulb,
  HiClipboardDocumentCheck,
} from "react-icons/hi2";
import SelectCategory from "./_components/SelectCategory";
import TopicDescription from "./_components/TopicDescription";
import SelectOptions from "./_components/SelectOptions";
import { UserInputContext } from "../_context/UserInputContext";
import { GenerateCourseLayout_AI } from "@/configs/AiModel";
import LoadingDialog from "./_components/LoadingDialog";
import { db } from "@/configs/db";
import { CourseList } from "@/configs/schema";
import uuid4 from "uuid4";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft } from "lucide-react";

function CreateCourse() {
  const StepperOptions = [
    {
      id: 1,
      name: "Category",
      icon: <HiMiniSquares2X2 />,
    },
    {
      id: 2,
      name: "Topic & Desc",
      icon: <HiLightBulb />,
    },
    {
      id: 3,
      name: "Options",
      icon: <HiClipboardDocumentCheck />,
    },
  ];

  const [loading, setLoading] = useState(false);

  const { userCourseInput, setUserCourseInput } = useContext(UserInputContext);

  const [activeIndex, setActiveIndex] = useState(0);
  const { user } = useUser();
  const { toast } = useToast();

  // useEffect(() => {
  //   // console.log(userCourseInput);
  // }, [userCourseInput]);

  /**
   *  Used to check Next Button enabled or disabled
   */

  const checkStatus = () => {
    // if (userCourseInput?.length == 0) return true;
    if (
      activeIndex === 0 &&
      (!userCourseInput?.category || userCourseInput?.category == "Others")
    )
      return true;
    if (activeIndex === 1 && !userCourseInput?.topic) return true;
    if (
      activeIndex === 2 &&
      (!userCourseInput?.level ||
        !userCourseInput?.displayVideo ||
        !userCourseInput?.noOfChapters ||
        !userCourseInput?.duration ||
        userCourseInput.noOfChapters < 1 ||
        userCourseInput.noOfChapters > 20)
    )
      return true;

    return false;
  };

  const router = useRouter();
  const GenerateCourseLayout = async () => {
    try {
      setLoading(true);
      const BASIC_PROMPT =
        `Generate A Course Tutorial on Following Details with Course Name, Description, and Chapters. 
        IMPORTANT: For EACH chapter, provide detailed content in a "content" field which is an array of objects with "title", "explanation", and "codeExample" (wrapped in <precode> tags if applicable).
        
        The response must be a strict JSON object with:
        {
          "CourseName": "...",
          "Description": "...",
          "Duration": "...",
          "NoOfChapters": "...",
          "Chapters": [
            {
              "ChapterName": "...",
              "About": "...",
              "Duration": "...",
              "content": [
                { "title": "...", "explanation": "...", "codeExample": "..." }
              ]
            }
          ]
        }
        
        Details: `;

      const USER_INPUT_PROMPT =
        "Category: " +
        userCourseInput?.category +
        ", Topic: " +
        userCourseInput?.topic +
        ", Level:" +
        userCourseInput?.level +
        ",Duration:" +
        userCourseInput?.duration +
        ",NoOfChapters:" +
        userCourseInput?.noOfChapters +
        ", in JSON format";

      const FINAL_PROMPT = BASIC_PROMPT + USER_INPUT_PROMPT;

      const result = await GenerateCourseLayout_AI.sendMessage(FINAL_PROMPT);
      const courseOutput = JSON.parse(result.response?.text());
      
      SaveCourseLayoutInDB(courseOutput);
      toast({
        variant: "success",
        duration: 3000,
        title: "Course Layout Generated Successfully!",
        description: "Course Layout has been generated successfully!",
      });
    } catch (error) {
      console.log("Error generating course layout:", error);
      toast({
        variant: "destructive",
        duration: 3000,
        title: "Uh oh! Something went wrong.",
        description: error?.message || "There was a problem with your request.",
      });
    } finally {
      setLoading(false);
    }
  };

  const SaveCourseLayoutInDB = async (courseLayout) => {
    try {
      var id = uuid4();
      const result = await db.insert(CourseList).values({
        courseId: id,
        name: userCourseInput?.topic,
        level: userCourseInput?.level,
        category: userCourseInput?.category,
        courseOutput: courseLayout,
        createdBy: user?.primaryEmailAddress?.emailAddress,
        userName: user?.fullName,
        includeVideo: userCourseInput?.displayVideo,
        userProfileImage: user?.imageUrl,
      });

      // console.log("Course Layout Saved in DB", result.command);
      router.replace(`/create-course/${id}`);
    } catch (error) {
      console.log("Error saving course layout to DB:", error);
      toast({
        variant: "destructive",
        duration: 3000,
        title: "Uh oh! Something went wrong.",
        description: error?.message || "There was a problem with your request.",
      });
    }
  };
  return (
    <div className="max-w-3xl mx-auto px-6 py-10 min-h-screen">
      {/* Back Button */}
      <Button
        variant="ghost"
        onClick={() => router.replace("/dashboard")}
        className="flex items-center gap-1.5 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors duration-150 mb-6 -ml-3 rounded-lg h-8 px-3 text-sm"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span className="font-medium">Back</span>
      </Button>
      {/* Stepper Header */}
      <div className="flex flex-col justify-center items-center mb-12">
        <h2 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
          Create a new course
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1.5 text-center max-w-sm">
          Follow the steps below to generate a learning path.
        </p>

        <div className="flex items-center mt-10 w-full max-w-xl">
          {StepperOptions.map((item, index) => (
            <React.Fragment key={item.id}>
              <div className="flex flex-col items-center flex-1 relative">
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors duration-150 border ${
                    activeIndex >= index 
                      ? "bg-zinc-900 dark:bg-zinc-50 border-zinc-900 dark:border-zinc-50 text-white dark:text-zinc-900" 
                      : "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-400"
                  }`}
                >
                  <div className="text-lg">
                    {item.icon}
                  </div>
                </div>
                <h2 className={`mt-3 text-xs font-medium transition-colors duration-150 ${
                  activeIndex >= index ? "text-zinc-900 dark:text-zinc-100" : "text-zinc-400"
                }`}>
                  {item.name}
                </h2>
              </div>
              
              {index !== StepperOptions.length - 1 && (
                <div className="flex-1 h-px mb-6 bg-zinc-200 dark:bg-zinc-800 overflow-hidden">
                  <div 
                    className="h-full bg-zinc-900 dark:bg-zinc-50 transition-all duration-300 ease-in-out"
                    style={{ width: activeIndex > index ? '100%' : '0%' }}
                  />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Centered Component Area */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-6 md:p-8">
        {/* Components */}
        <div className="min-h-[360px]">
          {activeIndex === 0 && <SelectCategory />}
          {activeIndex === 1 && <TopicDescription />}
          {activeIndex === 2 && <SelectOptions />}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center mt-8 pt-6 border-t border-zinc-100 dark:border-zinc-800">
          <Button
            disabled={activeIndex === 0}
            variant="ghost"
            onClick={() => setActiveIndex(activeIndex - 1)}
            className="rounded-lg px-5 h-9 text-sm font-medium text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-50 dark:hover:bg-zinc-800"
          >
            Previous
          </Button>
          
          {activeIndex !== StepperOptions.length - 1 ? (
            <Button
              onClick={() => setActiveIndex(activeIndex + 1)}
              disabled={checkStatus()}
              className="rounded-lg px-6 h-9 text-sm font-medium bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors duration-150 disabled:opacity-50"
            >
              Next
            </Button>
          ) : (
            <Button
              disabled={checkStatus()}
              onClick={() => GenerateCourseLayout()}
              className="rounded-lg px-6 h-9 text-sm font-medium bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors duration-150 disabled:opacity-50"
            >
              Generate Course
            </Button>
          )}
        </div>
      </div>
      <LoadingDialog loading={loading} />
    </div>
  );
}

export default CreateCourse;
