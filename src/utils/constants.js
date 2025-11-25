export const VITAL_RANGES = {
  heartRate: { min: 60, max: 100 },
  spO2: { min: 95, max: 100 },
  systolicBP: { min: 90, max: 120 },
  diastolicBP: { min: 60, max: 80 },
  temperature: { min: 36.1, max: 37.2 }
}

export const ALERT_TYPES = {
  FALL: 'fall',
  HEART_RATE: 'heartRate',
  SPO2: 'spO2',
  BLOOD_PRESSURE: 'bloodPressure',
  ECG: 'ecg',
  AIR_QUALITY: 'airQuality',
  SOUND: 'sound'
}

export const SENSOR_STATUS = {
  ONLINE: 'online',
  OFFLINE: 'offline',
  ERROR: 'error'
}