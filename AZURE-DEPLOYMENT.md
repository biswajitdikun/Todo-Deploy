# Azure Deployment Guide for Todo Application

This guide provides step-by-step instructions for deploying the Todo application to Azure using both Azure CLI and Azure Portal UI.

## Prerequisites

- Azure account with an active subscription
- Azure CLI installed
- Docker installed
- Git installed
- Node.js and npm installed

## Deployment Methods

You can deploy the application using either:
1. Azure CLI (Command Line Interface)
2. Azure Portal (Web UI)

## 1. Azure CLI Deployment

### Step 1: Login to Azure
```bash
az login
```

### Step 2: Set the subscription
```bash
az account set --subscription "YOUR_SUBSCRIPTION_ID"
```

### Step 3: Create a resource group
```bash
az group create --name todo-app-rg --location eastus
```

### Step 4: Create Azure Container Registry (ACR)
```bash
az acr create --resource-group todo-app-rg --name todoappregistry123 --sku Basic --admin-enabled true
```

### Step 5: Login to ACR
```bash
az acr login --name todoappregistry123
```

### Step 6: Get ACR credentials
```bash
az acr credential show --name todoappregistry123 --query "passwords[0].value" -o tsv
```
<!-- The ACR password will be displayed here -->

### Step 7: Build and push backend image
```bash
# Build with correct platform
docker build --platform linux/amd64 -t todoappregistry123.azurecr.io/todo-backend:latest ./backend

# Push to ACR
docker push todoappregistry123.azurecr.io/todo-backend:latest
```

### Step 8: Build and push frontend image
```bash
# Build with correct platform and API URL
docker build --platform linux/amd64 --build-arg VITE_API_URL=https://todo-backend.ashysea-f735d8f2.eastus.azurecontainerapps.io -t todoappregistry123.azurecr.io/todo-frontend:latest ./frontend

# Push to ACR
docker push todoappregistry123.azurecr.io/todo-frontend:latest
```

### Step 9: Create Log Analytics workspace
```bash
az monitor log-analytics workspace create --resource-group todo-app-rg --workspace-name todo-app-logs
```
Check Logs : 
```bash
   az containerapp logs show --name todo-frontend --resource-group todo-app-rg --follow
   ```

### Step 10: Create Container App environment
```bash
az containerapp env create --name todo-app-env --resource-group todo-app-rg --location eastus --logs-workspace-id $(az monitor log-analytics workspace show --resource-group todo-app-rg --workspace-name todo-app-logs --query customerId -o tsv)
```

### Step 11: Create backend container app
```bash
az containerapp create --name todo-backend --resource-group todo-app-rg --environment todo-app-env --image todoappregistry123.azurecr.io/todo-backend:latest --target-port 5001 --ingress external --registry-server todoappregistry123.azurecr.io --registry-username todoappregistry123 --registry-password "YOUR_ACR_PASSWORD" --env-vars NODE_ENV=production PORT=5001
```

### Step 12: Create frontend container app
```bash
az containerapp create --name todo-frontend --resource-group todo-app-rg --environment todo-app-env --image todoappregistry123.azurecr.io/todo-frontend:latest --target-port 80 --ingress external --registry-server todoappregistry123.azurecr.io --registry-username todoappregistry123 --registry-password "YOUR_ACR_PASSWORD"
```

## 2. Azure Portal Deployment

### Step 1: Create Resource Group
1. Go to Azure Portal (portal.azure.com)
2. Click "Create a resource"
3. Search for "Resource group"
4. Click "Create"
5. Name: `todo-app-rg`
6. Region: East US
7. Click "Review + create" then "Create"

### Step 2: Create Container Registry
1. Go to Azure Portal
2. Click "Create a resource"
3. Search for "Container Registry"
4. Click "Create"
5. Resource group: `todo-app-rg`
6. Registry name: `todoappregistry123`
7. Location: East US
8. SKU: Basic
9. Enable admin user: Yes
10. Click "Review + create" then "Create"

### Step 3: Create Log Analytics Workspace
1. Go to Azure Portal
2. Click "Create a resource"
3. Search for "Log Analytics workspace"
4. Click "Create"
5. Resource group: `todo-app-rg`
6. Name: `todo-app-logs`
7. Region: East US
8. Click "Review + create" then "Create"

### Step 4: Create Container Apps Environment
1. Go to Azure Portal
2. Click "Create a resource"
3. Search for "Container Apps"
4. Click "Create"
5. Resource group: `todo-app-rg`
6. Environment name: `todo-app-env`
7. Region: East US
8. Log Analytics workspace: `todo-app-logs`
9. Click "Review + create" then "Create"

### Step 5: Create Backend Container App
1. In the Container Apps Environment
2. Click "Create container app"
3. Name: `todo-backend`
4. Container image: `todoappregistry123.azurecr.io/todo-backend:latest`
5. Registry credentials:
   - Server: `todoappregistry123.azurecr.io`
   - Username: `todoappregistry123`
   - Password: (from ACR credentials)
6. Ingress: External
7. Target port: 5001
8. Environment variables:
   - NODE_ENV: production
   - PORT: 5001
9. Click "Create"

### Step 6: Create Frontend Container App
1. In the Container Apps Environment
2. Click "Create container app"
3. Name: `todo-frontend`
4. Container image: `todoappregistry123.azurecr.io/todo-frontend:latest`
5. Registry credentials:
   - Server: `todoappregistry123.azurecr.io`
   - Username: `todoappregistry123`
   - Password: (from ACR credentials)
6. Ingress: External
7. Target port: 80
8. Click "Create"

### Step 7: Push Docker Images to ACR
1. In the Container Registry
2. Go to "Repositories"
3. Click "Push" for each image
4. Use Docker commands to build and push images:
   ```bash
   # For backend
   docker build --platform linux/amd64 -t todoappregistry123.azurecr.io/todo-backend:latest ./backend
   docker push todoappregistry123.azurecr.io/todo-backend:latest

   # For frontend
   docker build --platform linux/amd64 --build-arg VITE_API_URL=https://todo-backend.ashysea-f735d8f2.eastus.azurecontainerapps.io -t todoappregistry123.azurecr.io/todo-frontend:latest ./frontend
   docker push todoappregistry123.azurecr.io/todo-frontend:latest
   ```

## Accessing the Application

After successful deployment, you can access your application at:
- Frontend: https://todo-frontend.ashysea-f735d8f2.eastus.azurecontainerapps.io/
- Backend: https://todo-backend.ashysea-f735d8f2.eastus.azurecontainerapps.io/

Note: The actual URLs will be different in your deployment, as they include a unique identifier for your Container Apps environment.

## Troubleshooting

1. **Image Build Issues**
   - Ensure you're using the correct platform (linux/amd64)
   - Check Dockerfile syntax
   - Verify all dependencies are properly installed

2. **Container App Deployment Issues**
   - Verify ACR credentials
   - Check environment variables
   - Ensure correct port mappings

3. **Application Access Issues**
   - Verify ingress settings
   - Check container app logs
   - Ensure proper network configuration

4. **Restarting Services in Azure Portal**
   To restart a service (backend or frontend) in Azure Portal:
   1. Go to Azure Portal (portal.azure.com)
   2. Navigate to your Container App (either todo-backend or todo-frontend)
   3. In the left menu, click on "Revisions and replicas"
   4. In the Active revisions tab, find your revision
   5. Click "View details" in the Running status column
   6. Click "Show Logs" to check if there are any issues
   7. To restart:
      - Click "Refresh" button in the top menu to restart the service
      - Or create a new revision using "Create new revision" button if a refresh doesn't resolve the issue

   Note: 
   - The service status and number of replicas are shown in the table
   - You can monitor the restart progress in the "Running status" column
   - The traffic percentage and replica count are visible in the rightmost columns
   - If issues persist after restart, check the logs using "Show Logs" option

## Cleanup

To remove all resources and avoid unnecessary charges:

```bash
az group delete --name todo-app-rg --yes
```

## Additional Resources

- [Azure Container Apps Documentation](https://docs.microsoft.com/en-us/azure/container-apps/)
- [Azure Container Registry Documentation](https://docs.microsoft.com/en-us/azure/container-registry/)
- [Azure CLI Documentation](https://docs.microsoft.com/en-us/cli/azure/) 