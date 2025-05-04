const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Swagger definition
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Todo API',
      version: '1.0.0',
      description: 'A REST API for Todo management',
      contact: {
        name: 'API Support',
      },
    },
    servers: [
      {
        url: 'http://localhost:5001',
        description: 'Development server',
      },
      {
        url: 'https://todo-m8gg.onrender.com',
        description: 'Production server',
      },
      {
        url: 'https://todo-backend.ashysea-f735d8f2.eastus.azurecontainerapps.io',
        description: 'Azure server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Enter JWT token in the format: "Bearer your-token"'
        },
      },
    },
    // We're removing the global security to make it explicit on each endpoint
  },
  apis: ['./routes/*.js', './models/*.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

// Setup custom options for swagger UI to show a better auth dialog
const swaggerUiOptions = {
  explorer: true,
  swaggerOptions: {
    persistAuthorization: true,
    displayRequestDuration: true,
    docExpansion: 'list', 
    filter: true,
    showExtensions: true,
    supportedSubmitMethods: ['get', 'post', 'put', 'delete', 'patch'],
    tagsSorter: 'alpha',
    validatorUrl: null,
  }
};

module.exports = {
  swaggerUi,
  swaggerDocs,
  swaggerUiOptions
}; 