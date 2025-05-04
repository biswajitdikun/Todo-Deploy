FROM node:18-alpine AS build

WORKDIR /app

ARG REACT_APP_API_URL
ENV REACT_APP_API_URL=$REACT_APP_API_URL

# Copy package files first for better layer caching
COPY package*.json ./

# Install all dependencies for build
RUN npm install

# Copy application code
COPY . .

# Build the application
RUN npm run build

# Production environment with Nginx
FROM nginx:alpine

# Copy built files from the build stage
COPY --from=build /app/build /usr/share/nginx/html

# Copy Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Create a dynamic-config.js file that will override the config.js
RUN echo 'window.API_URL = "https://todo-backend.ashysea-f735d8f2.eastus.azurecontainerapps.io/api";' > /usr/share/nginx/html/dynamic-config.js

# Create startup script to modify index.html to include dynamic-config.js
RUN echo '#!/bin/sh\n\
sed -i "s#</head>#<script src=\\"/dynamic-config.js\\"></script></head>#g" /usr/share/nginx/html/index.html\n\
exec "$@"' > /docker-entrypoint.d/30-update-config.sh && \
chmod +x /docker-entrypoint.d/30-update-config.sh

# Expose web server port
EXPOSE 80

# Start Nginx with our custom entrypoint
CMD ["nginx", "-g", "daemon off;"] 