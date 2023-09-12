import { useEffect, useState, ReactNode, createContext } from "react"

export enum Theme {
  dark = 'dark',
  light = 'light',
}

type ThemeContextType = {
  theme: Theme
  toggleTheme(): void
}

export const ThemeContext = createContext<ThemeContextType>({
  theme: Theme.light,
  toggleTheme: () => { }
})

type ThemeProviderType = {
  children: ReactNode
}

export const ThemeProvider = ({ children }: ThemeProviderType) => {
  const [theme, setTheme] = useState<Theme>(Theme.light)
  const storedTheme = localStorage.getItem('theme')

  useEffect(() => {
    if (storedTheme && storedTheme != Theme.light) {
      setTheme(storedTheme as Theme)
    } else {
      setTheme(Theme.light)
    }
  }, [])

  useEffect(() => {
    if (theme === Theme.light) {
      document.documentElement.classList.remove(Theme.dark)
    } else {
      document.documentElement.classList.add(Theme.dark)
    }

    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === Theme.light ? Theme.dark : Theme.light)
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}