import React from 'react'
import { useWebSocket } from '../../contexts/WebSocketContext'
import { Trash2, Bell, AlertTriangle, Activity, Volume2 } from 'lucide-react'
import './EmergencyAlerts.css'

const EmergencyAlerts = () => {
  const { alerts, clearAlert } = useWebSocket()

  const getAlertIcon = (type) => {
    switch (type) {
      case 'fall':
        return <AlertTriangle size={20} className="alert-icon fall" />
      case 'heartRate':
        return <Activity size={20} className="alert-icon heart" />
      case 'spO2':
        return <Activity size={20} className="alert-icon spo2" />
      case 'bloodPressure':
        return <Activity size={20} className="alert-icon bp" />
      case 'sound':
        return <Volume2 size={20} className="alert-icon sound" />
      default:
        return <Bell size={20} className="alert-icon default" />
    }
  }

  const getAlertColor = (type) => {
    const colors = {
      fall: 'danger',
      heartRate: 'danger',
      spO2: 'danger',
      bloodPressure: 'warning',
      sound: 'warning'
    }
    return colors[type] || 'warning'
  }

  const getAlertTitle = (type) => {
    const titles = {
      fall: 'Fall Detected',
      heartRate: 'Abnormal Heart Rate',
      spO2: 'Low Blood Oxygen',
      bloodPressure: 'Blood Pressure Alert',
      sound: 'Unusual Sound Detected'
    }
    return titles[type] || 'System Alert'
  }

  const getPriority = (type) => {
    return ['fall', 'heartRate', 'spO2'].includes(type) ? 'HIGH' : 'MEDIUM'
  }

  const handleClearAlert = (alertId) => {
    clearAlert(alertId)
  }

  const criticalAlerts = alerts.filter(alert => getAlertColor(alert.type) === 'danger')
  const warningAlerts = alerts.filter(alert => getAlertColor(alert.type) === 'warning')

  return (
    <div className="emergency-alerts">
      <div className="alerts-header">
        <div>
          <h1>Emergency Alerts</h1>
          <p className="alerts-subtitle">
            Real-time emergency notifications and alerts
          </p>
        </div>
        
        <div className="alerts-stats">
          <div className="stat-card critical">
            <span className="stat-number">{criticalAlerts.length}</span>
            <span className="stat-label">Critical</span>
          </div>
          <div className="stat-card warning">
            <span className="stat-number">{warningAlerts.length}</span>
            <span className="stat-label">Warnings</span>
          </div>
          <div className="stat-card total">
            <span className="stat-number">{alerts.length}</span>
            <span className="stat-label">Total</span>
          </div>
        </div>
      </div>

      {alerts.length === 0 ? (
        <div className="no-alerts">
          <div className="no-alerts-icon">✅</div>
          <h3>No Active Alerts</h3>
          <p>All systems are functioning normally. No emergency alerts at this time.</p>
        </div>
      ) : (
        <div className="alerts-content">
          {/* Critical Alerts */}
          {criticalAlerts.length > 0 && (
            <div className="alerts-section">
              <h3 className="section-title critical">Critical Alerts ({criticalAlerts.length})</h3>
              <div className="alerts-grid">
                {criticalAlerts.map(alert => (
                  <AlertCard
                    key={alert.id}
                    alert={alert}
                    getAlertIcon={getAlertIcon}
                    getAlertColor={getAlertColor}
                    getAlertTitle={getAlertTitle}
                    getPriority={getPriority}
                    onClear={handleClearAlert}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Warning Alerts */}
          {warningAlerts.length > 0 && (
            <div className="alerts-section">
              <h3 className="section-title warning">Warnings ({warningAlerts.length})</h3>
              <div className="alerts-grid">
                {warningAlerts.map(alert => (
                  <AlertCard
                    key={alert.id}
                    alert={alert}
                    getAlertIcon={getAlertIcon}
                    getAlertColor={getAlertColor}
                    getAlertTitle={getAlertTitle}
                    getPriority={getPriority}
                    onClear={handleClearAlert}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

const AlertCard = ({ alert, getAlertIcon, getAlertColor, getAlertTitle, getPriority, onClear }) => {
  const alertColor = getAlertColor(alert.type)
  const priority = getPriority(alert.type)

  return (
    <div className={`alert-card ${alertColor}`}>
      <div className="alert-header">
        <div className="alert-icon-container">
          {getAlertIcon(alert.type)}
        </div>
        <div className="alert-title-section">
          <h4>{getAlertTitle(alert.type)}</h4>
          <div className="alert-meta">
            <span className="alert-timestamp">
              {new Date(alert.timestamp).toLocaleString()}
            </span>
            <span className={`alert-priority ${alertColor}`}>
              {priority}
            </span>
          </div>
        </div>
        <button
          onClick={() => onClear(alert.id)}
          className="alert-clear-btn"
          title="Dismiss alert"
        >
          <Trash2 size={16} />
        </button>
      </div>

      <div className="alert-body">
        <p className="alert-message">{alert.message}</p>
        
        {alert.vitals && (
          <div className="alert-vitals">
            <div className="vital-item">
              <span>Heart Rate:</span>
              <strong>{alert.vitals.heartRate} bpm</strong>
            </div>
            <div className="vital-item">
              <span>SpO₂:</span>
              <strong>{alert.vitals.spO2}%</strong>
            </div>
            <div className="vital-item">
              <span>BP:</span>
              <strong>{alert.vitals.bloodPressure}</strong>
            </div>
            <div className="vital-item">
              <span>Temp:</span>
              <strong>{alert.vitals.temperature}°C</strong>
            </div>
          </div>
        )}

        {alert.vitals?.location && (
          <div className="alert-location">
            <span>Location: </span>
            <strong>
              {alert.vitals.location.lat.toFixed(4)}, {alert.vitals.location.lng.toFixed(4)}
            </strong>
          </div>
        )}
      </div>

      <div className="alert-actions">
        <button className="btn-primary">View Details</button>
        <button className="btn-secondary">Acknowledge</button>
      </div>
    </div>
  )
}

export default EmergencyAlerts