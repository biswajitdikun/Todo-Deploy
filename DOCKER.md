# Docker Deployment Guide for Todo App

This guide details how to run the Todo application using Docker containers.

## Prerequisites

1. **Docker & Docker Compose**: Install Docker Desktop which includes Docker Compose.
   ```bash
   # Visit https://www.docker.com/products/docker-desktop
   ```

## Configuration

The application is configured using environment variables stored in `backend/.env`. The file includes:

- `MONGODB_URI`: Connection string for MongoDB Atlas
- `JWT_SECRET`: Secret for JWT token signing
- `FRONTEND_URL`: URL for the frontend application
- `PORT`: Port for the backend server
- `NODE_ENV`: Node.js environment (production/development)

Make sure the `.env` file exists in the backend directory before running Docker. This keeps environment variables with their corresponding service.

## Running with Docker

### Using the Convenience Scripts

1. Start the application:
   ```bash
   ./run-docker.sh
   ```
   
   This will:
   - Stop any existing containers
   - Build and start the Docker containers
   - Display the URLs to access the application
   
2. Stop the application:
   ```bash
   ./stop-docker.sh
   ```

### Manual Docker Commands

If you prefer to run Docker commands directly:

1. Build the containers:
   ```bash
   docker-compose build
   ```

2. Start the application in detached mode:
   ```bash
   docker-compose up -d
   ```

3. View logs:
   ```bash
   # All containers
   docker-compose logs -f
   
   # Specific container
   docker logs -f todo-backend
   docker logs -f todo-frontend
   ```

4. Stop and remove containers:
   ```bash
   docker-compose down
   ```
5. Manual Checking of ports:
   ```bash
   lsof - i :5001
   kill <pid>
   lsof - i :3000
   kill <pid>
   ./run-docker.sh
   ```

## Application Access

Once running, you can access the application at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5001
- API Documentation: http://localhost:5001/api-docs

## Container Information

### Backend Container
- Image: Node.js 18 Alpine
- Ports: 5001
- Environment: Configured via backend/.env
- Volume: None (code is copied into the container)

### Frontend Container
- Image: Nginx Alpine (after building with Node.js)
- Ports: Maps host port 3000 to container port 80
- Environment: API URL configured via environment variable
- Volume: None (built static files are copied into the container)

## Troubleshooting

### Common Issues

1. **Port Conflicts**:
   If ports 3000 or 5001 are already in use, you'll need to modify the port mappings in `docker-compose.yml`.

2. **MongoDB Connection**:
   Ensure your MongoDB Atlas connection string in `backend/.env` is correct and that your IP address is whitelisted in MongoDB Atlas.

3. **Docker Not Running**:
   If you get errors about Docker not running, make sure Docker Desktop is running before attempting to start the containers.

4. **Network Issues**:
   The containers communicate through the `todo-network`. If they can't communicate, ensure the network is properly created.

## Deployment Considerations

For a production deployment, consider:

1. **Security**: 
   - Use more secure JWT secrets
   - Set up proper authentication for MongoDB
   - Configure HTTPS

2. **Persistence**:
   - Add volume for database persistence if running MongoDB locally

3. **Scaling**:
   - Consider container orchestration for scaling (Kubernetes/Docker Swarm)
   - Implement load balancing 