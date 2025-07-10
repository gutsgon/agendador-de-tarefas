import { useState } from 'react';

const url = 'http://localhost:3333'; // URL da API

export function authService() {
  const [authLoading, setAuthLoading] = useState(false);

  const login = async (formData: FormData): Promise<boolean> => {
    setAuthLoading(true);
    try {
      const response = await fetch(`${url}/auth`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const resultado = await response.json();

      if (resultado.token && resultado.id) {
        localStorage.setItem(
          'auth',
          JSON.stringify({ token: resultado.token, usuarioId: resultado.id })
        );
        return true;
      } else {
        console.warn('Login falhou:', resultado);
        return false;
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
      return false;
    } finally {
      setAuthLoading(false);
    }
  };

  const signup = async (formData: FormData): Promise<boolean> => {
    try {
      const response = await fetch(`${url}/cadastrar-usuario`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const resultado = await response.json()

      if(resultado){
        return true;
      }

      return resultado.sucess === true
    } catch (error) {
      console.error('Erro ao cadastrar:', error);
      return false;
    }
  };

  return { login, signup, authLoading };
}
