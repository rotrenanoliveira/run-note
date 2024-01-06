'use client'

import { useContext, useEffect, useState } from 'react'
import { CountdownContext } from '../_context/countdown'
import { Pause } from '@/components/ui/icons'

interface CountdownProps {
  countdownDivRef: React.RefObject<HTMLDivElement>
}

export function Countdown({ countdownDivRef }: CountdownProps) {
  const { countdown, finishCountdown } = useContext(CountdownContext)

  const hasCountdown = countdown !== null
  const hasActiveCountdown = hasCountdown && countdown.hasActiveCountdown

  const [minutesAmount, setMinutesAmount] = useState<number>(0)
  const [secondsAmount, setSecondsAmount] = useState<number>(0)

  useEffect(() => {
    if (hasActiveCountdown === true && countdown.countdown !== null) {
      const countdownOn = countdown.countdown

      setMinutesAmount(minutesAmount)
      setSecondsAmount(secondsAmount)

      const interval = setInterval(() => {
        const now = new Date().getTime()
        const distance = new Date(countdownOn.startDate).getTime() + countdownOn.totalSeconds * 1000 - now

        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((distance % (1000 * 60)) / 1000)
        // console.log('minutes', minutes, 'seconds', seconds)
        setMinutesAmount(minutes)
        setSecondsAmount(seconds)

        const diff = now - new Date(countdownOn.startDate).getTime()

        if (diff >= countdownOn.totalSeconds * 1000) {
          clearInterval(interval)
          setMinutesAmount(0)
          setSecondsAmount(0)

          finishCountdown()
        }
      }, 1000)
    }
  }, [minutesAmount, secondsAmount, hasActiveCountdown, countdown, finishCountdown])

  return (
    <div ref={countdownDivRef} className="w-80 lg:w-fit p-4 lg:p-8 rounded-2xl">
      <div className="flex flex-col items-center justify-center">
        <p className="text-7xl lg:text-9xl lg:h-36 flex items-center justify-center">
          {/* className="text-5xl  bg-transparent size-16 lg:size-24 text-center countdown-timers-input" */}
          {minutesAmount.toString().padStart(2, '0')}:{secondsAmount.toString().padStart(2, '0')}
        </p>

        <button className="mt-4 p-2 lg:p-3 rounded-full border-[1px] border-[#F7CE78] hover:border-[#DEA632] dark:border-[#F7CE78]/[0.5] bg-[#FFE3A9]/[0.15] dark:bg-[#FFE3A9]/[0.25] transition-colors duration-300">
          <Pause className="fill-[#DEA632] dark:fill-[#F7CE78] lg:size-10" />
        </button>
      </div>
    </div>
  )
}
