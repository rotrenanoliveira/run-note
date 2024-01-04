import type { Metadata } from 'next'
import { inter } from './fonts'

import './globals.css'

export const metadata: Metadata = {
  title: 'runnote',
  description: 'Side project to keep track of your daily runs',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
