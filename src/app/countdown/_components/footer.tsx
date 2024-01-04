import { jetBrainsMono, novaMono } from '@/app/fonts'
import clsx from 'clsx'
import Link from 'next/link'

export function CountdownFooter() {
  return (
    <footer className={clsx(novaMono.className, 'relative')}>
      <p className="text-center text-runnote-gray-900 dark:text-runnote-gray-50">
        runnote by{' '}
        <Link
          className={clsx(jetBrainsMono.className, 'underline text-runnote-red', 'hover:no-underline')}
          target={'underline'}
          href={'https://rotrenanoliveira.com'}
        >
          @rot
        </Link>
      </p>

      <div className="countdown-footer-gradient" />
    </footer>
  )
}
