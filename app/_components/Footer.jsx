import React from "react";

function Footer() {
  return (
    <footer className="border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950">
      <div className="mx-auto max-w-5xl px-6 py-8">
        <div className="flex flex-col items-center justify-center gap-2 text-center">
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            © 2025 SeedOfCode. All rights reserved.
          </p>
          <p className="text-xs text-zinc-400 dark:text-zinc-500 max-w-md">
            AI-driven personalized education — create, learn, and grow with custom learning paths.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
