import React from 'react'
import { TrendingUp, TrendingDown, Minus } from 'lucide-react'
import './VitalCard.css'

const VitalCard = ({ title, value, unit, status, icon, trend }) => {
  const getTrendIcon = () => {
    switch (trend) {
      case 'up':
        return <TrendingUp size={16} className="trend-up" />
      case 'down':
        return <TrendingDown size={16} className="trend-down" />
      default:
        return <Minus size={16} className="trend-stable" />
    }
  }

  const getStatusText = () => {
    switch (status) {
      case 'danger':
        return 'Critical'
      case 'warning':
        return 'Warning'
      default:
        return 'Normal'
    }
  }

  return (
    <div className={`vital-card ${status}`}>
      <div className="vital-header">
        <div className="vital-icon">{icon}</div>
        <div className="vital-title-trend">
          <h3>{title}</h3>
          <div className="trend-indicator">
            {getTrendIcon()}
          </div>
        </div>
      </div>
      
      <div className="vital-value">
        {value || '--'}
        {unit && <span className="vital-unit">{unit}</span>}
      </div>
      
      <div className={`status-indicator ${status}`}>
        {getStatusText()}
      </div>
    </div>
  )
}

export default VitalCard