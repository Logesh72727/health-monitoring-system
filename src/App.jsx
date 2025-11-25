import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { WebSocketProvider } from './contexts/WebSocketContext'
import { NotificationProvider } from './contexts/NotificationContext'
import ProtectedRoute from './components/common/ProtectedRoute'
import Layout from './components/layout/Layout'

// Pages
import Login from './components/auth/Login'
import Dashboard from './components/dashboard/Dashboard'
import EmergencyAlerts from './components/alerts/EmergencyAlerts'
import HistoricalData from './components/history/HistoricalData'
import DeviceStatus from './components/device/DeviceStatus'
import Profile from './components/profile/Profile'

import './App.css'

function App() {
  return (
    <AuthProvider>
      <WebSocketProvider>
        <NotificationProvider>
          <Router>
            <div className="App">
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/" element={
                  <ProtectedRoute>
                    <Layout>
                      <Dashboard />
                    </Layout>
                  </ProtectedRoute>
                } />
                <Route path="/alerts" element={
                  <ProtectedRoute>
                    <Layout>
                      <EmergencyAlerts />
                    </Layout>
                  </ProtectedRoute>
                } />
                <Route path="/history" element={
                  <ProtectedRoute>
                    <Layout>
                      <HistoricalData />
                    </Layout>
                  </ProtectedRoute>
                } />
                <Route path="/device" element={
                  <ProtectedRoute>
                    <Layout>
                      <DeviceStatus />
                    </Layout>
                  </ProtectedRoute>
                } />
                <Route path="/profile" element={
                  <ProtectedRoute>
                    <Layout>
                      <Profile />
                    </Layout>
                  </ProtectedRoute>
                } />
              </Routes>
            </div>
          </Router>
        </NotificationProvider>
      </WebSocketProvider>
    </AuthProvider>
  )
}

export default App