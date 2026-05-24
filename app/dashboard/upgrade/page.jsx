"use client";
import React from "react";
import Pricing from "../../_components/Pricing";

function Upgrade() {
  return (
    <div className="max-w-5xl mx-auto space-y-10 pb-16">
      {/* Page Header */}
      <div className="flex flex-col items-center text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 text-xs font-medium">
           Plans
        </div>
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
           Upgrade your plan
        </h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-md mx-auto">
           Choose a plan that fits your learning pace and unlock advanced AI capabilities.
        </p>
      </div>

      {/* Current Status Card */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 rounded-lg">
         <div className="space-y-3">
            <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Current Status</h2>
            <div className="flex items-center gap-3">
               <div className="px-2.5 py-1 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-medium text-xs">
                  Free Plan
               </div>
               <span className="text-sm text-zinc-500">0/5 Courses Generated This Month</span>
            </div>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-lg">
               You are currently on the Hobby plan. Upgrade to Professional to unlock unlimited course generations.
            </p>
         </div>
      </div>

      {/* Pricing Grid */}
      <div className="-mx-6">
        <Pricing />
      </div>

      {/* Footer info */}
      <div className="text-center pt-8 border-t border-zinc-200 dark:border-zinc-800">
         <p className="text-xs text-zinc-400">
            Secure checkout via Stripe. Cancel anytime.
         </p>
      </div>
    </div>
  );
}

export default Upgrade;