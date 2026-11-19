import { Link } from 'react-router-dom'
import { Logo } from './Navbar.jsx'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <Logo />
          <p className="muted footer-note">Short, practical courses for students who want to build real things.</p>
        </div>
        <div>
          <h4>Explore</h4>
          <Link to="/courses">Courses</Link>
          <Link to="/services">Services</Link>
          <Link to="/about">About</Link>
        </div>
        <div>
          <h4>Account</h4>
          <Link to="/login">Login</Link>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/contact">Contact</Link>
        </div>
      </div>
      <div className="container footer-bar">
        <span>© {new Date().getFullYear()} LearnLark. Built with React Router for the Apex Lark internship.</span>
      </div>
    </footer>
  )
}
