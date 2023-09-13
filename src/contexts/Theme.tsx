import { useEffect, useState, ReactNode, createContext } from "react"

export enum Theme {
  dark = 'dark',
  light = 'light',
}

type ThemeContextType = {
  theme: Theme | null
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
  const [theme, setTheme] = useState<Theme | null>(null)
  
  useEffect(() => {
    const storedTheme = localStorage.getItem('theme')
    if (storedTheme) {
      setTheme(storedTheme as Theme)
    } else {
      setTheme(Theme.light)
    }
  }, [])

  useEffect(() => {
    if (theme) {
      localStorage.setItem('theme', theme)
    }

    if (theme === Theme.light) {
      document.body.classList.remove(Theme.dark)
    } else {
      document.body.classList.add(Theme.dark)
    }
  }, [theme])

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === Theme.light ? Theme.dark : Theme.light)
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {theme && children}
    </ThemeContext.Provider>
  )
}