import React, { useState, useEffect } from 'react'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token')
      const user = localStorage.getItem('user')
      
      if (!token || !user) {
        setIsAuthenticated(false)
        setIsLoading(false)
        return
      }
      
      try {
        // Validate token with backend
        const response = await fetch('https://job-application-tracker-1-ywr7.onrender.com/api/auth/profile', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        })
        
        if (response.ok) {
          setIsAuthenticated(true)
        } else {
          // Token is invalid, clear storage
          localStorage.removeItem('token')
          localStorage.removeItem('user')
          setIsAuthenticated(false)
        }
      } catch (error) {
        console.error('Auth check failed:', error)
        // If network error, still allow access if token exists (offline mode)
        setIsAuthenticated(!!token)
      }
      
      setIsLoading(false)
    }
    
    checkAuth()
  }, [])
  
  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-rose-900 to-stone-900 flex items-center justify-center">
        <div className="text-white text-xl">Verifying authentication...</div>
      </div>
    )
  }
  
  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }
  
  // If authenticated, render the protected component
  return children
}

export default ProtectedRoute
