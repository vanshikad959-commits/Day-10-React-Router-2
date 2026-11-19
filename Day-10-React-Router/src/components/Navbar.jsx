import { useEffect, useRef, useState } from 'react'
import { NavLink, Link, useLocation, useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext.jsx'

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services' },
  { to: '/courses', label: 'Courses' },
  { to: '/contact', label: 'Contact' }
]

export function Logo() {
  return (
    <Link to="/" className="logo" aria-label="LearnLark home">
      <svg width="34" height="34" viewBox="0 0 64 64" aria-hidden="true">
        <rect width="64" height="64" rx="16" fill="#5B3DF5" />
        <path d="M16 40c8 0 10-14 22-14 6 0 10 4 10 4s-4 2-6 6c-3 6-9 10-16 10-6 0-10-3-10-6z" fill="#FFC83D" />
        <circle cx="40" cy="28" r="2.5" fill="#14173A" />
      </svg>
      <span>LearnLark</span>
    </Link>
  )
}

export default function Navbar() {
  const { user, logout, theme, toggleTheme, toast } = useApp()
  const [open, setOpen] = useState(false)
  const [menu, setMenu] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const ref = useRef(null)

  useEffect(() => {
    setOpen(false)
    setMenu(false)
  }, [location.pathname])

  useEffect(() => {
    const close = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setMenu(false)
    }
    document.addEventListener('mousedown', close)
    return () => document.removeEventListener('mousedown', close)
  }, [])

  const handleLogout = () => {
    logout()
    toast('You have been logged out.')
    navigate('/')
  }

  const initial = user ? user.name.charAt(0).toUpperCase() : ''

  return (
    <header className="nav">
      <div className="container nav-inner">
        <Logo />

        <nav className={`nav-links ${open ? 'open' : ''}`} aria-label="Main">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.to === '/'} className={({ isActive }) => (isActive ? 'active' : '')}>
              {l.label}
            </NavLink>
          ))}
          <div className="nav-auth-mobile">
            {user ? (
              <>
                <NavLink to="/dashboard">Dashboard</NavLink>
                <button className="btn btn-ghost" onClick={handleLogout}>Logout</button>
              </>
            ) : (
              <Link to="/login" className="btn btn-primary">Login</Link>
            )}
          </div>
        </nav>

        <div className="nav-actions">
          <button className="icon-btn" onClick={toggleTheme} aria-label="Toggle dark mode" title="Toggle theme">
            {theme === 'light' ? '🌙' : '☀️'}
          </button>

          {user ? (
            <div className="profile" ref={ref}>
              <button className="avatar" onClick={() => setMenu((m) => !m)} aria-haspopup="menu" aria-expanded={menu}>
                {initial}
              </button>
              {menu && (
                <div className="dropdown" role="menu">
                  <div className="dropdown-head">
                    <b>{user.name}</b>
                    <small>{user.email}</small>
                  </div>
                  <Link to="/dashboard" role="menuitem">Dashboard</Link>
                  <Link to="/courses" role="menuitem">Browse courses</Link>
                  <button onClick={handleLogout} role="menuitem">Logout</button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="btn btn-primary nav-login">Login</Link>
          )}

          <button className="icon-btn burger" onClick={() => setOpen((o) => !o)} aria-label="Toggle menu" aria-expanded={open}>
            {open ? '✕' : '☰'}
          </button>
        </div>
      </div>
    </header>
  )
}
