import { CountdownFooter } from './_components/footer'
import { CountdownHeader } from './_components/header'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-[100dvh] lg:max-w-5xl mx-auto flex flex-col justify-between p-6 overflow-hidden">
      <CountdownHeader />

      {children}

      <CountdownFooter />
    </main>
  )
}
