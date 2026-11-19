import { useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext.jsx'
import Loader from '../components/Loader.jsx'

export default function Login() {
  const { user, login, toast } = useApp()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from || '/dashboard'
  const [form, setForm] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})
  const [show, setShow] = useState(false)
  const [loading, setLoading] = useState(false)

  if (user) return <Navigate to="/dashboard" replace />

  const validate = () => {
    const e = {}
    if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = 'Enter a valid email like name@example.com.'
    if (form.password.length < 6) e.password = 'Password must be at least 6 characters.'
    return e
  }

  const submit = (ev) => {
    ev.preventDefault()
    const e = validate()
    setErrors(e)
    if (Object.keys(e).length) return
    setLoading(true)
    setTimeout(() => {
      const raw = form.email.split('@')[0].replace(/[._-]+/g, ' ')
      const name = raw.replace(/\b\w/g, (c) => c.toUpperCase())
      login({ name, email: form.email })
      toast(`Welcome back, ${name.split(' ')[0]}!`)
      navigate(from, { replace: true })
    }, 800)
  }

  return (
    <div className="container section auth">
      <div className="card auth-card">
        <h1>Log in</h1>
        <p className="muted">Use any valid email and a password of 6 or more characters. This is a demo, so nothing is sent to a server.</p>

        {location.state?.denied && (
          <div className="notice">Please log in to open the dashboard.</div>
        )}

        <form className="form" onSubmit={submit} noValidate>
          <label>Email
            <input className={`input ${errors.email ? 'bad' : ''}`} type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@example.com" autoComplete="email" />
            {errors.email && <small className="error">{errors.email}</small>}
          </label>
          <label>Password
            <div className="pw">
              <input className={`input ${errors.password ? 'bad' : ''}`} type={show ? 'text' : 'password'} value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} placeholder="At least 6 characters" autoComplete="current-password" />
              <button type="button" className="pw-toggle" onClick={() => setShow((s) => !s)}>{show ? 'Hide' : 'Show'}</button>
            </div>
            {errors.password && <small className="error">{errors.password}</small>}
          </label>
          <button className="btn btn-primary btn-block btn-lg" disabled={loading}>
            {loading ? <><Loader small /> Logging in…</> : 'Log in'}
          </button>
        </form>
      </div>
    </div>
  )
}
