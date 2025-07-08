import request from 'supertest';
import { app } from '../app';
import { DateTime } from 'luxon';

// Descrição do teste de integração
describe('CreateAndListTarefas', () =>{
    it('cadastra e lista tarefas', async () => {        
        // JSON usuário
        const usuario = {
            email: 'teste@gmail.com',
            senha: '123456'
        }

        // Requisição para autenticação do usuário
        const responseLogin = await request(app).post('/auth').send(usuario)

        // Verificação se a API retornou o status e token
        expect(responseLogin.statusCode).toBe(200);
        expect(responseLogin.body).toHaveProperty('token');

        // Após isso a listagem de tarefas está disponível, pois necessita do id
        // Requisição para listar tarefas do usuário autenticado
        const responseListarTarefas = await request(app).post('/listar-tarefas').send({usuarioId: responseLogin.body.id})
        expect(responseListarTarefas.statusCode).toBe(200);
        // Verifica se o retorno é um array não vazio
        expect(responseListarTarefas.body.length).toBeGreaterThan(0);


        const data = DateTime.now().setZone('America/Sao_Paulo').plus({minutes: 5, seconds: 10}).toUTC().toISO();

        // Usa o formato ISO para ser aceito pela API
        const tarefa = {
            titulo: 'Ir na entrevista com Gestor da JetSales',
            descricao: 'Ir bem na entrevista, e mostrar que é o melhor candidato',
            horarioExecucao: data,
            usuarioId: '2d941301-21ba-4931-a68a-cd3f4199ba86'
        }

        // Adicionando Token no cabeçalho da requisição
        const responseCadastrarTarefa = await request(app).post('/cadastrar-tarefa').set('Authorization', `Bearer ${responseLogin.body.token}`).send(tarefa)
        expect(responseCadastrarTarefa.statusCode).toBe(201);
        expect(responseCadastrarTarefa.body).toHaveProperty('titulo');
    });
})