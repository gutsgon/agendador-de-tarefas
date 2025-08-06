import './config/env'
import express from 'express';
import cors from 'cors';
import routes from './routes/router'
import { swaggerSpec } from "./config/swagger";
import swaggerUi from 'swagger-ui-express'

// Inicialização e configuração da API
const app = express();
app.use(express.json());
app.use(cors());
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
app.use(routes)

export { app };