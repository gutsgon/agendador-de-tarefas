import { Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';

export const auth = async (request: Request, response: Response, next: NextFunction) => {

    // Pegando o token 
    const authHeader = request.headers.authorization;

    // Tratando erro
    if(!authHeader){
        response.status(401).json({ error: 'Token não fornecido' });
        return;
    }

    // Tirando o "Bearer", e pegando apenas o token
    const [, token] = authHeader.split(' ');

    // Verificando se o token é válido
    try {
        jwt.verify(token, process.env.APP_SECRET as string);
        next()
    } catch (error) {
        response.status(401).json({ error: 'Token inválido' });
        return;
    }


}

export const authAdmin = async (request: Request, response: Response, next: NextFunction) => {

    // Pegando o token 
    const authHeader = request.headers.authorization;

    // Tratando erro
    if(!authHeader){
        response.status(401).json({ error: 'Token não fornecido' });
        return;
    }

    // Tirando o "Bearer", e pegando apenas o token
    const [, token] = authHeader.split(' ');

    // Verificando se o token é válido
    try {
        const tokenDecodificado = jwt.verify(token, process.env.APP_SECRET as string) as { id: string, admin: boolean};
        if (!tokenDecodificado.admin) {
            response.status(403).json({ error: 'Acesso negado: apenas administradores' });
            return;
        }
        next()
    } catch (error) {
        response.status(401).json({ error: 'Token inválido' });
        return;
    }


}

