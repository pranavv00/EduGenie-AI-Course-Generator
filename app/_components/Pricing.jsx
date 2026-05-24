"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Hobby",
    price: "$0",
    description: "Perfect for exploring AI-powered learning.",
    features: [
      "5 Course generations",
      "Standard AI chapters",
      "Community access",
      "Standard course banners",
    ],
    buttonText: "Start for Free",
    premium: false,
  },
  {
    name: "Professional",
    price: "$19",
    description: "For serious creators and power learners.",
    features: [
      "Unlimited generations",
      "Gemini Pro AI models",
      "Custom banner uploads",
      "Priority email support",
      "Ad-free experience",
      "Early access to features",
    ],
    buttonText: "Upgrade to Pro",
    premium: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "Advanced solutions for teams and organizations.",
    features: [
      "Bulk generation API",
      "Custom AI model fine-tuning",
      "Dedicated account manager",
      "Advanced usage analytics",
      "SLA & priority uptime",
    ],
    buttonText: "Contact Sales",
    premium: false,
  },
];

function Pricing() {
  return (
    <section className="py-20 px-6 bg-white dark:bg-zinc-950 transition-colors">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12 space-y-3">
          <h2 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
            Simple, transparent pricing
          </h2>
          <p className="text-base text-zinc-500 dark:text-zinc-400 max-w-lg mx-auto">
            Choose the plan that fits your learning journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative p-6 rounded-lg border transition-colors duration-150 ${
                plan.premium
                  ? "bg-white dark:bg-zinc-900 border-zinc-900 dark:border-zinc-100"
                  : "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700"
              }`}
            >
              {plan.premium && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-900 text-[11px] font-medium px-3 py-0.5 rounded-md">
                  Popular
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-3">
                  <span className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">{plan.price}</span>
                  {plan.price !== "Custom" && <span className="text-zinc-500 text-sm">/month</span>}
                </div>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">{plan.description}</p>
              </div>

              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <div className="mt-0.5 flex-none">
                      <Check size={14} strokeWidth={2.5} className="text-zinc-400" />
                    </div>
                    <span className="text-sm text-zinc-600 dark:text-zinc-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                variant={plan.premium ? "default" : "outline"}
                className={`w-full h-9 rounded-lg font-medium text-sm transition-colors duration-150 ${
                  plan.premium
                    ? "bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-50 dark:hover:bg-zinc-200 text-white dark:text-zinc-900"
                    : "border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
                }`}
              >
                {plan.buttonText}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Pricing;
