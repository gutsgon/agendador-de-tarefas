import { Worker } from 'bullmq';
import { connection } from './tarefasQueue';

// criando worker que vai executar a requisição ao webhook
export const taskWorker = new Worker(
  'NotificacaoQueue',
  async (job) => {
    if (job.name === 'notificarTarefa') {
      const { titulo, horarioExecucao, usuarioId, descricao} = job.data;

      // Fazendo requisição ao endpoint
      try {
        const response = await fetch('http://localhost:3333/notificacao', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json'},
          body: JSON.stringify({
            titulo,
            horarioExecucao,
            usuarioId,
            descricao, 
          }),
        });

        const result = await response.json();

        console.log(`Webhook executado com sucesso:`, result);
      } catch (error) {
        console.error('Erro ao executar webhook', error);
      }
    }
  },
  { connection }
);
