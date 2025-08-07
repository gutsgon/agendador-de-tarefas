import swaggerJSDoc from 'swagger-jsdoc';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Agendador de Tarefas API',
    version: '1.0.0',
    description: 'Documentação da API do Agendador de Tarefas',
  },
  servers: [
    {
      url: 'https://agendador-de-tarefas-production.up.railway.app',
description: 'Produção',
    },
    {
      url: 'http://localhost:3333',
description: 'Desenvolvimento'
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
  security: [
    {
      bearerAuth: [],
    },
  ],
};

export const swaggerSpec = swaggerJSDoc({
  swaggerDefinition,
  apis: ['./src/routes/**/*.ts'],
});
