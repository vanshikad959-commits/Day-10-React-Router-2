import { Link, useNavigate } from 'react-router-dom'

export default function NotFound() {
  const navigate = useNavigate()
  return (
    <div className="container section notfound">
      <div className="big404">404</div>
      <h1>This page took a wrong turn.</h1>
      <p className="lead">The address you opened does not exist. Check the link or head back to a page that does.</p>
      <div className="hero-cta center-row">
        <Link to="/" className="btn btn-primary btn-lg">Go to home</Link>
        <button className="btn btn-ghost btn-lg" onClick={() => navigate(-1)}>Go back</button>
      </div>
    </div>
  )
}
