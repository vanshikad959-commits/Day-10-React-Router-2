import { useMemo, useState } from 'react'
import { courses, categories } from '../data/courses.js'
import { useApp } from '../context/AppContext.jsx'
import { useNavigate } from 'react-router-dom'

export default function Courses() {
  const [query, setQuery] = useState('')
  const [cat, setCat] = useState('All')
  const { user, toast } = useApp()
  const navigate = useNavigate()

  const list = useMemo(
    () =>
      courses.filter(
        (c) => (cat === 'All' || c.category === cat) && c.title.toLowerCase().includes(query.trim().toLowerCase())
      ),
    [query, cat]
  )

  const enroll = (c) => {
    if (!user) {
      toast('Log in to enroll in a course.', 'error')
      navigate('/login', { state: { from: '/courses' } })
      return
    }
    toast(`Enrolled in "${c.title}".`)
  }

  return (
    <div className="container section">
      <div className="page-head">
        <h1>Find your next course</h1>
        <p className="lead">Search by name or filter by topic.</p>
      </div>

      <div className="toolbar">
        <input
          className="input"
          type="search"
          placeholder="Search courses, e.g. React"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search courses"
        />
        <div className="chips">
          {categories.map((c) => (
            <button key={c} className={`chip chip-btn ${cat === c ? 'on' : ''}`} onClick={() => setCat(c)}>
              {c}
            </button>
          ))}
        </div>
      </div>

      {list.length === 0 ? (
        <div className="empty">
          <div>🔍</div>
          <h3>No courses match your search</h3>
          <p className="muted">Try a different word or reset the filters.</p>
          <button className="btn btn-primary" onClick={() => { setQuery(''); setCat('All') }}>Reset filters</button>
        </div>
      ) : (
        <div className="grid grid-4">
          {list.map((c) => (
            <article className="course-card" key={c.id}>
              <div className="cover" style={{ background: `linear-gradient(135deg, ${c.tag})` }}><span>{c.icon}</span></div>
              <div className="course-body">
                <div className="chips"><span className="chip">{c.category}</span><span className="chip chip-soft">{c.level}</span></div>
                <h3>{c.title}</h3>
                <p className="muted">{c.desc}</p>
                <div className="course-meta"><span>⏱ {c.hours}h</span><span>⭐ {c.rating}</span></div>
                <button className="btn btn-primary btn-block" onClick={() => enroll(c)}>Enroll</button>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  )
}
