'use client'

import { NotificationProvider } from '@/context/notification'
import { ThemeProvider } from '@/context/theme'

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <NotificationProvider>{children}</NotificationProvider>
    </ThemeProvider>
  )
}
