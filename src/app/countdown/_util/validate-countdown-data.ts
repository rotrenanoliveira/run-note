import z from 'zod'

export type CountdownData =
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

const countdownSchema = z.object({
  startDate: z.coerce.date(),
  totalSeconds: z.coerce.number(),
  initialSeconds: z.coerce.number(),
  status: z.enum(['running', 'paused']),
  remainingSeconds: z.coerce.number().optional(),
})

/**
 * Validates a countdown object and returns a Countdown object.
 *
 * @param {unknown} countdown - The countdown object to be validated.
 * @return {Countdown} - The validated Countdown object.
 */
export function validateCountdown(countdown: unknown): CountdownData {
  const data = countdownSchema.parse(countdown)

  const { startDate, totalSeconds, initialSeconds, status } = data

  if (status === 'paused') {
    return {
      startDate,
      totalSeconds,
      initialSeconds,
      status,
      remainingSeconds: data.remainingSeconds ?? 0,
    }
  }

  return {
    startDate,
    totalSeconds,
    initialSeconds,
    status,
  }
}
