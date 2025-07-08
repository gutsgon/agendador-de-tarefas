import { Router, Request, Response} from 'express';
import { createUsuario, createTarefa, getAllTarefas, loginUsuario} from '../controllers/userController';
import { notificacao } from '../webhooks/notificacaoWebhook';
import { auth, authAdmin } from '../middlewares/auth';

// Instância do Router
const routes = Router();

// Rota raiz
routes.get('/', (request: Request, response: Response) => {
    response.json({message: 'Bem-vindo ao Agendador de Tarefas!'});
});

// Rota de Login de Usuário
// Requer campos: email e senha
routes.post('/auth', loginUsuario)

// Rota de Listagem de Tarefas
// Requer campo: usuarioId
routes.post('/listar-tarefas', getAllTarefas);

// Rota do Webhook de Notificação
// Requer campo: titulo, descricao(opcional), data e hora, usuarioId
routes.post('/notificacao', notificacao);

// Exige autenticação para as próximas rotas 
routes.use(auth)

// Rota de Cadastro de Tarefas
// Requer campos: titulo, descricao(opcional), data e hora, usuarioId
routes.post('/cadastrar-tarefa', createTarefa);

// Rota de Cadastro de Usuário
// Requer campos: nome, email, senha
routes.post('/cadastrar-usuario', authAdmin, createUsuario);


export default routes;