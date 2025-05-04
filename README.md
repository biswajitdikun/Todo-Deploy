# Todo List Application

A full-stack Todo List application built with the MERN stack (MongoDB, Express.js, React, Node.js) featuring user authentication, task management, and a modern Material-UI interface.

## Live Application
🚀 **[Access the Todo App](https://todo-frontend.ashysea-f735d8f2.eastus.azurecontainerapps.io/)**

### Deployment URLs
- Frontend: https://todo-frontend.ashysea-f735d8f2.eastus.azurecontainerapps.io/
- Backend API: https://todo-backend.ashysea-f735d8f2.eastus.azurecontainerapps.io/

## Features

- 🔐 User Authentication (JWT)
  - Register with username, email, and password
  - Secure login with email and password
  - Password strength validation
  - Automatic token management

- 📝 Task Management
  - Create, read, update, and delete tasks
  - Mark tasks as complete/incomplete
  - User-specific task lists
  - Real-time validation

- 🎨 Modern UI with Material-UI
  - Responsive design
  - User-friendly interface
  - Form validation feedback
  - Loading states and error handling

## Tech Stack

### Frontend
- React 18.2.0
- Material-UI 5.15.11
- React Router DOM 6.22.1
- Axios for API requests
- Context API for state management

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- bcryptjs for password hashing
- Jest and Supertest for testing

### Deployment
- Docker for containerization
- Azure Container Apps for hosting
- Azure Container Registry for image storage

## Project Structure

```
todo-app/
├── frontend/
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── context/       # React context providers
│   │   ├── pages/         # Page components
│   │   ├── services/      # API service functions
│   │   ├── utils/         # Utility functions
│   │   ├── config.js      # Frontend configuration
│   │   └── App.js         # Main application component
│   └── package.json
├── backend/
│   ├── models/           # MongoDB models
│   ├── routes/           # API routes
│   ├── middleware/       # Custom middleware
│   ├── config/          # Configuration files
│   ├── tests/           # Test files
│   ├── server.js        # Main server file
│   └── package.json
└── README.md
```

## Prerequisites

Before you begin, ensure you have installed:
- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm (v6 or higher)
- Docker (for containerized deployment)

## Installation

1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd todo-app
   ```

2. Install backend dependencies:
   ```bash
   cd backend
   npm install
   ```

3. Install frontend dependencies:
   ```bash
   cd frontend
   npm install
   ```

## Configuration

### Backend Environment Variables
Create a `.env` file in the backend directory:

```
PORT=5001
MONGODB_URI=mongodb://localhost:27017/todo-app
JWT_SECRET=your-super-secret-key-change-this-in-production
```

### Frontend Environment Variables
The frontend uses a configuration file located at `src/config.js`:

```javascript
const config = {
  API_URL: 'http://localhost:5001/api',
  // other configurations
};
```

## Running the Application

### Local Development

1. Start MongoDB:
   ```bash
   # macOS (using Homebrew)
   brew services start mongodb-community

   # Check MongoDB status
   brew services list
   ```

2. Start the backend server:
   ```bash
   cd backend
   npm run dev
   ```

3. Start the frontend development server:
   ```bash
   cd frontend
   npm start
   ```

The application will be available at:
- Frontend: http://localhost:3000
- Backend: http://localhost:5001

### Docker Deployment

1. Run the application using Docker Compose:
   ```bash
   docker-compose up -d
   ```

   This will start both the frontend and backend services in containers.

2. The application will be available at:
   - Frontend: http://localhost:80
   - Backend: http://localhost:5001

## Deployment

This application is deployed using Docker containers on Azure Container Apps. For detailed deployment instructions, please refer to:

- [Docker Deployment Guide](./DOCKER.md)
- [Azure Deployment Guide](./AZURE-DEPLOYMENT.md)

## API Documentation

The API is documented using Swagger/OpenAPI. You can access the documentation at:

- Local Development: http://localhost:5001/api-docs
- Production: https://todo-backend.ashysea-f735d8f2.eastus.azurecontainerapps.io/api-docs

### Using the API Documentation

1. Navigate to the Swagger UI using the links above
2. Explore available endpoints grouped by tags:
   - Authentication: User registration and login
   - Tasks: Task management endpoints
3. For authenticated endpoints:
   - Click the "Authorize" button
   - Enter your JWT token in the format: `Bearer <your-token>`
   - Click "Authorize" to authenticate your requests

The documentation provides:
- Request/response schemas
- Example payloads
- Required parameters
- Possible response codes
- Interactive testing interface

## Data Models

### User Model
```javascript
{
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 3
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    }
}
```

### Task Model
```javascript
{
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    completed: {
        type: Boolean,
        default: false
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}
```

## Security Features

1. Password Requirements:
   - Minimum 8 characters
   - At least one uppercase letter
   - At least one lowercase letter
   - At least one number
   - At least one special character

2. Authentication:
   - JWT-based authentication
   - Token expiration after 5 minutes
   - Secure password hashing using bcrypt
   - Protected routes

3. Data Validation:
   - Server-side validation using Mongoose
   - Client-side form validation
   - Input sanitization

## Error Handling

The application provides user-friendly error messages for:
- Invalid credentials
- Network errors
- Validation errors
- Server errors
- Authentication errors

## Development Tools

### MongoDB Compass
- Connection URL: mongodb://127.0.0.1:27017
- Database Name: todo-app
- Collections: users, tasks

### Postman
- Environment: Todo Local
- Base URL: http://localhost:5001/api
- Collection available in the repository

## Testing

### Backend Testing
The backend uses Jest and Supertest for testing:

```bash
cd backend
npm test
```

Test files are located in the `tests/` directory:
- `auth.test.js`: Authentication tests
- `tasks.test.js`: Task management tests

### Frontend Testing
```bash
cd frontend
npm test
```

## Deployment

### Current Deployment
The application is currently deployed and running at:
- Frontend: Vercel ([https://todo-sage-tau.vercel.app](https://todo-sage-tau.vercel.app))
- Backend: Render ([https://todo-m8gg.onrender.com](https://todo-m8gg.onrender.com))
- Database: MongoDB Atlas

### Environment Variables
1. Backend (Render.com):
```
PORT=10000
MONGODB_URI=your_mongodb_atlas_uri
JWT_SECRET=your_jwt_secret
FRONTEND_URL=https://todo-sage-tau.vercel.app
NODE_ENV=production
```

2. Frontend (Vercel):
```
REACT_APP_API_URL=https://todo-m8gg.onrender.com/api
```

## Troubleshooting

### Common Issues

1. MongoDB Connection Issues
   - Ensure MongoDB is running locally
   - Check if the MongoDB URI is correct in your `.env` file
   - Verify network connectivity to MongoDB Atlas if using cloud database

2. JWT Authentication Issues
   - Verify the JWT_SECRET is set correctly
   - Check if the token is being sent in the Authorization header
   - Ensure the token hasn't expired

3. CORS Issues
   - Verify the backend CORS configuration matches your frontend URL
   - Check if the API URL in frontend config matches the backend URL

4. Build Issues
   - Clear node_modules and package-lock.json
   - Run `npm install` again
   - Check for version conflicts in package.json

### Getting Help
If you encounter any issues:
1. Check the error logs in your terminal
2. Review the API response messages
3. Check the browser console for frontend errors
4. Ensure all environment variables are set correctly

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request


