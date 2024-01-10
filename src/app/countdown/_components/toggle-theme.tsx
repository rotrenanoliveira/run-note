'use client'

import { Moon, Sun } from '@/components/ui/icons'
import { useTheme } from '@/context/theme'
import { useEffect, useState } from 'react'

export function ToggleTheme() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  function toggleTheme() {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  return (
    <>
      {theme === 'light' ? (
        <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-zinc-100">
          <Moon className="fill-zinc-900" />
        </button>
      ) : (
        <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-zinc-800">
          <Sun className="dark:fill-zinc-50" />
        </button>
      )}
    </>
  )
}
