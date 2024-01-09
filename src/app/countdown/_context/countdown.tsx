'use client'

import React, { createContext, useCallback, useEffect, useState } from 'react'
import { differenceInSeconds } from '@/util/date'
import { validateCountdown } from '../_util/validate-countdown-data'

export type Countdown =
  | {
      startDate: Date
      totalSeconds: number
      initialSeconds: number
      status: 'running'
    }
  | {
      startDate: Date
      totalSeconds: number
      initialSeconds: number
      status: 'paused'
      remainingSeconds: number
    }

interface CountdownContextType {
  countdown: Countdown | null
  startCountdown: (totalSeconds: number) => void
  pauseCountdown: () => void
  resumeCountdown: () => void
  resetCountdown: () => void
  finishCountdown: () => void
}

export const CountdownContext = createContext<CountdownContextType>({} as CountdownContextType)

interface CountdownProviderProps {
  children: React.ReactNode
}

export function CountdownProvider({ children }: CountdownProviderProps) {
  const [countdown, setCountdown] = useState<Countdown | null>(null)

  const saveCountdown = useCallback(
    (countdown: Countdown) => localStorage.setItem('@runnote-v1.0.0:countdown', JSON.stringify(countdown)),
    [],
  )

  const startCountdown = useCallback(
    (totalSeconds: number, initialSeconds?: number) => {
      const newCountdown: Countdown = {
        startDate: new Date(),
        status: 'running',
        totalSeconds,
        initialSeconds: initialSeconds ?? totalSeconds,
      }

      setCountdown(newCountdown)
      saveCountdown(newCountdown)
    },
    [saveCountdown],
  )

  const pauseCountdown = useCallback(() => {
    if (countdown === null) return

    const passedSeconds = differenceInSeconds(new Date(), countdown.startDate)
    const remainingSeconds = countdown.totalSeconds - passedSeconds

    const stoppedCountdown: Countdown = {
      ...countdown,
      status: 'paused',
      remainingSeconds,
    }

    setCountdown(stoppedCountdown)
    saveCountdown(stoppedCountdown)
  }, [countdown, saveCountdown])

  const resumeCountdown = useCallback(() => {
    if (countdown === null || countdown.status !== 'paused') return

    startCountdown(countdown.remainingSeconds, countdown.initialSeconds)
  }, [countdown, startCountdown])

  const finishCountdown = useCallback(() => {
    localStorage.removeItem('@runnote-v1.0.0:countdown')
    setCountdown(null)
  }, [])

  const resetCountdown = useCallback(() => {
    if (countdown === null) return

    startCountdown(countdown.initialSeconds)
  }, [countdown, startCountdown])

  useEffect(() => {
    const countdownOnLocalStorage = localStorage.getItem('@runnote-v1.0.0:countdown')
    if (countdownOnLocalStorage === null) return

    try {
      const countdown = validateCountdown(JSON.parse(countdownOnLocalStorage))

      const diff = differenceInSeconds(new Date(), countdown.startDate)
      if (diff <= 0) finishCountdown()

      setCountdown(countdown)
    } catch (error) {
      console.log(error)
    }
  }, [finishCountdown])

  return (
    <CountdownContext.Provider
      value={{ countdown, startCountdown, finishCountdown, pauseCountdown, resumeCountdown, resetCountdown }}
    >
      {children}
    </CountdownContext.Provider>
  )
}
