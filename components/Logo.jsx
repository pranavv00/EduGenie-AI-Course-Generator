import Link from 'next/link'
import React from 'react'

const Logo = () => {
  return (
    <Link href="/" className="hover:opacity-80 transition-opacity">
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-lg bg-zinc-900 dark:bg-zinc-50 flex items-center justify-center">
          <span className="text-white dark:text-zinc-900 text-sm font-semibold">E</span>
        </div>
        <span className="text-sm font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          EduGenie
        </span>
      </div>
    </Link>
  )
}

export default Logo
