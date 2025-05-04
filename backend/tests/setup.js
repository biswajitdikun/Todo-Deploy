const mongoose = require('mongoose');
const config = require('../config');

// Set test environment variables
process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = 'test-secret-key';
process.env.JWT_EXPIRY = '1h';

// Connect to test database before running any tests
beforeAll(async () => {
  try {
    await mongoose.connect(config.MONGODB_URI);
    console.log('Connected to test database:', config.MONGODB_URI);
  } catch (error) {
    console.error('Error connecting to test database:', error);
    throw error;
  }
});

// Clear all collections before each test
beforeEach(async () => {
  if (mongoose.connection.readyState === 1) {
    try {
      await Promise.all([
        mongoose.connection.collection('users').deleteMany({}),
        mongoose.connection.collection('tasks').deleteMany({})
      ]);
      console.log('Cleared test collections');
    } catch (error) {
      console.error('Error clearing collections:', error);
      throw error;
    }
  }
});

// Disconnect from test database after all tests
afterAll(async () => {
  if (mongoose.connection.readyState === 1) {
    try {
      await Promise.all([
        mongoose.connection.collection('users').deleteMany({}),
        mongoose.connection.collection('tasks').deleteMany({})
      ]);
      await mongoose.connection.close();
      console.log('Disconnected from test database');
    } catch (error) {
      console.error('Error disconnecting from test database:', error);
      throw error;
    }
  }
}); 