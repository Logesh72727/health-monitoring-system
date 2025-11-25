import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { 
  LayoutDashboard, 
  AlertTriangle, 
  History, 
  Smartphone, 
  User,
  Activity
} from 'lucide-react'
import './Sidebar.css'

const Sidebar = () => {
  const location = useLocation()

  const navItems = [
    { path: '/', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/alerts', icon: AlertTriangle, label: 'Emergency Alerts' },
    { path: '/history', icon: History, label: 'Historical Data' },
    { path: '/device', icon: Smartphone, label: 'Device Status' },
    { path: '/profile', icon: User, label: 'Profile' },
  ]

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <Activity size={32} className="sidebar-logo" />
        <span className="sidebar-title">Health Monitor</span>
      </div>
      
      <nav className="sidebar-nav">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = location.pathname === item.path
          
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={`nav-item ${isActive ? 'nav-item-active' : ''}`}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </NavLink>
          )
        })}
      </nav>
    </aside>
  )
}

export default Sidebar