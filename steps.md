# Steps to Generate Todo List Application

## Initial Setup

1. Create project directories:
```bash
mkdir -p frontend backend
```

2. Install Node.js (if not already installed):
```bash
brew install node
```

3. Install MongoDB (if not already installed):
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb/brew/mongodb-community
```

## Backend Setup

1. Navigate to backend directory and initialize Node.js project:
```bash
cd backend
npm init -y
```

2. Install backend dependencies:
```bash
npm install express mongoose bcryptjs jsonwebtoken cors dotenv
npm install --save-dev nodemon jest supertest
```

3. Create backend directory structure:
```bash
mkdir -p models routes middleware config tests
```

4. Create backend files:
```bash
# Create server.js
touch server.js

# Create model files
touch models/User.js
touch models/Task.js

# Create route files
touch routes/auth.js
touch routes/tasks.js

# Create middleware file
touch middleware/auth.js

# Create config file
touch config.js

# Create environment file
touch .env

# Create test files
touch tests/auth.test.js
touch tests/tasks.test.js
```

5. Configure environment variables (.env):
```
PORT=5001
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
FRONTEND_URL=http://localhost:3000
```

## Frontend Setup

1. Navigate to frontend directory and create React app:
```bash
cd ../frontend
npx create-react-app .
```

2. Install frontend dependencies:
```bash
npm install @mui/material @emotion/react @emotion/styled @mui/icons-material axios react-router-dom
```

3. Create frontend directory structure:
```bash
mkdir -p src/components src/context src/services src/pages src/utils
```

4. Create frontend files:
```bash
# Create context file
touch src/context/AuthContext.js

# Create service file
touch src/services/taskService.js

# Create component files
touch src/components/PrivateRoute.js

# Create page files
touch src/pages/Login.js
touch src/pages/Register.js
touch src/pages/Tasks.js

# Create config file
touch src/config.js
```

## Deployment

### 1. Database Setup (MongoDB Atlas)
1. Create MongoDB Atlas account
2. Create new cluster
3. Set up database access
4. Get connection string
5. Add IP access (0.0.0.0/0 for all access)

### 2. Backend Deployment (Render.com)
1. Create Render account
2. Create new Web Service
3. Connect GitHub repository
4. Configure service:
   ```
   Name: todo-app-backend
   Root Directory: backend
   Environment: Node
   Build Command: npm install
   Start Command: node server.js
   ```
5. Add environment variables:
   ```
   PORT=10000
   MONGODB_URI= MongoDB Connection String
   JWT_SECRET=your_jwt_secret
   FRONTEND_URL=https://todo-sage-tau.vercel.app
   NODE_ENV=production
   ```

### 3. Frontend Deployment (Vercel)
1. Create Vercel account
2. Import GitHub repository
3. Configure project:
   ```
   Framework Preset: Create React App
   Build Command: npm run build
   Output Directory: build
   Install Command: npm install
   ```
4. Add environment variables:
   ```
   REACT_APP_API_URL=https://todo-m8gg.onrender.com/api
   ```

## Live Application
🚀 **[Access the Todo App Here](https://todo-sage-tau.vercel.app)**

### Development URLs
- Frontend (Vercel): https://todo-sage-tau.vercel.app
- Backend API (Render): https://todo-m8gg.onrender.com

## Testing

### Backend Testing
```bash
cd backend
npm test
```

### Frontend Testing
```bash
cd frontend
npm test
```

## Verifying the Setup

1. Backend Verification:
```bash
# Check if MongoDB is running
brew services list | grep mongodb

# Check if backend is running
curl http://localhost:5001/api/tasks
# Should receive: {"message":"Please authenticate."}
```

2. Frontend Verification:
- Open http://localhost:3000 in your browser
- Try registering a new user
- Try logging in
- Try creating, editing, and deleting tasks

## Troubleshooting

1. If port 5001 is in use:
```bash
# Find process using port 5001
lsof -i :5001
# Kill the process
kill -9 <PID>
```

2. If MongoDB fails to start:
```bash
# Stop MongoDB service
brew services stop mongodb/brew/mongodb-community
# Start MongoDB service
brew services start mongodb/brew/mongodb-community
# Check MongoDB status
brew services list
```

3. If node_modules are missing or corrupted:
```bash
# In backend directory
cd backend
rm -rf node_modules
npm install

# In frontend directory
cd frontend
rm -rf node_modules
npm install
```

## File Contents

After creating all the files, the contents of each file were added as shown in the attached files. The main files created were:

### Backend
- server.js
- models/User.js
- models/Task.js
- routes/auth.js
- routes/tasks.js
- middleware/auth.js
- .env
- package.json
- README.md

### Frontend
- src/App.js
- src/context/AuthContext.js
- src/services/taskService.js
- src/components/PrivateRoute.js
- src/pages/Login.js
- src/pages/Register.js
- src/pages/Tasks.js
- README.md

### Root
- README.md
- .gitignore
- dependencies.md
- steps.md 
