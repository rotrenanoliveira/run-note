import { rounding } from './rounding-method'
import { toDate } from './to-date'

/**
 * Calculates the difference in seconds between two dates.
 *
 * @param {Date | number} dateLeft - The first date.
 * @param {Date | number} dateRight - The second date.
 * @return {number} The difference in seconds.
 */
export function differenceInSeconds(dateLeft: Date | number, dateRight: Date | number): number {
  const diff = (toDate(dateLeft).getTime() - toDate(dateRight).getTime()) / 1000

  return rounding.trunc(diff)
}
