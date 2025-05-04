FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies (including dev dependencies)
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE 5001

# Set environment variables
ENV NODE_ENV=production
ENV PORT=5001

# Command to run the application
CMD ["npm", "start"] 