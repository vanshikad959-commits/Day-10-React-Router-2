const values = [
  { icon: '🛠️', t: 'Build first', d: 'Every lesson ends with something you can run, not a quiz you forget.' },
  { icon: '🌱', t: 'Beginner friendly', d: 'We explain the why behind each line before moving to the next.' },
  { icon: '🤝', t: 'Learn together', d: 'Teams, hackathons and code reviews are part of the plan, not an extra.' }
]
const team = [
  { n: 'Ananya Rao', r: 'Founder & React mentor' },
  { n: 'Rohit Verma', r: 'Backend instructor' },
  { n: 'Meera Joshi', r: 'Design lead' },
  { n: 'Kabir Singh', r: 'Student success' }
]

export default function About() {
  return (
    <div className="container section">
      <div className="page-head">
        <h1>We make learning to code feel doable.</h1>
        <p className="lead">LearnLark started when a group of students realised that long video playlists did not turn into finished projects. So we built short courses that end in something real.</p>
      </div>

      <div className="grid grid-3">
        {values.map((v) => (
          <div className="card" key={v.t}>
            <div className="card-icon">{v.icon}</div>
            <h3>{v.t}</h3>
            <p className="muted">{v.d}</p>
          </div>
        ))}
      </div>

      <h2 className="sub">Meet the team</h2>
      <div className="grid grid-4">
        {team.map((m) => (
          <div className="card team" key={m.n}>
            <div className="avatar avatar-lg">{m.n.charAt(0)}</div>
            <h3>{m.n}</h3>
            <p className="muted">{m.r}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
