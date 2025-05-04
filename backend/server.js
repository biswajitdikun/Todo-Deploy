const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const { swaggerUi, swaggerDocs, swaggerUiOptions } = require('./swagger');
const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/tasks');

// Load environment variables
dotenv.config();

// Set default environment variables if missing
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/todo-app';
const JWT_SECRET = process.env.JWT_SECRET || 'local_development_secret';
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';
const PORT = process.env.PORT || 5001;
const NODE_ENV = process.env.NODE_ENV || 'development';

// Log environment configuration
console.log('Environment Configuration:');
console.log(`- MongoDB URI: ${MONGODB_URI.substring(0, 50)}...`);
console.log(`- Frontend URL: ${FRONTEND_URL}`);
console.log(`- Node Environment: ${NODE_ENV}`);
console.log(`- Port: ${PORT}`);

const app = express();

// Middleware
app.use(express.json());

// Request logger middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  
  // Log headers for debugging auth issues
  if (req.url.includes('/api/tasks')) {
    console.log('Request headers:', {
      authorization: req.headers.authorization ? 'Present (starts with: ' + req.headers.authorization.substring(0, 15) + '...)' : 'Missing',
      'content-type': req.headers['content-type'],
      origin: req.headers.origin
    });
  }
  
  next();
});

// CORS configuration
const allowedOrigins = [
  FRONTEND_URL,
  'http://localhost:3000',
  'https://todo-sage-tau.vercel.app',
  'http://localhost:5001',
  'https://todo-m8gg.onrender.com'
].filter(Boolean); // Remove any undefined values

app.use(cors({
  origin: function(origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  allowedHeaders: [
    'Content-Type', 
    'Authorization', 
    'api_key', 
    'x-api-key'
  ],
  credentials: true
}));

// Swagger Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs, swaggerUiOptions));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Connect to MongoDB
mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Start server
app.listen(PORT, () => {
  console.log(`Server running in ${NODE_ENV} mode on port ${PORT}`);
  console.log(`Swagger documentation available at http://localhost:${PORT}/api-docs`);
}); 