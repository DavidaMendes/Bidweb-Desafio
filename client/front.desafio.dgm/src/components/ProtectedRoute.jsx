"use client"

import { Navigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import "../styles/global.css"

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
      </div>
    )
  }

  return user ? children : <Navigate to="/login" />
}

export default ProtectedRoute
