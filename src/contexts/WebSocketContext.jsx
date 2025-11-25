import React, { createContext, useContext, useEffect, useState } from 'react'

const WebSocketContext = createContext()

export const useWebSocket = () => {
  const context = useContext(WebSocketContext)
  if (!context) {
    throw new Error('useWebSocket must be used within a WebSocketProvider')
  }
  return context
}

export const WebSocketProvider = ({ children }) => {
  const [vitals, setVitals] = useState(null)
  const [alerts, setAlerts] = useState([])
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    // Simulate WebSocket connection with interval
    const interval = setInterval(() => {
      const mockData = generateMockVitals()
      setVitals(mockData)
      setIsConnected(true)

      // Randomly generate alerts
      if (Math.random() < 0.1) {
        const alertTypes = [
          { type: 'fall', message: 'Fall detected!' },
          { type: 'heartRate', message: 'Abnormal heart rate detected' },
          { type: 'spO2', message: 'Low blood oxygen level' },
          { type: 'bloodPressure', message: 'High blood pressure detected' }
        ]
        const alert = alertTypes[Math.floor(Math.random() * alertTypes.length)]
        const newAlert = {
          id: Date.now(),
          ...alert,
          timestamp: new Date().toISOString(),
          vitals: mockData
        }
        setAlerts(prev => [newAlert, ...prev.slice(0, 9)]) // Keep last 10 alerts
      }
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  const generateMockVitals = () => {
    return {
      heartRate: Math.floor(60 + Math.random() * 40),
      spO2: Math.floor(90 + Math.random() * 10),
      bloodPressure: `${Math.floor(110 + Math.random() * 30)}/${Math.floor(70 + Math.random() * 20)}`,
      temperature: (36 + Math.random() * 2).toFixed(1),
      stressLevel: Math.floor(Math.random() * 100),
      airQuality: ['Good', 'Moderate', 'Poor'][Math.floor(Math.random() * 3)],
      fallDetected: Math.random() < 0.02,
      soundAlert: Math.random() < 0.05,
      ecg: Array.from({ length: 100 }, () => Math.random() * 2 - 1),
      location: {
        lat: 40.7128 + (Math.random() - 0.5) * 0.01,
        lng: -74.0060 + (Math.random() - 0.5) * 0.01
      },
      battery: Math.floor(20 + Math.random() * 80),
      timestamp: new Date().toISOString()
    }
  }

  const clearAlert = (alertId) => {
    setAlerts(prev => prev.filter(alert => alert.id !== alertId))
  }

  const value = {
    vitals,
    alerts,
    isConnected,
    clearAlert
  }

  return (
    <WebSocketContext.Provider value={value}>
      {children}
    </WebSocketContext.Provider>
  )
}