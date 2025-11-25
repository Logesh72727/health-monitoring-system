import React, { useState } from 'react'
import { Line, Bar } from 'react-chartjs-2'
import { Download, Calendar, TrendingUp } from 'lucide-react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js'
import './HistoricalData.css'

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

const HistoricalData = () => {
  const [timeRange, setTimeRange] = useState('daily')
  const [selectedMetric, setSelectedMetric] = useState('heartRate')

  const metrics = {
    heartRate: { label: 'Heart Rate', unit: 'bpm', color: 'rgb(239, 68, 68)' },
    spO2: { label: 'SpO₂', unit: '%', color: 'rgb(16, 185, 129)' },
    bloodPressure: { label: 'Blood Pressure', unit: 'mmHg', color: 'rgb(59, 130, 246)' },
    temperature: { label: 'Temperature', unit: '°C', color: 'rgb(245, 158, 11)' }
  }

  // Mock historical data
  const generateData = () => {
    const baseValues = {
      heartRate: 72,
      spO2: 98,
      bloodPressure: 120,
      temperature: 36.6
    }

    return Array.from({ length: 24 }, (_, i) => ({
      time: `${i}:00`,
      heartRate: Math.max(50, Math.min(120, baseValues.heartRate + Math.random() * 20 - 10)),
      spO2: Math.max(85, Math.min(100, baseValues.spO2 + Math.random() * 4 - 2)),
      systolic: Math.max(90, Math.min(180, baseValues.bloodPressure + Math.random() * 20 - 10)),
      diastolic: Math.max(60, Math.min(100, 80 + Math.random() * 10 - 5)),
      temperature: Math.max(35, Math.min(39, baseValues.temperature + Math.random() * 1 - 0.5))
    }))
  }

  const data = generateData()
  const currentMetric = metrics[selectedMetric]

  const chartData = {
    labels: data.map(d => d.time),
    datasets: [
      {
        label: currentMetric.label,
        data: data.map(d => 
          selectedMetric === 'bloodPressure' ? d.systolic : d[selectedMetric]
        ),
        borderColor: currentMetric.color,
        backgroundColor: `${currentMetric.color}20`,
        borderWidth: 3,
        tension: 0.4,
        fill: true,
        pointRadius: 0,
        pointHoverRadius: 4
      }
    ]
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleFont: { size: 12 },
        bodyFont: { size: 12 },
        padding: 12,
        displayColors: false,
        callbacks: {
          label: function(context) {
            return `${currentMetric.label}: ${context.parsed.y} ${currentMetric.unit}`
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: false,
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
        title: {
          display: true,
          text: currentMetric.unit,
          color: '#64748b',
          font: { size: 12 }
        }
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          maxRotation: 0,
          color: '#64748b',
          font: { size: 11 }
        }
      }
    },
    interaction: {
      intersect: false,
      mode: 'index',
    },
  }

  const barChartData = {
    labels: ['Low', 'Normal', 'High'],
    datasets: [
      {
        data: [3, 18, 3],
        backgroundColor: [
          'rgb(16, 185, 129)',
          'rgb(59, 130, 246)',
          'rgb(239, 68, 68)'
        ],
        borderWidth: 0,
        borderRadius: 4
      }
    ]
  }

  const barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
        ticks: {
          stepSize: 5
        }
      },
      x: {
        grid: {
          display: false,
        }
      }
    }
  }

  const downloadReport = () => {
    // In a real app, this would generate and download a PDF report
    alert('Report download functionality would be implemented here')
  }

  const calculateStats = () => {
    const values = data.map(d => 
      selectedMetric === 'bloodPressure' ? d.systolic : d[selectedMetric]
    )
    const avg = values.reduce((sum, val) => sum + val, 0) / values.length
    const max = Math.max(...values)
    const min = Math.min(...values)
    const trend = avg > (selectedMetric === 'heartRate' ? 75 : 
                      selectedMetric === 'spO2' ? 97 : 
                      selectedMetric === 'bloodPressure' ? 125 : 36.8) ? 'up' : 'down'
    
    return { avg: Math.round(avg * 10) / 10, max, min, trend }
  }

  const stats = calculateStats()

  return (
    <div className="historical-data">
      <div className="history-header">
        <div>
          <h1>Historical Data & Analytics</h1>
          <p className="history-subtitle">
            Track health metrics over time and identify trends
          </p>
        </div>
        
        <div className="history-controls">
          <div className="control-group">
            <label htmlFor="metric-select">Metric</label>
            <select
              id="metric-select"
              value={selectedMetric}
              onChange={(e) => setSelectedMetric(e.target.value)}
              className="control-select"
            >
              {Object.keys(metrics).map(metric => (
                <option key={metric} value={metric}>
                  {metrics[metric].label}
                </option>
              ))}
            </select>
          </div>
          
          <div className="control-group">
            <label htmlFor="time-select">Time Range</label>
            <select
              id="time-select"
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="control-select"
            >
              <option value="daily">Last 24 Hours</option>
              <option value="weekly">Last Week</option>
              <option value="monthly">Last Month</option>
            </select>
          </div>
          
          <button onClick={downloadReport} className="download-btn">
            <Download size={16} />
            Download Report
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="stats-overview">
        <div className="stat-card primary">
          <div className="stat-icon">
            <TrendingUp size={24} />
          </div>
          <div className="stat-content">
            <span className="stat-label">Average {currentMetric.label}</span>
            <div className="stat-value">
              {stats.avg}
              <span className="stat-unit">{currentMetric.unit}</span>
            </div>
            <div className={`stat-trend ${stats.trend}`}>
              {stats.trend === 'up' ? '↗' : '↘'} 
              {stats.trend === 'up' ? 'Above normal' : 'Below normal'}
            </div>
          </div>
        </div>
        
        <div className="stat-card">
          <span className="stat-label">Maximum</span>
          <div className="stat-value">
            {parseInt(stats.max)}
            <span className="stat-unit">{currentMetric.unit}</span>
          </div>
        </div>
        
        <div className="stat-card">
          <span className="stat-label">Minimum</span>
          <div className="stat-value">
            {parseInt(stats.min)}
            <span className="stat-unit">{currentMetric.unit}</span>
          </div>
        </div>
        
        <div className="stat-card">
          <span className="stat-label">Data Points</span>
          <div className="stat-value">{data.length}</div>
        </div>
      </div>

      {/* Main Chart */}
      <div className="chart-section">
        <div className="chart-container large">
          <div className="chart-header">
            <h3>{currentMetric.label} Over Time</h3>
            <div className="chart-period">
              <Calendar size={16} />
              <span>Last 24 Hours</span>
            </div>
          </div>
          <div className="chart-wrapper">
            <Line data={chartData} options={chartOptions} />
          </div>
        </div>
      </div>

      {/* Additional Charts */}
      <div className="additional-charts">
        <div className="chart-container">
          <h4>Distribution</h4>
          <div className="chart-wrapper small">
            <Bar data={barChartData} options={barChartOptions} />
          </div>
        </div>
        
        <div className="chart-container">
          <h4>Trend Analysis</h4>
          <div className="trend-analysis">
            <div className="trend-item">
              <span className="trend-label">Stability</span>
              <div className="trend-bar">
                <div className="trend-fill" style={{ width: '85%' }}></div>
              </div>
              <span className="trend-value">85%</span>
            </div>
            <div className="trend-item">
              <span className="trend-label">Variability</span>
              <div className="trend-bar">
                <div className="trend-fill low" style={{ width: '15%' }}></div>
              </div>
              <span className="trend-value">15%</span>
            </div>
            <div className="trend-item">
              <span className="trend-label">Alert Frequency</span>
              <div className="trend-bar">
                <div className="trend-fill" style={{ width: '5%' }}></div>
              </div>
              <span className="trend-value">5%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HistoricalData