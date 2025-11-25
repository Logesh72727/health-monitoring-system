import React from 'react'
import { useWebSocket } from '../../contexts/WebSocketContext'
import { 
  Wifi, 
  Battery, 
  Signal, 
  Cpu, 
  CheckCircle, 
  XCircle, 
  AlertTriangle,
  RefreshCw
} from 'lucide-react'
import './DeviceStatus.css'

const DeviceStatus = () => {
  const { vitals, isConnected } = useWebSocket()

  const deviceSensors = [
    {
      id: 'heart-rate',
      name: 'Heart Rate Sensor',
      status: 'online',
      lastReading: vitals?.heartRate ? `${vitals.heartRate} bpm` : '--',
      icon: '❤️'
    },
    {
      id: 'spO2',
      name: 'Blood Oxygen Sensor',
      status: 'online',
      lastReading: vitals?.spO2 ? `${vitals.spO2}%` : '--',
      icon: '🫁'
    },
    {
      id: 'blood-pressure',
      name: 'Blood Pressure Monitor',
      status: 'online',
      lastReading: vitals?.bloodPressure || '--',
      icon: '🩸'
    },
    {
      id: 'ecg',
      name: 'ECG Sensor',
      status: 'online',
      lastReading: 'Live waveform',
      icon: '📈'
    },
    {
      id: 'temperature',
      name: 'Temperature Sensor',
      status: 'online',
      lastReading: vitals?.temperature ? `${vitals.temperature}°C` : '--',
      icon: '🌡️'
    },
    {
      id: 'fall-detection',
      name: 'Fall Detection',
      status: vitals?.fallDetected ? 'alert' : 'online',
      lastReading: vitals?.fallDetected ? 'Fall detected' : 'Normal',
      icon: '🚨'
    },
    {
      id: 'sound-sensor',
      name: 'Sound Detection',
      status: vitals?.soundAlert ? 'alert' : 'online',
      lastReading: vitals?.soundAlert ? 'Sound alert' : 'Normal',
      icon: '🔊'
    },
    {
      id: 'air-quality',
      name: 'Air Quality Sensor',
      status: 'online',
      lastReading: vitals?.airQuality || '--',
      icon: '🌫️'
    },
    {
      id: 'gps',
      name: 'GPS Location',
      status: 'online',
      lastReading: 'Live tracking',
      icon: '📍'
    },
    {
      id: 'gsr',
      name: 'Stress Level (GSR)',
      status: 'online',
      lastReading: vitals?.stressLevel ? `${vitals.stressLevel} GSR` : '--',
      icon: '😰'
    }
  ]

  const connectionStatus = {
    wifi: { status: 'excellent', strength: 95 },
    cellular: { status: 'good', strength: 85 },
    bluetooth: { status: 'excellent', strength: 90 }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'online':
        return <CheckCircle size={16} className="status-icon online" />
      case 'offline':
        return <XCircle size={16} className="status-icon offline" />
      case 'alert':
        return <AlertTriangle size={16} className="status-icon alert" />
      default:
        return <CheckCircle size={16} className="status-icon online" />
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'online':
        return 'online'
      case 'offline':
        return 'offline'
      case 'alert':
        return 'alert'
      default:
        return 'online'
    }
  }

  const getSignalStrength = (strength) => {
    if (strength >= 80) return 'excellent'
    if (strength >= 60) return 'good'
    if (strength >= 40) return 'fair'
    return 'poor'
  }

  const handleRefresh = () => {
    window.location.reload()
  }

  const handleRestartDevice = () => {
    if (confirm('Are you sure you want to restart the device? This will temporarily interrupt monitoring.')) {
      alert('Device restart command sent. Please wait for reconnection.')
    }
  }

  return (
    <div className="device-status">
      <div className="device-header">
        <div>
          <h1>Device Status & Sensors</h1>
          <p className="device-subtitle">
            Monitor device health and sensor connectivity
          </p>
        </div>
        
        <div className="device-actions">
          <button onClick={handleRefresh} className="btn-secondary">
            <RefreshCw size={16} />
            Refresh
          </button>
          <button onClick={handleRestartDevice} className="btn-warning">
            Restart Device
          </button>
        </div>
      </div>

      {/* Overall Status */}
      <div className="overview-cards">
        <div className="overview-card primary">
          <div className="overview-icon">
            <Cpu size={24} />
          </div>
          <div className="overview-content">
            <h3>Device Status</h3>
            <div className={`status-badge ${isConnected ? 'online' : 'offline'}`}>
              {isConnected ? 'Online' : 'Offline'}
            </div>
            <p>Last update: {vitals?.timestamp ? new Date(vitals.timestamp).toLocaleTimeString() : 'N/A'}</p>
          </div>
        </div>
        
        <div className="overview-card">
          <div className="overview-icon">
            <Battery size={24} />
          </div>
          <div className="overview-content">
            <h3>Battery Level</h3>
            <div className="battery-display">
              <div 
                className={`battery-level ${vitals?.battery < 20 ? 'low' : ''}`}
                style={{ width: `${vitals?.battery || 0}%` }}
              ></div>
            </div>
            <p>{vitals?.battery || 0}% remaining</p>
          </div>
        </div>
        
        <div className="overview-card">
          <div className="overview-icon">
            <Wifi size={24} />
          </div>
          <div className="overview-content">
            <h3>Connection</h3>
            <div className="connection-status">
              <span className={`signal-strength ${getSignalStrength(connectionStatus.wifi.strength)}`}>
                {connectionStatus.wifi.status}
              </span>
            </div>
            <p>WiFi: {connectionStatus.wifi.strength}%</p>
          </div>
        </div>
      </div>

      {/* Sensors Grid */}
      <div className="sensors-section">
        <h3>Sensor Status</h3>
        <div className="sensors-grid">
          {deviceSensors.map(sensor => (
            <div key={sensor.id} className={`sensor-card ${getStatusColor(sensor.status)}`}>
              <div className="sensor-header">
                <div className="sensor-icon">{sensor.icon}</div>
                <div className="sensor-info">
                  <h4>{sensor.name}</h4>
                  <div className="sensor-status">
                    {getStatusIcon(sensor.status)}
                    <span className={`status-text ${getStatusColor(sensor.status)}`}>
                      {sensor.status.charAt(0).toUpperCase() + sensor.status.slice(1)}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="sensor-reading">
                <span className="reading-label">Last Reading:</span>
                <span className="reading-value">{sensor.lastReading}</span>
              </div>
              
              <div className="sensor-actions">
                <button className="btn-small">Details</button>
                <button className="btn-small secondary">Calibrate</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Connection Details */}
      <div className="connection-section">
        <h3>Connection Details</h3>
        <div className="connection-cards">
          <div className="connection-card">
            <div className="connection-header">
              <Wifi size={20} />
              <h4>WiFi Connection</h4>
            </div>
            <div className="connection-details">
              <div className="detail-item">
                <span>Status:</span>
                <span className={`status ${getSignalStrength(connectionStatus.wifi.strength)}`}>
                  {connectionStatus.wifi.status}
                </span>
              </div>
              <div className="detail-item">
                <span>Signal Strength:</span>
                <span>{connectionStatus.wifi.strength}%</span>
              </div>
              <div className="detail-item">
                <span>IP Address:</span>
                <span>192.168.1.105</span>
              </div>
            </div>
          </div>
          
          <div className="connection-card">
            <div className="connection-header">
              <Signal size={20} />
              <h4>Cellular Backup</h4>
            </div>
            <div className="connection-details">
              <div className="detail-item">
                <span>Status:</span>
                <span className={`status ${getSignalStrength(connectionStatus.cellular.strength)}`}>
                  {connectionStatus.cellular.status}
                </span>
              </div>
              <div className="detail-item">
                <span>Signal Strength:</span>
                <span>{connectionStatus.cellular.strength}%</span>
              </div>
              <div className="detail-item">
                <span>Network:</span>
                <span>4G LTE</span>
              </div>
            </div>
          </div>
          
          <div className="connection-card">
            <div className="connection-header">
              <Cpu size={20} />
              <h4>Device Info</h4>
            </div>
            <div className="connection-details">
              <div className="detail-item">
                <span>Device ID:</span>
                <span>HM-001-2024</span>
              </div>
              <div className="detail-item">
                <span>Firmware:</span>
                <span>v2.1.4</span>
              </div>
              <div className="detail-item">
                <span>Uptime:</span>
                <span>12 days, 4 hours</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DeviceStatus