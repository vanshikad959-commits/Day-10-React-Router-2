import { useState } from 'react'
import { useApp } from '../context/AppContext.jsx'
import Loader from '../components/Loader.jsx'

const empty = { name: '', email: '', message: '' }

export default function Contact() {
  const { toast } = useApp()
  const [form, setForm] = useState(empty)
  const [errors, setErrors] = useState({})
  const [sending, setSending] = useState(false)

  const validate = () => {
    const e = {}
    if (form.name.trim().length < 2) e.name = 'Enter your name (at least 2 characters).'
    if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = 'Enter a valid email like name@example.com.'
    if (form.message.trim().length < 10) e.message = 'Write at least 10 characters so we can help.'
    return e
  }

  const submit = (ev) => {
    ev.preventDefault()
    const e = validate()
    setErrors(e)
    if (Object.keys(e).length) return
    setSending(true)
    setTimeout(() => {
      setSending(false)
      setForm(empty)
      toast('Message sent. We will reply within two days.')
    }, 900)
  }

  const set = (k) => (ev) => setForm({ ...form, [k]: ev.target.value })

  return (
    <div className="container section">
      <div className="page-head">
        <h1>Talk to us</h1>
        <p className="lead">Questions about a course, a service or your account? Send a message.</p>
      </div>
      <div className="contact-grid">
        <form className="card form" onSubmit={submit} noValidate>
          <label>Name
            <input className={`input ${errors.name ? 'bad' : ''}`} value={form.name} onChange={set('name')} placeholder="Your name" />
            {errors.name && <small className="error">{errors.name}</small>}
          </label>
          <label>Email
            <input className={`input ${errors.email ? 'bad' : ''}`} type="email" value={form.email} onChange={set('email')} placeholder="you@example.com" />
            {errors.email && <small className="error">{errors.email}</small>}
          </label>
          <label>Message
            <textarea className={`input ${errors.message ? 'bad' : ''}`} rows="5" value={form.message} onChange={set('message')} placeholder="How can we help?" />
            {errors.message && <small className="error">{errors.message}</small>}
          </label>
          <button className="btn btn-primary btn-block" disabled={sending}>
            {sending ? <><Loader small /> Sending…</> : 'Send message'}
          </button>
        </form>

        <aside className="card info">
          <h3>Other ways to reach us</h3>
          <p>📧 hello@learnlark.example</p>
          <p>📍 Meerut, Uttar Pradesh</p>
          <p>🕘 Mon to Sat, 10 AM to 6 PM IST</p>
        </aside>
      </div>
    </div>
  )
}
