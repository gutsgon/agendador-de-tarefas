import { Router, Request, Response} from 'express';
import { createUsuario, createTarefa, getAllTarefas, loginUsuario} from '../controllers/userController';
import { notificacao } from '../webhooks/notificacaoWebhook';
import { auth, authAdmin } from '../middlewares/auth';

// Instância do Router
const routes = Router();

// Rota raiz
/**
 * @openapi
 * /:
 *   get:
 *     summary: Rota raiz da API
 *     tags:
 *       - Sistema
 *     responses:
 *       200:
 *         description: Mensagem de boas-vindas
 */
routes.get('/', (request: Request, response: Response) => {
    response.json({message: 'Bem-vindo ao Agendador de Tarefas!'});
});

// Rota de Login de Usuário
// Requer campos: email e senha
/**
 * @openapi
 * /auth:
 *   post:
 *     summary: Login de usuário
 *     tags:
 *       - Autenticação
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               senha:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *       401:
 *         description: Credenciais inválidas
 */
routes.post('/auth', loginUsuario)

// Rota de Listagem de Tarefas
// Requer campo: usuarioId
/**
 * @openapi
 * /listar-tarefas:
 *   post:
 *     summary: Lista todas as tarefas do usuário
 *     tags:
 *       - Tarefas
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               usuarioId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Lista de tarefas retornada
 */
routes.post('/listar-tarefas', getAllTarefas);

// Rota do Webhook de Notificação
// Requer campo: titulo, descricao(opcional), data e hora, usuarioId
/**
 * @openapi
 * /notificacao:
 *   post:
 *     summary: Envia uma notificação via webhook
 *     tags:
 *       - Notificações
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *               descricao:
 *                 type: string
 *               horarioExecucao:
 *                 type: string
 *                 format: date-time
 *               usuarioId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Notificação agendada com sucesso
 */
routes.post('/notificacao', notificacao);

// Exige autenticação para as próximas rotas 

routes.use(auth)

// Rota de Cadastro de Tarefas
// Requer campos: titulo, descricao(opcional), data e hora, usuarioId
/**
 * @openapi
 * /cadastrar-tarefa:
 *   post:
 *     summary: Cadastra uma nova tarefa
 *     tags:
 *       - Tarefas
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *               descricao:
 *                 type: string
 *               horarioExecucao:
 *                 type: string
 *                 format: date-time
 *               usuarioId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Tarefa criada com sucesso
 *       400:
 *         description: Erro nos dados enviados
 */
routes.post('/cadastrar-tarefa', createTarefa);

// Rota de Cadastro de Usuário
// Requer campos: nome, email, senha
/**
 * @openapi
 * /cadastrar-usuario:
 *   post:
 *     summary: Cadastra um novo usuário (admin)
 *     tags:
 *       - Usuários
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               email:
 *                 type: string
 *               senha:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *       403:
 *         description: Acesso não autorizado
 */
routes.post('/cadastrar-usuario', authAdmin, createUsuario);


export default routes;