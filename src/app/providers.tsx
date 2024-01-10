'use client'

import { ThemeProvider } from '@/context/theme'

export default function Providers({ children }: { children: React.ReactNode }) {
  return <ThemeProvider>{children}</ThemeProvider>
}
