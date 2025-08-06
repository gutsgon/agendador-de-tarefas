import request from 'supertest';
import { app } from '../app';
import { DateTime } from 'luxon';

describe('Cadastrar Tarefa', () => {
  it('deve cadastrar uma tarefa com sucesso', async () => {
    const usuario = {
      email: 'teste@gmail.com',
      senha: '123456',
    };

    const responseLogin = await request(app).post('/auth').send(usuario);

    expect(responseLogin.statusCode).toBe(200);
    expect(responseLogin.body).toHaveProperty('token');

    const data = DateTime.now()
      .setZone('America/Sao_Paulo')
      .plus({ minutes: 5, seconds: 10 })
      .toUTC()
      .toISO();

    const tarefa = {
      titulo: 'Ir na entrevista com Gestor da JetSales',
      descricao: 'Ir bem na entrevista, e mostrar que é o melhor candidato',
      horarioExecucao: data,
      usuarioId: responseLogin.body.id, // Usa o id retornado do login
    };

    const responseCadastrarTarefa = await request(app)
      .post('/cadastrar-tarefa')
      .set('Authorization', `Bearer ${responseLogin.body.token}`)
      .send(tarefa);

    expect(responseCadastrarTarefa.statusCode).toBe(201);
    expect(responseCadastrarTarefa.body).toHaveProperty('titulo');
  });
});
