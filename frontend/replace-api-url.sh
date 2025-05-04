#!/bin/sh

# This script replaces the hardcoded API URL in the built JavaScript files
# with the one from the environment variable

# Find all JS files in the build directory
find /usr/share/nginx/html -name "*.js" -type f -exec sed -i 's|https://todo-m8gg.onrender.com/api|https://todo-backend.ashysea-f735d8f2.eastus.azurecontainerapps.io/api|g' {} \;

echo "API URL replaced successfully in all JS files."

# Start nginx
exec "$@" 