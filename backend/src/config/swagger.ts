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
      url: 'http://localhost:3333',
    },
  ],
};

export const swaggerSpec = swaggerJSDoc({
  swaggerDefinition,
  apis: ['./src/routes/**/*.ts'],
});
