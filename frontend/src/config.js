const config = {
  // API Configuration
  API_URL: window.API_URL || process.env.REACT_APP_API_URL || 
    (process.env.NODE_ENV === 'production' 
      ? 'https://todo-backend.ashysea-f735d8f2.eastus.azurecontainerapps.io/api'  // Azure backend URL
      : 'http://localhost:5001/api'),  // Local backend URL
  
  // Authentication Configuration
  TOKEN_KEY: 'token',
  TOKEN_EXPIRY: '5m',
  
  // App Configuration
  APP_NAME: 'Todo App',
  APP_DESCRIPTION: 'A simple and efficient task management application',
  
  // Routes
  ROUTES: {
    LOGIN: '/login',
    REGISTER: '/register',
    TASKS: '/tasks',
    HOME: '/'
  },
  
  // Theme Configuration
  THEME: {
    PRIMARY_COLOR: '#1976d2',
    SECONDARY_COLOR: '#dc004e'
  }
};

export default config; 