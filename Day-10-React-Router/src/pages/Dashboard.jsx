import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useApp } from '../context/AppContext.jsx'
import { courses } from '../data/courses.js'

const enrolled = [
  { ...courses[0], progress: 72 },
  { ...courses[1], progress: 41 },
  { ...courses[4], progress: 15 }
]

const activitiesSeed = [
  { id: 1, icon: '✅', text: 'Completed "Protected routes" in React from Zero to Router', time: '2 hours ago' },
  { id: 2, icon: '🧩', text: 'Solved 3 array problems in Java DSA', time: 'Yesterday' },
  { id: 3, icon: '🏅', text: 'Passed the CSS layout quiz with 92%', time: '2 days ago' },
  { id: 4, icon: '📘', text: 'Enrolled in UI Design for Developers', time: '4 days ago' }
]

export default function Dashboard() {
  const { user, toast } = useApp()
  const [side, setSide] = useState(false)
  const [tab, setTab] = useState('overview')
  const [activities, setActivities] = useState(activitiesSeed)
  const first = user.name.split(' ')[0]

  const stats = [
    { label: 'Courses enrolled', value: enrolled.length, icon: '📚' },
    { label: 'Hours learned', value: 38, icon: '⏱️' },
    { label: 'Day streak', value: 6, icon: '🔥' },
    { label: 'Certificates', value: 1, icon: '📜' }
  ]

  const actions = [
    { icon: '▶️', t: 'Resume lesson', d: 'Pick up React from Zero to Router.', onClick: () => toast('Opening your last lesson…') },
    { icon: '📝', t: 'Take a quiz', d: 'Test what you learned this week.', onClick: () => toast('Quiz starts soon.') },
    { icon: '🔎', t: 'Find a course', d: 'Browse all eight courses.', to: '/courses' },
    { icon: '💬', t: 'Ask a mentor', d: 'Send us a question.', to: '/contact' }
  ]

  const Nav = ({ id, icon, label }) => (
    <button className={tab === id ? 'on' : ''} onClick={() => { setTab(id); setSide(false) }}>
      <span>{icon}</span> {label}
    </button>
  )

  return (
    <div className="dash container section">
      <button className="btn btn-ghost side-toggle" onClick={() => setSide((s) => !s)}>☰ Menu</button>

      <aside className={`side ${side ? 'open' : ''}`}>
        <Nav id="overview" icon="🏠" label="Overview" />
        <Nav id="courses" icon="📚" label="My courses" />
        <Nav id="activity" icon="🕑" label="Activity" />
      </aside>

      <div className="dash-main">
        <div className="welcome">
          <div>
            <h1>Welcome back, {first}!</h1>
            <p className="lead">You are 28% away from finishing your React course. Keep the streak going.</p>
          </div>
        </div>

        {tab === 'overview' && (
          <>
            <div className="dash-top">
              <div className="card profile-card">
                <div className="avatar avatar-lg">{user.name.charAt(0).toUpperCase()}</div>
                <h3>{user.name}</h3>
                <p className="muted">{user.email}</p>
                <span className="chip">Student</span>
              </div>
              <div className="grid grid-2 stats">
                {stats.map((s) => (
                  <div className="card stat" key={s.label}>
                    <span className="stat-icon">{s.icon}</span>
                    <b>{s.value}</b>
                    <small>{s.label}</small>
                  </div>
                ))}
              </div>
            </div>

            <h2 className="sub">Quick actions</h2>
            <div className="grid grid-4">
              {actions.map((a) =>
                a.to ? (
                  <Link key={a.t} to={a.to} className="card hoverable action"><div className="card-icon">{a.icon}</div><h3>{a.t}</h3><p className="muted">{a.d}</p></Link>
                ) : (
                  <button key={a.t} onClick={a.onClick} className="card hoverable action"><div className="card-icon">{a.icon}</div><h3>{a.t}</h3><p className="muted">{a.d}</p></button>
                )
              )}
            </div>
          </>
        )}

        {(tab === 'overview' || tab === 'courses') && (
          <>
            <h2 className="sub">Your courses</h2>
            <div className="grid grid-3">
              {enrolled.map((c) => (
                <div className="card" key={c.id}>
                  <div className="row"><span className="card-icon">{c.icon}</span><h3>{c.title}</h3></div>
                  <div className="bar" role="progressbar" aria-valuenow={c.progress} aria-valuemin="0" aria-valuemax="100"><i style={{ width: `${c.progress}%` }} /></div>
                  <small className="muted">{c.progress}% complete</small>
                </div>
              ))}
            </div>
          </>
        )}

        {(tab === 'overview' || tab === 'activity') && (
          <>
            <div className="section-head">
              <h2 className="sub">Recent activity</h2>
              {activities.length > 0 && <button className="link" onClick={() => setActivities([])}>Clear all</button>}
            </div>
            {activities.length === 0 ? (
              <div className="empty">
                <div>🌤️</div>
                <h3>No recent activity</h3>
                <p className="muted">Finish a lesson and it will show up here.</p>
                <button className="btn btn-primary" onClick={() => setActivities(activitiesSeed)}>Restore sample activity</button>
              </div>
            ) : (
              <ul className="feed">
                {activities.map((a) => (
                  <li key={a.id}><span className="feed-icon">{a.icon}</span><div><p>{a.text}</p><small className="muted">{a.time}</small></div></li>
                ))}
              </ul>
            )}
          </>
        )}
      </div>
    </div>
  )
}
