'use client'

import { differenceInSeconds } from '@/util/date'
import React, { useCallback, useEffect } from 'react'

type Countdown =
  | {
      hasActiveCountdown: true
      countdown: {
        startDate: Date
        totalSeconds: number
      }
    }
  | {
      hasActiveCountdown: false
      countdown: null
    }

interface CountdownContextType {
  countdown: Countdown
  startCountdown: (totalSeconds: number) => void
  removeCountdown: () => void
}

export const CountdownContext = React.createContext<CountdownContextType>({} as CountdownContextType)

interface CountdownProviderProps {
  children: React.ReactNode
}

export function CountdownProvider({ children }: CountdownProviderProps) {
  const [countdown, setCountdown] = React.useState<Countdown>({
    hasActiveCountdown: false,
    countdown: null,
  })

  const startCountdown = useCallback((totalSeconds: number) => {
    setCountdown({
      hasActiveCountdown: true,
      countdown: { startDate: new Date(), totalSeconds },
    })

    localStorage.setItem('@runnote:countdown', JSON.stringify({ startDate: new Date(), totalSeconds }))
  }, [])

  const removeCountdown = useCallback(() => {
    setCountdown({
      hasActiveCountdown: false,
      countdown: null,
    })

    localStorage.removeItem('@runnote:countdown')
  }, [])

  useEffect(() => {
    const countdownOnLocalStorage = localStorage.getItem('@runnote:countdown')

    if (countdownOnLocalStorage !== null) {
      const { startDate, totalSeconds } = JSON.parse(countdownOnLocalStorage)
      // const diff = differenceInSeconds(new Date(startDate), new Date())

      // if (diff <= 0) {
      //   removeCountdown()
      // }

      setCountdown({
        hasActiveCountdown: true,
        countdown: { startDate: new Date(startDate), totalSeconds: Number(totalSeconds) },
      })
    }
  }, [startCountdown, removeCountdown])

  // TODO: implement
  // function stopCountdown() {}

  return (
    <CountdownContext.Provider value={{ countdown, startCountdown, removeCountdown }}>
      {children}
    </CountdownContext.Provider>
  )
}
