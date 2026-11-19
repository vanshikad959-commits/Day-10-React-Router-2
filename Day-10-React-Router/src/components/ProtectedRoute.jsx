import { Navigate, useLocation } from 'react-router-dom'
import { useApp } from '../context/AppContext.jsx'

export default function ProtectedRoute({ children }) {
  const { user } = useApp()
  const location = useLocation()
  if (!user) {
    return <Navigate to="/login" replace state={{ from: location.pathname, denied: true }} />
  }
  return children
}
