import { useEffect, useState } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Loader from './components/Loader.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import ScrollToTop from './components/ScrollToTop.jsx'
import Breadcrumbs from './components/Breadcrumbs.jsx'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Services from './pages/Services.jsx'
import Courses from './pages/Courses.jsx'
import Contact from './pages/Contact.jsx'
import Login from './pages/Login.jsx'
import Dashboard from './pages/Dashboard.jsx'
import NotFound from './pages/NotFound.jsx'

const titles = {
  '/': 'Home',
  '/about': 'About',
  '/services': 'Services',
  '/courses': 'Courses',
  '/contact': 'Contact',
  '/login': 'Login',
  '/dashboard': 'Dashboard'
}

export default function App() {
  const location = useLocation()
  const [booting, setBooting] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setBooting(false), 700)
    return () => clearTimeout(t)
  }, [])

  // Dynamic page titles
  useEffect(() => {
    const name = titles[location.pathname] || 'Page not found'
    document.title = `${name} | LearnLark`
  }, [location.pathname])

  if (booting) return <Loader fullscreen />

  return (
    <div className="app">
      <ScrollToTop />
      <Navbar />
      <main className="main">
        <Breadcrumbs />
        {/* key restarts the fade-in animation on every route change */}
        <div key={location.pathname} className="page">
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            {/* Invalid route redirects */}
            <Route path="/home" element={<Navigate to="/" replace />} />
            <Route path="/course" element={<Navigate to="/courses" replace />} />
            <Route path="/service" element={<Navigate to="/services" replace />} />
            <Route path="/signin" element={<Navigate to="/login" replace />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </main>
      <Footer />
    </div>
  )
}
