import { Request, Response} from 'express';
import { PrismaClient} from '../database/generated/prisma';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import validator from 'validator';
import { agendarNotificacao } from '../queues/tarefasProducer';

// Instância do Banco de Dados
export const prisma = new PrismaClient();

// Cria um novo usuário
export const createUsuario = async (request: Request, response: Response) => {
    try{

        const { nome, email, senha } = request.body;

        //Verificando se o email é válido
        if(!validator.isEmail(email)){
            response.status(400).json({ error: 'Email inválido' });
            return;
        }

        // Verificando se o usuário já existe
        const usuarioExistente = await prisma.usuario.findFirst({
            where: {
                email: email
            }
        })
        
        // Tratando erro
        if(usuarioExistente){
            response.status(400).json({ error: 'Usuário já cadastrado' });
            return;
        }

        // Criptografando a senha
        const senhaCriptografada = await bcrypt.hash(senha, 8);
        
        
        // Criando usuário
        const usuario = await prisma.usuario.create({
            data: {
                nome,
                email,
                senha: senhaCriptografada,
            }
        });
        
        // Retorna o usuário criado
        response.status(201).json(usuario)
        return;

    }catch(error){
        response.status(400).json({ message: 'Erro ao criar o usuário'})
        console.log(error)
        return;
    }
}

// Faz o Login do usuário
export const loginUsuario = async (request: Request, response: Response) => {
    try {

        const { email, senha } = request.body;

        // Verificando se o usuário existe
        const usuario = await prisma.usuario.findFirst({
            where:{
                email: email
            }
        })

        //Verificando se a senha está correta
        if(usuario){
            if(await bcrypt.compare(senha, usuario.senha)){

                const token = jwt.sign({ id: usuario.id, admin: usuario.admin }, process.env.APP_SECRET as string, { expiresIn: '1h' });

                const data = {
                    id: usuario.id,
                    nome: usuario.nome,
                    email: usuario.email,
                    token: token,
                    sucess: true
                }

                response.status(200).json(data);
                return;
            }else{
                response.status(400).json({ error: 'Usuário não encontrado' });
                return;
            }
        }else{
            response.status(404).json({ error: 'Usuário não encontrado' });
            return;
        }
    } catch (error) {
        response.status(400).json({ message: 'Erro ao fazer login'});
        return;
    }
}

// Cria uma nova tarefa
export const createTarefa = async (request: Request, response: Response) => {
    try{

        const {titulo, descricao, horarioExecucao, usuarioId} = request.body

        // Verificando se o usuário existe
        if(!await prisma.usuario.findFirst({
            where:{
                id: usuarioId
            }
        })){ 
            response.status(404).json({ error: 'Usuário não encontrado' });
            return;
        }
        //Verificando se o horario é válido
        if(!validator.isISO8601(horarioExecucao)){
            response.status(400).json({ error: 'Horário em formato inválido' });
            return;
        }

        // Verificando se a tarefa é válida
        if(horarioExecucao < new Date()){
            response.status(400).json({ error: 'Horário de execução inválido' });
            return;
        }

        // Criando a tarefa
        const novaTarefa = await prisma.tarefas.create({
            data: {
                titulo: titulo,
                descricao: descricao,
                horarioExecucao: horarioExecucao,
                usuario: {
                    connect: { id: usuarioId }
                }
            }
        });

        // Adicionando notificação a fila
        agendarNotificacao(novaTarefa)


        // Retorna a tarefa criada
        response.status(201).json(novaTarefa);
        return;

    }catch(error){
        response.status(400).json({ message: 'Erro ao criar tarefa'});
        return;
    }
}

// Lista todas as tarefas do usuário
export const getAllTarefas = async (request: Request, response: Response) => {
    try{

        // Verificando se o usuário existe
        if(!await prisma.usuario.findFirst({
            where:{
                id: request.body.usuarioId
            }
        })){ 
            response.status(404).json({ error: 'Usuário não encontrado' });
            return;
        }

        // Encontrando as tarefas do usuário
        const tarefas = await prisma.tarefas.findMany({
            where:{
                usuarioId: request.body.usuarioId
            }
        })

        // Retorna as tarefas do usuário
        response.status(200).json(tarefas);
        return;

    }catch(error){
        response.status(400).json({ message: 'Erro ao buscar tarefas'});
        return;
    }
}






