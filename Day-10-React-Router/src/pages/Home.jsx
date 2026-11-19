import { Link } from 'react-router-dom'
import { courses } from '../data/courses.js'
import { useApp } from '../context/AppContext.jsx'

export default function Home() {
  const { user } = useApp()
  const featured = courses.slice(0, 3)

  return (
    <>
      <section className="hero-wrap">
        <div className="hero">
          <div className="hero-copy">
            <span className="hero-badge">✦ LEARN BY BUILDING</span>
            <h1>
              Learn<br />beyond<br /><span className="grad">limits.</span>
            </h1>
            <p className="lead">
              A new way to learn tech skills where practice meets guidance. Pick a course, build the project and track your progress in one place.
            </p>
            <div className="hero-cta">
              <Link to="/courses" className="btn btn-primary btn-lg">Explore courses ↗</Link>
              <Link to={user ? '/dashboard' : '/login'} className="btn btn-ghost btn-lg">
                {user ? 'Open dashboard' : 'Log in'}
              </Link>
            </div>
            <ul className="hero-feats">
              <li>✦ Guided projects</li>
              <li>✦ Progress tracking</li>
              <li>✦ Built for students</li>
            </ul>
          </div>

          <div className="orb-stage" aria-hidden="true">
            <div className="orb" />
            <div className="orb-caption">Learn · Build · Grow</div>
          </div>
        </div>
        <a href="#featured" className="scroll-down" aria-label="Scroll to courses">↓</a>
      </section>

      <section id="featured" className="container section">
        <div className="section-head">
          <h2>Start with a popular course</h2>
          <Link to="/courses" className="link">See all courses</Link>
        </div>
        <div className="grid grid-3">
          {featured.map((c) => (
            <article className="course-card" key={c.id}>
              <div className="cover" style={{ background: `linear-gradient(135deg, ${c.tag})` }}>
                <span>{c.icon}</span>
              </div>
              <div className="course-body">
                <div className="chips"><span className="chip">{c.category}</span><span className="chip chip-soft">{c.level}</span></div>
                <h3>{c.title}</h3>
                <p className="muted">{c.desc}</p>
                <div className="course-meta"><span>⏱ {c.hours}h</span><span>📘 {c.lessons} lessons</span><span>⭐ {c.rating}</span></div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="container section">
        <div className="how">
          <h2>How a week on LearnLark works</h2>
          <ol className="steps">
            <li><b>Pick a course</b><span>Filter by topic and level, then enroll in one tap.</span></li>
            <li><b>Build the project</b><span>Every course ends with something you can push to GitHub.</span></li>
            <li><b>Track your progress</b><span>Your dashboard shows streaks, hours and what to do next.</span></li>
          </ol>
        </div>
      </section>

      <section className="container section">
        <div className="cta-band">
          <div>
            <h2>Ready for your first lesson?</h2>
            <p>Create a free login in under a minute and your dashboard is ready.</p>
          </div>
          <Link to={user ? '/dashboard' : '/login'} className="btn btn-accent btn-lg">{user ? 'Go to dashboard' : 'Log in'}</Link>
        </div>
      </section>
    </>
  )
}
