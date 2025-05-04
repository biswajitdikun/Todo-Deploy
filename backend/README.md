# Todo List Backend

This is the backend server for a Todo List application built with Node.js, Express, and MongoDB.

## Features

- User authentication (register/login)
- JWT-based authentication
- CRUD operations for tasks
- MongoDB database integration
- RESTful API endpoints

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm (v6 or higher)

## Installation

1. Clone the repository
2. Navigate to the backend directory:
   ```bash
   cd backend
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Create a `.env` file in the root directory and add the following variables:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/todo-app
   JWT_SECRET=your-super-secret-key-change-this-in-production
   ```

## Running the Application

Development mode:
```bash
npm run dev
```

Production mode:
```bash
npm start
```

## API Endpoints

### Authentication
- POST `/api/auth/register` - Register a new user
- POST `/api/auth/login` - Login user

### Tasks
- GET `/api/tasks` - Get all tasks for the authenticated user
- POST `/api/tasks` - Create a new task
- PUT `/api/tasks/:id` - Update a task
- DELETE `/api/tasks/:id` - Delete a task

## Request/Response Examples

### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "username": "testuser",
  "email": "test@example.com",
  "password": "password123"
}
```

### Login User
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "test@example.com",
  "password": "password123"
}
```

### Create Task
```http
POST /api/tasks
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Complete project",
  "description": "Finish the todo list application"
}
```

## Error Handling

The API returns appropriate HTTP status codes and error messages in the following format:
```json
{
  "message": "Error message here"
}
```

## Security

- Passwords are hashed using bcrypt
- JWT tokens are used for authentication
- CORS is enabled for frontend integration
- Environment variables are used for sensitive data

## API Documentation with Swagger

This backend is now equipped with Swagger documentation for all API endpoints.

### Accessing Swagger Documentation

- Local Development: http://localhost:5001/api-docs
- Production: https://todo-m8gg.onrender.com/api-docs

### Using Swagger UI

1. Navigate to the Swagger documentation URL
2. You'll see a list of all available endpoints grouped by tags:
   - Authentication: User registration and login
   - Tasks: Task management endpoints
3. For testing authenticated endpoints:
   - Click the "Authorize" button at the top
   - Enter your JWT token in the format: `Bearer <your-token>`
   - Click "Authorize" to authenticate your requests

### Extending Swagger Documentation

When adding new endpoints, document them using JSDoc comments. For example:

```javascript
/**
 * @swagger
 * /api/endpoint:
 *   get:
 *     summary: Endpoint description
 *     tags: [Tag]
 *     responses:
 *       200:
 *         description: Success response
 */
router.get('/endpoint', (req, res) => {
  // Implementation
});
```

Reference the Swagger JSDoc documentation for more options: https://github.com/Surnet/swagger-jsdoc/blob/master/docs/GETTING-STARTED.md 

## Using Swagger UI with Authentication

To use Swagger UI for testing authenticated endpoints (like tasks):

1. First, register or login a user to get a token:
   - Go to the `/api/auth/register` or `/api/auth/login` endpoint
   - Fill in the required information and execute the request
   - Copy the token from the response (it will look like `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`)

2. Click the "Authorize" button at the top of the Swagger UI page:
   - In the value field, enter: `Bearer your-token-here`
   - Make sure to include the word "Bearer" followed by a space, then your token
   - Click "Authorize" and close the dialog

3. Now you can execute task operations:
   - GET /api/tasks - Fetch all tasks
   - POST /api/tasks - Create a new task
   - PUT /api/tasks/{id} - Update a task
   - DELETE /api/tasks/{id} - Delete a task

4. The Swagger UI will include the token in all generated curl commands.

5. If you use the "Try it out" feature, the token will be automatically added to your requests.

### Example curl Commands with Authentication

Here's an example of how to use the API with curl:

```bash
# First, login to get a token
curl -X POST "http://localhost:5001/api/auth/login" \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"yourpassword"}'

# Response will contain a token like:
# {"user":{...},"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."}

# Use that token in subsequent requests:
curl -X GET "http://localhost:5001/api/tasks" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."

# Create a new task
curl -X POST "http://localhost:5001/api/tasks" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -d '{"title":"New Task","description":"Task description"}'

# Update a task
curl -X PUT "http://localhost:5001/api/tasks/task_id_here" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -d '{"title":"Updated Task","description":"Updated description","completed":true}'

# Delete a task
curl -X DELETE "http://localhost:5001/api/tasks/task_id_here" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
``` 