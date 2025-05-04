#!/bin/bash

# Display welcome message
echo "==============================================="
echo "  Todo App - Docker Environment"
echo "==============================================="
echo ""
echo "Starting containers with the following configuration:"
echo "  MongoDB URI: MongoDB Atlas (Cloud)"
echo "  Frontend URL: http://localhost:3000"
echo "  Backend URL: http://localhost:5001"
echo ""

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
  echo "Error: Docker is not running. Please start Docker and try again."
  exit 1
fi

# Check if backend/.env exists
if [ ! -f "./backend/.env" ]; then
  echo "Error: backend/.env file not found."
  echo "Please create a .env file in the backend directory with your MongoDB connection string and other environment variables."
  exit 1
fi

# Build and start the containers
echo "Stopping any existing containers..."
docker-compose down

echo "Building and starting containers..."
docker-compose up --build -d

# Wait for containers to be ready
echo "Waiting for services to start..."
sleep 5

# Display status
echo ""
echo "==============================================="
echo "  Todo App is now running in Docker!"
echo "==============================================="
echo ""
echo "Access your application at:"
echo "  Frontend: http://localhost:3000"
echo "  Backend API: http://localhost:5001"
echo "  API Documentation: http://localhost:5001/api-docs"
echo ""
echo "Container status:"
docker-compose ps
echo ""
echo "To view logs:"
echo "  All containers: docker-compose logs -f"
echo "  Backend only: docker logs -f todo-backend"
echo "  Frontend only: docker logs -f todo-frontend"
echo ""
echo "To stop the application:"
echo "  ./stop-docker.sh or docker-compose down"
echo "" 