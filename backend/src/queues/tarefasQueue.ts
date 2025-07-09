import { Queue } from 'bullmq';
import IORedis from 'ioredis';

// conexão do redis
export const connection = new IORedis({host: 'redis', port: 6379, maxRetriesPerRequest: null});

// Criação da fila para notificações
export const tarefaQueue = new Queue('NotificacaoQueue', {connection});
