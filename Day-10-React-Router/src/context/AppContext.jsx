import { createContext, useContext, useState, useEffect, useCallback } from 'react'

const AppContext = createContext(null)
export const useApp = () => useContext(AppContext)

const read = (key, fallback) => {
  try {
    const v = localStorage.getItem(key)
    return v ? JSON.parse(v) : fallback
  } catch {
    return fallback
  }
}

export function AppProvider({ children }) {
  const [user, setUser] = useState(() => read('ll_user', null))
  const [theme, setTheme] = useState(() => read('ll_theme', 'dark'))
  const [toasts, setToasts] = useState([])

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem('ll_theme', JSON.stringify(theme))
  }, [theme])

  const toast = useCallback((message, type = 'success') => {
    const id = Date.now() + Math.random()
    setToasts((t) => [...t, { id, message, type }])
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3500)
  }, [])

  const login = (u) => {
    localStorage.setItem('ll_user', JSON.stringify(u))
    setUser(u)
  }
  const logout = () => {
    localStorage.removeItem('ll_user')
    setUser(null)
  }
  const toggleTheme = () => setTheme((t) => (t === 'light' ? 'dark' : 'light'))

  return (
    <AppContext.Provider value={{ user, login, logout, theme, toggleTheme, toast }}>
      {children}
      <div className="toasts" aria-live="polite">
        {toasts.map((t) => (
          <div key={t.id} className={`toast toast-${t.type}`}>
            <span>{t.type === 'error' ? '⚠️' : '✅'}</span> {t.message}
          </div>
        ))}
      </div>
    </AppContext.Provider>
  )
}
