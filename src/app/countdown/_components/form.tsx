'use client'

import { useContext } from 'react'
import { CountdownContext } from '../_context/countdown'
import { Play } from '@/components/ui/icons'

export function CountdownForm() {
  const { startCountdown } = useContext(CountdownContext)

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const minutesAmount = Number(formData.get('minutesAmount'))
    const secondsAmount = Number(formData.get('secondsAmount'))

    const totalSeconds = minutesAmount * 60 + secondsAmount

    if (totalSeconds <= 0) {
      return
    }

    startCountdown(totalSeconds)
  }

  return (
    <div className="w-80 p-4 rounded-2xl">
      <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center">
        <div className="flex gap items-center justify-center text-5xl">
          <input
            type="number"
            name="minutesAmount"
            id="minutesAmount"
            min={1}
            max={60}
            step={1}
            placeholder="00"
            className="text-5xl lg:text-7xl bg-transparent size-16 lg:size-24 text-center countdown-timers-input"
          />{' '}
          <span> : </span>
          <input
            type="number"
            name="secondsAmount"
            id="secondsAmount"
            min={0}
            max={60}
            step={1}
            placeholder="00"
            className="text-5xl lg:text-7xl bg-transparent size-16 lg:size-24 text-center countdown-timers-input"
          />
        </div>

        <button className="mt-4 p-2 rounded-full border-[1px] border-runnote-green-50 hover:border-runnote-green-300 dark:border-[#256F4C] bg-runnote-green-50/20 dark:bg-[#133929] transition-colors duration-300">
          <Play className="fill-runnote-green-300 dark:fill-runnote-green-300" />
        </button>
      </form>
    </div>
  )
}
