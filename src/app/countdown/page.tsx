'use client'

import clsx from 'clsx'
import { useContext } from 'react'
import { CountdownForm } from './_components/form'
import { Countdown } from './_components/countdown'
import { CountdownContext } from './_context/countdown'
import { novaMono } from '../fonts'

export default function CountdownPage() {
  const {
    countdown: { hasActiveCountdown },
  } = useContext(CountdownContext)

  return (
    <main className={clsx(novaMono.className, 'flex flex-1 flex-col items-center justify-center p-24')}>
      {!hasActiveCountdown && <CountdownForm />}

      {hasActiveCountdown && <Countdown />}
    </main>
  )
}
