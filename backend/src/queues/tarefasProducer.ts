// src/queues/taskProducer.ts
import { tarefaQueue } from './tarefasQueue';

// Criação do Job de notificação
export async function agendarNotificacao(tarefa: {usuarioId: string; titulo: string; descricao: string | null; horarioExecucao: Date;}) {
  const execucao = new Date(tarefa.horarioExecucao).getTime();
  const agora = Date.now();
  const delay = execucao - agora - 5 * 60 * 1000; // 5 minutos antes
  if (delay > 0) {
    await tarefaQueue.add('notificarTarefa', {
      usuarioId: tarefa.usuarioId,
      titulo: tarefa.titulo,
      descricao: tarefa.descricao,
      horarioExecucao: tarefa.horarioExecucao
    }, {
      delay,
      attempts: 3,
    });

    console.log(`Notificação da tarefa "${tarefa.titulo}" agendada para ${delay / 1000}s`);
  } else {
    console.log(`Tarefa "${tarefa.titulo}" já passou ou está muito próxima, sem notificação.`);
  }
}
