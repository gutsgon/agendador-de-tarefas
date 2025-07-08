import validator from 'validator';
import { Request, Response} from 'express';
import { prisma } from '../controllers/userController'

// Envia notificação de tarefa
export const notificacao = async (request: Request, response: Response) => {
    try{

        //Verificando se a tarefa existe
       const tarefa = await prisma.tarefas.findFirst({
            where: {
                titulo: request.body.titulo,
                usuarioId: request.body.usuarioId
            }
       });

        // Verificando se o horario é válido
        if(!validator.isISO8601(request.body.horarioExecucao)){
            response.status(400).json({ error: 'Horário em formato inválido' });
            return;
        }

        // Verificando se a tarefa é válida
        if(request.body.horarioExecucao < new Date()){
            response.status(400).json({ error: 'Horário de execução inválido' });
            return;
        }
        
        if(tarefa){
        response.status(200).json({ message: 'Faltam 5 minutos para sua tarefa: '+ tarefa.titulo + ' ser executada.'});
        return;
        }

    }catch(error){
        response.status(400).json({ message: 'Erro ao enviar webhook'});
        return;
    }
}