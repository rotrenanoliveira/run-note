'use client'

import { useContext, useEffect, useState } from 'react'
import { CountdownContext } from '../_context/countdown'
import { Pause } from '@/components/ui/icons'

export function Countdown() {
  const {
    countdown: { countdown, hasActiveCountdown },
    removeCountdown,
  } = useContext(CountdownContext)

  const [minutesAmount, setMinutesAmount] = useState<number>(0)
  const [secondsAmount, setSecondsAmount] = useState<number>(0)

  useEffect(() => {
    if (hasActiveCountdown === true && countdown !== null) {
      setMinutesAmount(minutesAmount)
      setSecondsAmount(secondsAmount)

      const interval = setInterval(() => {
        const now = new Date().getTime()
        const distance = new Date(countdown.startDate).getTime() + countdown.totalSeconds * 1000 - now

        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((distance % (1000 * 60)) / 1000)
        // console.log('minutes', minutes, 'seconds', seconds)
        setMinutesAmount(minutes)
        setSecondsAmount(seconds)

        const diff = now - new Date(countdown.startDate).getTime()

        if (diff >= countdown.totalSeconds * 1000) {
          clearInterval(interval)
          setMinutesAmount(0)
          setSecondsAmount(0)

          removeCountdown()
        }
      }, 1000)
    }
  }, [minutesAmount, secondsAmount, hasActiveCountdown, countdown, removeCountdown])

  return (
    <div className="w-80 p-4 rounded-2xl">
      <div className="flex flex-col items-center justify-center">
        <p className="text-5xl lg:text-7xl lg:h-24 flex items-center justify-center">
          {/* className="text-5xl  bg-transparent size-16 lg:size-24 text-center countdown-timers-input" */}
          {minutesAmount.toString().padStart(2, '0')}:{secondsAmount.toString().padStart(2, '0')}
        </p>

        <button className="mt-4 p-2 rounded-full border-[1px] border-[#F7CE78] hover:border-[#DEA632] dark:border-[#F7CE78]/[0.5] bg-[#FFE3A9]/[0.15] dark:bg-[#FFE3A9]/[0.25] transition-colors duration-300">
          <Pause className="fill-[#DEA632] dark:fill-[#F7CE78]" />
        </button>
      </div>
    </div>
  )
}
