import request from 'supertest';
import { app } from '../app';

describe('Listar Tarefas', () => {
  it('deve listar tarefas de um usuário autenticado', async () => {
    const usuario = {
      email: 'teste@gmail.com',
      senha: '123456',
    };

    const responseLogin = await request(app).post('/auth').send(usuario);

    expect(responseLogin.statusCode).toBe(200);
    expect(responseLogin.body).toHaveProperty('token');

    const responseListarTarefas = await request(app)
      .post('/listar-tarefas')
      .send({ usuarioId: responseLogin.body.id });

    expect(responseListarTarefas.statusCode).toBe(200);
    expect(Array.isArray(responseListarTarefas.body)).toBe(true);
  });
});
