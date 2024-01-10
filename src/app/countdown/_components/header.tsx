import { novaMono } from '@/app/fonts'
import clsx from 'clsx'
import { ToggleTheme } from './toggle-theme'

export function CountdownHeader() {
  return (
    <header className="flex items-center justify-between text-runnote-gray-900 dark:text-runnote-gray-50">
      <div className="flex flex-col gap-4">
        <h1 className={clsx(novaMono.className, 'text-4xl')}>Countdown</h1>

        <div className="flex flex-col gap-2">
          <div className="w-16 h-[2px] bg-zinc-500 rounded-full" />
          <div className="w-12 h-[2px] bg-zinc-500 rounded-full" />
        </div>
      </div>

      <ToggleTheme />
    </header>
  )
}
