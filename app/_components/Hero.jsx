import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function Hero() {
  return (
    <section className="relative pt-24 pb-20 bg-white dark:bg-zinc-950 transition-colors">
      <div className="mx-auto max-w-5xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
            <span className="text-xs font-medium">AI-Powered Learning Platform</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight leading-[1.1] text-zinc-900 dark:text-zinc-50 mb-6">
            Personalized courses,{" "}
            <span className="text-zinc-500 dark:text-zinc-400">
              generated in seconds
            </span>
          </h1>

          {/* Description */}
          <p className="text-base sm:text-lg text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-xl mx-auto">
            EduGenie crafts comprehensive, personalized courses with AI-curated
            curriculum and targeted learning paths — ready in under a minute.
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Button
              asChild
              className="h-10 px-6 text-sm font-medium rounded-lg bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-50 dark:hover:bg-zinc-200 text-white dark:text-zinc-900 transition-colors duration-150"
            >
              <Link href="/dashboard">
                Get Started Free
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="h-10 px-6 text-sm font-medium rounded-lg border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors duration-150"
            >
              <Link href="/dashboard/explore">
                Explore Courses
              </Link>
            </Button>
          </div>

          {/* Features Grid */}
          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-6 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-left transition-colors duration-150 hover:border-zinc-300 dark:hover:border-zinc-700">
              <div className="w-10 h-10 bg-zinc-100 dark:bg-zinc-800 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-5 h-5 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-1.5">Lightning Fast</h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">Generate complete courses including content and videos in under 60 seconds.</p>
            </div>

            <div className="p-6 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-left transition-colors duration-150 hover:border-zinc-300 dark:hover:border-zinc-700">
              <div className="w-10 h-10 bg-zinc-100 dark:bg-zinc-800 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-5 h-5 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-1.5">Expertly Curated</h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">AI models follow professional curriculum standards for high-quality content.</p>
            </div>

            <div className="p-6 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-left transition-colors duration-150 hover:border-zinc-300 dark:hover:border-zinc-700">
              <div className="w-10 h-10 bg-zinc-100 dark:bg-zinc-800 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-5 h-5 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-1.5">Adaptive Path</h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">Every course adapts to your level, from complete beginner to expert.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
