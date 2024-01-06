'use client'

import clsx from 'clsx'
import { useContext, useEffect, useRef } from 'react'

import { Countdown } from './_components/countdown'
import { CountdownForm } from './_components/form'
import { CountdownContext } from './_context/countdown'
import { novaMono } from '../fonts'

export default function CountdownPage() {
  const { countdown } = useContext(CountdownContext)

  const hasCountdown = countdown !== null
  const hasActiveCountdown = hasCountdown && countdown.hasActiveCountdown

  const countdownFormRef = useRef<HTMLDivElement>(null)
  const countdownDivRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (hasActiveCountdown === true) {
      countdownFormRef.current?.classList.remove('countdown-open-form-animation')
      // countdownFormRef.current?.classList.add('countdown-close-form-animation')
      countdownFormRef.current?.classList.add('hidden')

      countdownDivRef.current?.classList.add('countdown-open-form-animation')
    }

    if (hasCountdown === true && hasActiveCountdown === false) {
      // countdownFormRef.current?.classList.remove('countdown-close-form-animation')
      countdownFormRef.current?.classList.remove('hidden')
      countdownFormRef.current?.classList.add('countdown-open-form-animation')
    }
  }, [hasActiveCountdown])

  return (
    <main className={clsx(novaMono.className, 'flex flex-1 flex-col items-center justify-center p-24')}>
      {/* {!hasActiveCountdown && <CountdownForm />}

      {hasActiveCountdown && <Countdown />} */}

      <CountdownForm countdownFormRef={countdownFormRef} />
      {hasActiveCountdown && <Countdown countdownDivRef={countdownDivRef} />}
    </main>
  )
}
