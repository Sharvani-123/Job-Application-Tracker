// API Configuration
const API_CONFIG = {
  // Production API URL (Render deployment)
  PRODUCTION_URL: 'https://job-application-tracker-1-ywr7.onrender.com',
  
  // Development API URL (local)
  DEVELOPMENT_URL: 'http://localhost:5000',
  
  // Current environment
  get BASE_URL() {
    return process.env.NODE_ENV === 'production' 
      ? this.PRODUCTION_URL 
      : this.PRODUCTION_URL // Using production URL for now
  }
}

export default API_CONFIG
