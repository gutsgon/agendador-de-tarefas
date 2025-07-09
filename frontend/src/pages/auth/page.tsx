import { useState} from "react";
import { Button, TextField } from "@mui/material";
import style from './page.module.css'
import { authService } from "../../services/auth";
import { useNavigate } from "react-router-dom";

export function Auth(){
    // Estado do Login ou Registro
    const [formType, setFormType] = useState('login');

    // Estado dos dados do formulário
    const [formData, setFormData] = useState(Object);
    
    // Serviço de authenticação
    const { login, signup, authLoading } = authService();

    // Roteador
    const navigate = useNavigate()

    // Função para alternar entre Login e Registro
    const handleChangeFormType = () => {
        setFormData(null);
        if(formType === 'login'){
            setFormType('signup');
        }else{
            setFormType('login');
        }
    }

    // Função para leitura dos dados do formulário
    const handleChangeFormData = (e: any) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }
    
    // Função para enviar os dados do formulário
    const handleSubmitForm = async (e: any) => {
        e.preventDefault()

        switch(formType){
            case 'login':
                const flagLogin = await login(formData)
                if(flagLogin) navigate('/tarefas')
                break;
            case 'signup':
                const usuarioId = localStorage.getItem('auth')
                if(!usuarioId){
                    alert('Usuário não authenticado')
                    return;
                }
                if(formData.senha !== formData.confirmarSenha){
                    alert('As senhas não conferem');
                    return;
                }
                const flagSignup = await signup(formData)
                if(!flagSignup) {
                    alert('Permissão inválida')
                    return;
                }
                navigate('/tarefas')
            break;
        }
    }

    // Tempo de espera até a requisição de Login
    if(authLoading){
        return( 
            <h1>Carregando...</h1>
        )
    }

    // Formulário de Login
    if(formType === 'login'){
        return(
            <div className={style.authPageContainer}>      
                <h1>Login</h1>
                <button onClick={handleChangeFormType}>Não tem uma conta? Clique aqui</button>
                <form onSubmit={handleSubmitForm}>
                    <TextField
                    required
                    label="Email"
                    type="email"
                    name="email"
                    onChange={handleChangeFormData}
                    />

                    <TextField
                    required
                    label="Senha"
                    type="password"
                    name="senha"
                    onChange={handleChangeFormData}
                    />

                    <Button type="submit">Login</Button>
                </form>

            </div>
        )
    }

    // Formulário de Registro
    if(formType === 'signup'){
        return(
            <div className={style.authPageContainer}>      
                <h1>Signup</h1>
                <button onClick={handleChangeFormType}>Tem uma conta? Clique aqui</button>
                <form onSubmit={handleSubmitForm}>
                    <TextField
                    required
                    label="Nome"
                    type="name"
                    name="nome"
                    onChange={handleChangeFormData}
                    />

                    <TextField
                    required
                    label="Email"
                    type="email"
                    name="email"
                    onChange={handleChangeFormData}
                    />

                    <TextField
                    required
                    label="Senha"
                    type="password"
                    name="senha"
                    onChange={handleChangeFormData}
                    />

                    <TextField
                    required
                    label="Confirmar senha"
                    type="password"
                    name="confirmarSenha"
                    onChange={handleChangeFormData}
                    />

                    <Button type="submit">Signup</Button>
                </form>
            </div>
        )
    }
}