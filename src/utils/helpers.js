export const getVitalStatus = (type, value) => {
  const ranges = {
    heartRate: value < 60 || value > 100 ? 'danger' : value < 70 || value > 90 ? 'warning' : 'safe',
    spO2: value < 90 ? 'danger' : value < 95 ? 'warning' : 'safe',
    bloodPressure: (systolic, diastolic) => 
      systolic > 140 || diastolic > 90 ? 'danger' : 
      systolic > 130 || diastolic > 85 ? 'warning' : 'safe',
    temperature: value > 38 ? 'danger' : value > 37.5 ? 'warning' : 'safe'
  }
  
  return ranges[type]
}

export const formatTimestamp = (timestamp) => {
  return new Date(timestamp).toLocaleString()
}

export const generateMockVitals = () => {
  return {
    heartRate: Math.floor(60 + Math.random() * 40),
    spO2: Math.floor(90 + Math.random() * 10),
    bloodPressure: `${Math.floor(110 + Math.random() * 30)}/${Math.floor(70 + Math.random() * 20)}`,
    temperature: (36 + Math.random() * 2).toFixed(1),
    stressLevel: Math.floor(Math.random() * 100),
    airQuality: ['Good', 'Moderate', 'Poor'][Math.floor(Math.random() * 3)],
    timestamp: new Date().toISOString()
  }
}