require('dotenv').config();

const config = {
  // Server Configuration
  PORT: process.env.PORT || 5001,
  MONGODB_URI: process.env.NODE_ENV === 'test' 
    ? 'mongodb://localhost:27017/todo-app-test'
    : (process.env.MONGODB_URI || 'mongodb://localhost:27017/todo-app'),
  
  // JWT Configuration
  JWT_SECRET: process.env.JWT_SECRET || 'your-secret-key',
  JWT_EXPIRY: '5m',
  
  // CORS Configuration
  CORS_ORIGIN: process.env.CORS_ORIGIN || 'http://localhost:3000',
  
  // API Routes
  API_PREFIX: '/api',
  AUTH_ROUTES: {
    REGISTER: '/auth/register',
    LOGIN: '/auth/login'
  },
  TASK_ROUTES: {
    BASE: '/tasks'
  }
};

module.exports = config; 