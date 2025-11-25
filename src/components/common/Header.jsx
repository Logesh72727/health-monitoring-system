import React from 'react'
import { Bell, User, LogOut, Wifi, WifiOff } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
import { useWebSocket } from '../../contexts/WebSocketContext'
import './Header.css'

const Header = () => {
  const { currentUser, logout } = useAuth()
  const { isConnected } = useWebSocket()

  return (
    <header className="header">
      <div className="header-left">
        <h1 className="header-title">Health Monitoring System</h1>
      </div>
      
      <div className="header-right">
        <div className={`connection-status ${isConnected ? 'connected' : 'disconnected'}`}>
          {isConnected ? <Wifi size={16} /> : <WifiOff size={16} />}
          <span>{isConnected ? 'Connected' : 'Disconnected'}</span>
        </div>
        
        <button className="icon-button">
          <Bell size={20} />
          <span className="notification-badge">3</span>
        </button>
        
        <div className="user-menu">
          <User size={20} />
          <span className="user-name">{currentUser?.name}</span>
        </div>
        
        <button onClick={logout} className="logout-button" title="Logout">
          <LogOut size={20} />
        </button>
      </div>
    </header>
  )
}

export default Header