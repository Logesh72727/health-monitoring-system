import React from 'react'
import { useWebSocket } from '../../contexts/WebSocketContext'
import VitalCard from './VitalCard'
import ECGChart from './ECGChart'
import RealTimeMap from './RealTimeMap'
import './Dashboard.css'

const Dashboard = () => {
  const { vitals, alerts } = useWebSocket()

  const getStatusColor = (type, value) => {
    if (!value) return 'safe'
    
    switch (type) {
      case 'heartRate':
        return value < 60 || value > 100 ? 'danger' : value < 70 || value > 90 ? 'warning' : 'safe'
      case 'spO2':
        return value < 90 ? 'danger' : value < 95 ? 'warning' : 'safe'
      case 'bloodPressure':
        const [systolic, diastolic] = value.split('/').map(Number)
        return systolic > 140 || diastolic > 90 ? 'danger' : 
               systolic > 130 || diastolic > 85 ? 'warning' : 'safe'
      case 'temperature':
        return value > 38 ? 'danger' : value > 37.5 ? 'warning' : 'safe'
      case 'stressLevel':
        return value > 70 ? 'danger' : value > 50 ? 'warning' : 'safe'
      case 'airQuality':
        return value === 'Poor' ? 'danger' : value === 'Moderate' ? 'warning' : 'safe'
      default:
        return 'safe'
    }
  }

  const hasActiveAlerts = alerts.length > 0
  const hasCriticalAlerts = alerts.some(alert => 
    ['fall', 'heartRate', 'spO2'].includes(alert.type)
  )

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div>
          <h1>Real-Time Health Monitor</h1>
          <p className="dashboard-subtitle">
            Live patient monitoring dashboard
          </p>
        </div>
        
        <div className="alert-indicators">
          {hasActiveAlerts && (
            <div className={`alert-indicator ${hasCriticalAlerts ? 'critical' : 'warning'}`}>
              {hasCriticalAlerts ? '🚨 Critical Alerts' : '⚠️ Active Alerts'}
              <span className="alert-count">{alerts.length}</span>
            </div>
          )}
        </div>
      </div>

      {/* Alert Banners */}
      <div className="alert-banners">
        {vitals?.fallDetected && (
          <div className="emergency-alert fall-alert">
            🚨 FALL DETECTED! Immediate attention required. Patient may need assistance.
          </div>
        )}
        {vitals?.soundAlert && (
          <div className="emergency-alert sound-alert">
            🔊 UNUSUAL SOUND DETECTED. Check on patient.
          </div>
        )}
      </div>

      {/* Vital Cards Grid */}
      <div className="vitals-grid">
        <VitalCard 
          title="Heart Rate" 
          value={vitals?.heartRate} 
          unit="bpm"
          status={getStatusColor('heartRate', vitals?.heartRate)}
          icon="❤️"
          trend={vitals?.heartRate > 80 ? 'up' : vitals?.heartRate < 70 ? 'down' : 'stable'}
        />
        
        <VitalCard 
          title="SpO₂" 
          value={vitals?.spO2} 
          unit="%"
          status={getStatusColor('spO2', vitals?.spO2)}
          icon="🫁"
          trend="stable"
        />
        
        <VitalCard 
          title="Blood Pressure" 
          value={vitals?.bloodPressure} 
          unit="mmHg"
          status={getStatusColor('bloodPressure', vitals?.bloodPressure)}
          icon="🩸"
          trend={vitals?.bloodPressure ? 
            (parseInt(vitals.bloodPressure.split('/')[0]) > 130 ? 'up' : 'stable') : 'stable'
          }
        />
        
        <VitalCard 
          title="Temperature" 
          value={vitals?.temperature} 
          unit="°C"
          status={getStatusColor('temperature', vitals?.temperature)}
          icon="🌡️"
          trend="stable"
        />
        
        <VitalCard 
          title="Stress Level" 
          value={vitals?.stressLevel} 
          unit="GSR"
          status={getStatusColor('stressLevel', vitals?.stressLevel)}
          icon="😰"
          trend={vitals?.stressLevel > 60 ? 'up' : 'stable'}
        />
        
        <VitalCard 
          title="Air Quality" 
          value={vitals?.airQuality} 
          status={getStatusColor('airQuality', vitals?.airQuality)}
          icon="🌫️"
          trend="stable"
        />
      </div>

      {/* Charts Section */}
      <div className="charts-section">
        <div className="chart-container full-width">
          <div className="chart-header">
            <h3>Real-Time ECG Waveform</h3>
            <div className="chart-actions">
              <button className="btn-secondary">Pause</button>
              <button className="btn-secondary">Zoom</button>
            </div>
          </div>
          <ECGChart data={vitals?.ecg || []} />
        </div>
      </div>

      {/* Map Section */}
      <div className="map-section">
        <div className="chart-container">
          <h3>Patient Location</h3>
          <RealTimeMap location={vitals?.location} />
        </div>
        
        <div className="chart-container">
          <h3>Device Status</h3>
          <div className="device-status">
            <div className="status-item">
              <span className="status-label">Battery Level</span>
              <div className="battery-container">
                <div 
                  className={`battery-level ${vitals?.battery < 20 ? 'low' : ''}`}
                  style={{ width: `${vitals?.battery || 0}%` }}
                ></div>
              </div>
              <span className="battery-percent">{vitals?.battery || 0}%</span>
            </div>
            
            <div className="status-item">
              <span className="status-label">Last Update</span>
              <span className="status-value">
                {vitals?.timestamp ? new Date(vitals.timestamp).toLocaleTimeString() : 'N/A'}
              </span>
            </div>
            
            <div className="status-item">
              <span className="status-label">Connection</span>
              <span className="status-value connected">Live</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard