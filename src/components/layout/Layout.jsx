import React from 'react'
import Header from '../common/Header'
import Sidebar from '../common/Sidebar'
import NotificationContainer from '../common/NotificationContainer'
import './Layout.css'

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Sidebar />
      <div className="layout-main">
        <Header />
        <main className="layout-content">
          {children}
        </main>
      </div>
      <NotificationContainer />
    </div>
  )
}

export default Layout