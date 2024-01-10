import React, { useCallback, useContext, useEffect, useMemo } from 'react'

type ThemeContextType = {
  theme: string | undefined
  setTheme: (theme: 'light' | 'dark') => void
}

interface ThemeProviderProps {
  /** Default theme is set to 'system' */
  defaultTheme?: string | undefined

  children: React.ReactNode
}

const ThemeContext = React.createContext<ThemeContextType>({} as ThemeContextType)

export const useTheme = () => useContext(ThemeContext)

export function ThemeProvider(props: ThemeProviderProps) {
  return <Theme {...props} />
}

export const Theme: React.FC<ThemeProviderProps> = ({ children, defaultTheme = 'system' }) => {
  const [currentTheme, setCurrentTheme] = React.useState(() => getTheme(defaultTheme))

  const applyTheme = useCallback((theme: string | undefined) => {
    let resolvedTheme = theme

    if (!resolvedTheme) return

    if (theme === 'system') {
      resolvedTheme = getSystemTheme()
    }

    const htmlElement = document.documentElement

    htmlElement.classList.remove('light', 'dark')

    htmlElement.classList.add(resolvedTheme)
    htmlElement.style.colorScheme = resolvedTheme
    htmlElement.setAttribute('data-theme', resolvedTheme)
  }, [])

  const setTheme = useCallback((theme: 'dark' | 'light') => {
    setCurrentTheme(theme)

    try {
      localStorage.setItem('@runnote-v1.0.0:theme', theme)
    } catch (e) {
      // Unsupported
    }
  }, [])

  useEffect(() => applyTheme(currentTheme), [currentTheme])

  const theme = useMemo(() => currentTheme, [currentTheme])
  const providerValue = useMemo(() => ({ theme, setTheme }), [theme, setTheme])

  return <ThemeContext.Provider value={providerValue}>{children}</ThemeContext.Provider>
}

/**
 * Get the theme from local storage or fallback to the provided value.
 * @param fallback - The fallback theme value.
 * @returns The theme from local storage or the fallback value.
 */
function getTheme(fallback?: string | undefined) {
  let theme: string | undefined
  try {
    theme = localStorage.getItem('@runnote-v1.0.0:theme') || undefined
  } catch (e) {
    // Unsupported
  }
  return theme || fallback
}

/**
 * Returns the current system theme.
 * @returns {string} The system theme ('dark' or 'light').
 */
function getSystemTheme() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}
