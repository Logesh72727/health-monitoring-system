import React from 'react'
import './RealTimeMap.css'

const RealTimeMap = ({ location }) => {
  const defaultLocation = { lat: 40.7128, lng: -74.0060 }
  const currentLocation = location || defaultLocation

  return (
    <div className="map-container">
      <div className="map-placeholder">
        <div className="map-marker">
          <div className="marker-pulse"></div>
          <div className="marker-center"></div>
        </div>
        <div className="map-coordinates">
          <span>Lat: {currentLocation.lat.toFixed(4)}</span>
          <span>Lng: {currentLocation.lng.toFixed(4)}</span>
        </div>
        <div className="map-overlay">
          <div className="map-message">
            <h4>Live Location Tracking</h4>
            <p>GPS coordinates updated in real-time</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RealTimeMap