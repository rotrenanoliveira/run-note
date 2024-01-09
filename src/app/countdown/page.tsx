'use client'

import clsx from 'clsx'
import { ElementRef, useContext, useEffect, useRef } from 'react'

import { Countdown } from './_components/countdown'
import { CountdownForm } from './_components/form'
import { CountdownContext } from './_context/countdown'
import { novaMono } from '../fonts'

export default function CountdownPage() {
  const { countdown } = useContext(CountdownContext)

  const hasCountdown = countdown !== null

  const countdownFormRef = useRef<ElementRef<'div'>>(null)
  const countdownDivRef = useRef<ElementRef<'div'>>(null)

  useEffect(() => {
    if (hasCountdown) {
      countdownFormRef.current?.classList.remove('countdown-open-form-animation')
      countdownFormRef.current?.classList.add('hidden')

      countdownDivRef.current?.classList.add('countdown-open-form-animation')
    } else {
      countdownFormRef.current?.classList.remove('hidden')
      countdownFormRef.current?.classList.add('countdown-open-form-animation')
    }
  }, [hasCountdown])

  return (
    <main className={clsx(novaMono.className, 'flex flex-1 flex-col items-center justify-center p-24')}>
      <CountdownForm countdownFormRef={countdownFormRef} />
      {hasCountdown && <Countdown countdownDivRef={countdownDivRef} />}
    </main>
  )
}
