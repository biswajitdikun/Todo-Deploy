const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../server');
const Task = require('../models/Task');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const config = require('../config');

describe('Tasks API', () => {
  let testUser;
  let authToken;
  let testTask;

  beforeEach(async () => {
    // Create test user
    testUser = await User.create({
      username: 'testuser',
      email: 'test@example.com',
      password: 'Test@123'
    });

    // Generate auth token
    authToken = jwt.sign(
      { userId: testUser._id },
      process.env.JWT_SECRET || config.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Create test task
    testTask = await Task.create({
      title: 'Test Task',
      description: 'Test Description',
      user: testUser._id
    });
  });

  afterAll(async () => {
    await Task.deleteMany({});
    await User.deleteMany({});
  });

  describe('GET /api/tasks', () => {
    test('should get all tasks for authenticated user', async () => {
      const response = await request(app)
        .get('/api/tasks')
        .set('Authorization', `Bearer ${authToken}`);

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBeTruthy();
      expect(response.body.length).toBeGreaterThan(0);
      expect(response.body[0]).toHaveProperty('title', 'Test Task');
    });

    test('should return 401 for unauthenticated request', async () => {
      const response = await request(app)
        .get('/api/tasks');

      expect(response.status).toBe(401);
    });
  });

  describe('POST /api/tasks', () => {
    test('should create a new task', async () => {
      const newTask = {
        title: 'New Task',
        description: 'New Description'
      };

      const response = await request(app)
        .post('/api/tasks')
        .set('Authorization', `Bearer ${authToken}`)
        .send(newTask);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('title', newTask.title);
      expect(response.body).toHaveProperty('description', newTask.description);
      expect(response.body).toHaveProperty('user', testUser._id.toString());
    });

    test('should validate task title length', async () => {
      const invalidTask = {
        title: 'ab',
        description: 'Test Description'
      };

      const response = await request(app)
        .post('/api/tasks')
        .set('Authorization', `Bearer ${authToken}`)
        .send(invalidTask);

      expect(response.status).toBe(400);
    });
  });

  describe('PUT /api/tasks/:id', () => {
    test('should update an existing task', async () => {
      const updateData = {
        title: 'Updated Task',
        description: 'Updated Description'
      };

      const response = await request(app)
        .put(`/api/tasks/${testTask._id}`)
        .set('Authorization', `Bearer ${authToken}`)
        .send(updateData);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('title', updateData.title);
      expect(response.body).toHaveProperty('description', updateData.description);
    });

    test('should return 404 for non-existent task', async () => {
      const fakeId = new mongoose.Types.ObjectId();
      const response = await request(app)
        .put(`/api/tasks/${fakeId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({ title: 'Test' });

      expect(response.status).toBe(404);
    });
  });

  describe('DELETE /api/tasks/:id', () => {
    test('should delete an existing task', async () => {
      const response = await request(app)
        .delete(`/api/tasks/${testTask._id}`)
        .set('Authorization', `Bearer ${authToken}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('message', 'Task deleted successfully');

      // Verify task is deleted
      const deletedTask = await Task.findById(testTask._id);
      expect(deletedTask).toBeNull();
    });

    test('should return 404 for non-existent task', async () => {
      const fakeId = new mongoose.Types.ObjectId();
      const response = await request(app)
        .delete(`/api/tasks/${fakeId}`)
        .set('Authorization', `Bearer ${authToken}`);

      expect(response.status).toBe(404);
    });
  });
}); 