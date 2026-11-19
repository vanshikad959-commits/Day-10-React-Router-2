import { Link, useLocation } from 'react-router-dom'

const names = {
  about: 'About',
  services: 'Services',
  courses: 'Courses',
  contact: 'Contact',
  login: 'Login',
  dashboard: 'Dashboard'
}

export default function Breadcrumbs() {
  const { pathname } = useLocation()
  if (pathname === '/') return null
  const parts = pathname.split('/').filter(Boolean)
  return (
    <nav className="crumbs" aria-label="Breadcrumb">
      <Link to="/">Home</Link>
      {parts.map((p, i) => {
        const to = '/' + parts.slice(0, i + 1).join('/')
        const last = i === parts.length - 1
        return (
          <span key={to}>
            <i>/</i>
            {last ? <b aria-current="page">{names[p] || 'Not found'}</b> : <Link to={to}>{names[p] || p}</Link>}
          </span>
        )
      })}
    </nav>
  )
}
