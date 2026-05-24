import React from "react";
import { HiOutlineLightBulb, HiOutlineCog, HiOutlineSparkles } from "react-icons/hi2";

function HowItWorks() {
  const steps = [
    {
      id: 1,
      title: "Set your topic",
      description: "Tell us what you want to learn, from 'Next.js basics' to 'Advanced Machine Learning'.",
      icon: <HiOutlineLightBulb className="w-6 h-6 text-zinc-600 dark:text-zinc-400" />
    },
    {
      id: 2,
      title: "AI structures the curriculum",
      description: "Our engine instantly generates a structured curriculum tailored to your requested level and duration.",
      icon: <HiOutlineCog className="w-6 h-6 text-zinc-600 dark:text-zinc-400" />
    },
    {
      id: 3,
      title: "Start learning",
      description: "Dive into personalized chapters complete with explanations, curated videos, and code examples.",
      icon: <HiOutlineSparkles className="w-6 h-6 text-zinc-600 dark:text-zinc-400" />
    }
  ];

  return (
    <section className="py-20 px-6 bg-zinc-50 dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-800 transition-colors">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
            How EduGenie works
          </h2>
          <p className="mt-4 text-base text-zinc-500 dark:text-zinc-400 max-w-xl mx-auto">
            Go from a simple topic idea to a fully fleshed-out interactive course in less than a minute.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step) => (
            <div key={step.id} className="relative flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center mb-6 shadow-sm z-10">
                {step.icon}
              </div>
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-xs">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
