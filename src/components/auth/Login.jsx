import React, { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { useNotification } from '../../contexts/NotificationContext'
import LoadingSpinner from '../common/LoadingSpinner'
import './Login.css'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [userType, setUserType] = useState('caregiver')
  const [isLoading, setIsLoading] = useState(false)

  const { login, currentUser } = useAuth()
  const { addNotification } = useNotification()

  if (currentUser) {
    return <Navigate to="/" replace />
  }

  // ===== CURSOR-BASED TILT =====
  const handleMouseMove = (e) => {
    const card = document.querySelector(".login-card")
    const x = (window.innerWidth / 2 - e.clientX) / 25
    const y = (window.innerHeight / 2 - e.clientY) / 25

    card.style.transform = `rotateY(${ -x }deg) rotateX(${ y }deg)`
  }

  const handleMouseLeave = () => {
    const card = document.querySelector(".login-card")
    card.style.transform = "rotateY(0deg) rotateX(0deg)"
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const result = await login(email, password, userType)
      if (result.success) {
        addNotification(`Welcome back, ${result.user.name}!`, 'success')
      } else {
        addNotification('Login failed. Please check your credentials.', 'error')
      }
    } catch (error) {
      addNotification('An error occurred during login.', 'error')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="hud-page" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>

      {/* HUD BACKGROUND GRID */}
      <div className="hud-grid"></div>

      {/* SCANNING LIGHT */}
      <div className="scan-line"></div>

      {/* ECG ANIMATION */}


      <div className="login-container">
        <div className="login-card">

          <div className="holo-border-glow"></div>

          <div className="login-header">
            <h1>Health Monitoring System</h1>
            <p>Secure Access Dashboard</p>
          </div>

          <form onSubmit={handleSubmit} className="login-form">

            <div className="form-group">
              <label>User Type</label>
              <select value={userType} onChange={(e) => setUserType(e.target.value)} className="form-select">
                <option value="caregiver">Caregiver/Family</option>
                <option value="admin">Administrator</option>
              </select>
            </div>

            <div className="form-group">
              <label>Email Address</label>
              <input 
                type="email" 
                className="form-input" 
                required 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input 
                type="password" 
                className="form-input" 
                required 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
              />
            </div>

            <button type="submit" className="login-button" disabled={isLoading}>
              {isLoading ? <LoadingSpinner size="small" /> : "Sign In"}
            </button>

          </form>

        </div>
      </div>
    </div>
  )
}

export default Login
