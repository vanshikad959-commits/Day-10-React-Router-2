import { Link } from 'react-router-dom'

const services = [
  { icon: '🎓', t: 'Self-paced courses', d: 'Learn at your own speed with lessons, notes and a project at the end.' },
  { icon: '👩‍🏫', t: 'Mentor sessions', d: 'Book a 30 minute call to get unstuck on code, careers or projects.' },
  { icon: '🏆', t: 'Hackathon prep', d: 'Team-building, pitch practice and a stack checklist before the big day.' },
  { icon: '📄', t: 'Resume reviews', d: 'Get specific feedback on your projects, wording and GitHub profile.' },
  { icon: '💼', t: 'Interview practice', d: 'Mock DSA and project interviews with feedback you can act on.' },
  { icon: '📜', t: 'Certificates', d: 'Finish a course and download a certificate for your portfolio.' }
]

export default function Services() {
  return (
    <div className="container section">
      <div className="page-head">
        <h1>Everything you need beyond the videos.</h1>
        <p className="lead">Courses are the start. These services help you finish projects and get noticed.</p>
      </div>
      <div className="grid grid-3">
        {services.map((s) => (
          <div className="card hoverable" key={s.t}>
            <div className="card-icon">{s.icon}</div>
            <h3>{s.t}</h3>
            <p className="muted">{s.d}</p>
          </div>
        ))}
      </div>
      <div className="center"><Link to="/contact" className="btn btn-primary btn-lg">Ask about a service</Link></div>
    </div>
  )
}
