import { Inter, JetBrains_Mono, Nova_Mono } from 'next/font/google'

export const novaMono = Nova_Mono({
  subsets: ['latin'],
  weight: ['400'],
  display: 'swap',
})

export const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '700'],
})

export const jetBrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
})
