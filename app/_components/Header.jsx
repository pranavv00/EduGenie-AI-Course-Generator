import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'
import Logo from '@/components/Logo'
import { ThemeToggle } from '@/components/ThemeToggle'

function Header() {
  return (
    <header className='sticky top-0 z-50 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-sm border-b border-zinc-200 dark:border-zinc-800'>
      <div className='flex justify-between items-center px-6 py-3 max-w-5xl mx-auto'>
        <Logo />
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Button asChild className="h-9 px-4 text-sm font-medium rounded-lg bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-50 dark:hover:bg-zinc-200 text-white dark:text-zinc-900 transition-colors duration-150">
            <Link href="/dashboard">Get Started</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}

export default Header
