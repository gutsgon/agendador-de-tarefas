import './config/env'
import express from 'express';
import cors from 'cors';
import routes from './routes/router'

// Inicialização e configuração da API
const app = express();
app.use(express.json());
app.use(cors());
app.use(routes)

export { app };