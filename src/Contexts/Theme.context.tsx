import { api, urls } from '@src/Services/Api'
import React, {
  useContext, createContext, useState, useEffect,
} from 'react'

export type themes = 'moon' | 'sun'

interface iThemeContext {
  theme: themes
  updateTheme(theme: themes): void
}

export const ThemeContext = createContext({} as iThemeContext)

export const useThemeContext = () => useContext(ThemeContext)

export const ThemeProvider: React.FC<any> = ({ children }) => {
  const [theme, setTheme] = useState<themes>('sun')

  const updateTheme = (newTheme: themes) => {
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
  }

  useEffect(() => {
    const themeSaved = localStorage.getItem('theme') as themes

    if (themeSaved) {
      setTheme(themeSaved)
    }
  })

  return (
    <ThemeContext.Provider value={{
      theme,
      updateTheme,
    }}
    >
      { children }
    </ThemeContext.Provider>
  )
}
