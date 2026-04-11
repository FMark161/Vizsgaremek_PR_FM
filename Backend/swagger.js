const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Harmónia Zeneiskola API',
      version: '1.0.0',
      description: 'A Harmónia Zeneiskola webalkalmazás REST API dokumentációja',
      contact: {
        name: 'Harmónia Zeneiskola',
        email: 'info@harmoniazeneiskola.hu'
      }
    },
    servers: [
      {
        url: 'http://localhost:5000/api',
        description: 'Fejlesztői szerver'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    },
    security: [
      {
        bearerAuth: []
      }
    ]
  },
  apis: ['./app/routes/*.js'], // A route fájlokban lesznek a Swagger annotációk
};

const swaggerSpec = swaggerJsdoc(options);

const setupSwagger = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log('Swagger dokumentáció elérhető: http://localhost:5000/api-docs');
};

module.exports = setupSwagger;