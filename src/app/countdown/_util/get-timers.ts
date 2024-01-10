import { differenceInSeconds } from '@/util/date'
import { CountdownData } from './validate-countdown-data'

export function getTimers(countdown: CountdownData) {
  const now = Date.now()
  const startDateTime = countdown.startDate.getTime()

  const distanceInSeconds =
    countdown.status === 'running'
      ? differenceInSeconds(startDateTime + countdown.totalSeconds * 1000, now)
      : countdown.remainingSeconds

  const minutesAmount = Math.floor(distanceInSeconds / 60)
  const secondsAmount = Math.floor(distanceInSeconds % 60)

  return { minutesAmount, secondsAmount }
}
