'use client'

import { useContext, useEffect, useState } from 'react'
import { CountdownContext } from '../_context/countdown'
import { Pause, Play, ResetTimer, Stop } from '@/components/ui/icons'
import { getTimers } from '../_util/get-timers'
import { useNotification } from '@/context/notification'
import { differenceInSeconds } from '@/util/date'

interface CountdownProps {
  countdownDivRef: React.RefObject<HTMLDivElement>
}

export function Countdown({ countdownDivRef }: CountdownProps) {
  const { sendNotification } = useNotification()
  const { countdown, finishCountdown, pauseCountdown, resumeCountdown, resetCountdown } = useContext(CountdownContext)

  const hasCountdown = countdown !== null

  const [remainingTime, setRemainingTime] = useState({ minutesAmount: 0, secondsAmount: 0 })

  function handleResetCountdown() {
    resetCountdown()
  }

  function handlePauseCountdown() {
    pauseCountdown()
  }

  function handleResumeCountdown() {
    resumeCountdown()
  }

  function handleStopCountdown() {
    finishCountdown()
  }

  useEffect(() => {
    if (!hasCountdown) return

    let interval: NodeJS.Timeout

    if (countdown.status === 'paused') {
      setRemainingTime(getTimers(countdown))
      return () => clearInterval(interval)
    }

    if (countdown.status === 'running') {
      interval = setInterval(() => {
        setRemainingTime(getTimers(countdown))

        const diffInSeconds = differenceInSeconds(Date.now(), countdown.startDate.getTime())

        if (diffInSeconds > countdown.totalSeconds) {
          clearInterval(interval)
          setRemainingTime({ minutesAmount: 0, secondsAmount: 0 })

          finishCountdown()
          sendNotification('Countdown finished!')
        }
      }, 1000)
    }

    return () => clearInterval(interval)
  }, [hasCountdown, countdown, finishCountdown])

  if (!hasCountdown) return null

  return (
    <div ref={countdownDivRef} className="w-80 lg:w-fit p-4 lg:p-8 rounded-2xl">
      <div className="flex flex-col items-center justify-center">
        <p className="text-7xl lg:text-9xl lg:h-36 flex items-center justify-center">
          {/* className="text-5xl  bg-transparent size-16 lg:size-24 text-center countdown-timers-input" */}
          {remainingTime.minutesAmount.toString().padStart(2, '0')}:
          {remainingTime.secondsAmount.toString().padStart(2, '0')}
        </p>

        <div className="flex items-center justify-center gap-4">
          <button
            onClick={handleResetCountdown}
            className="mt-4 p-2 rounded-full border-[1px] border-[#F7CE78] hover:border-[#DEA632] dark:border-[#F7CE78]/[0.5] bg-[#FFE3A9]/[0.15] dark:bg-[#FFE3A9]/[0.25] transition-colors duration-300"
          >
            <ResetTimer className="fill-[#DEA632] dark:fill-[#F7CE78]" />
          </button>

          {countdown.status === 'running' ? (
            <button
              onClick={handlePauseCountdown}
              className="mt-4 p-2 lg:p-3 rounded-full border-[1px] border-[#F7CE78] hover:border-[#DEA632] dark:border-[#F7CE78]/[0.5] bg-[#FFE3A9]/[0.15] dark:bg-[#FFE3A9]/[0.25] transition-colors duration-300"
            >
              <Pause className="fill-[#DEA632] dark:fill-[#F7CE78] lg:size-10" />
            </button>
          ) : (
            <button
              onClick={handleResumeCountdown}
              className="mt-4 p-2 lg:p-3 rounded-full border-[1px] border-runnote-green-50 hover:border-runnote-green-300 dark:border-[#256F4C] bg-runnote-green-50/20 dark:bg-[#133929] transition-colors duration-300"
            >
              <Play className="fill-runnote-green-300 dark:fill-runnote-green-300 lg:size-10" />
            </button>
          )}

          <button
            onClick={handleStopCountdown}
            className="mt-4 p-2 rounded-full border-[1px] border-runnote-red/50 hover:border-runnote-red dark:border-runnote-red/50 bg-runnote-red/20 dark:bg-runnote-red/30 transition-colors duration-300"
          >
            <Stop className="fill-runnote-red/50 dark:fill-runnote-red" />
          </button>
        </div>
      </div>
    </div>
  )
}
