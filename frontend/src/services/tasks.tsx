import type { TarefaProps } from "../components/cardTarefa/cardTarefa";


export function tasksService(){
    // URL da API
    const url = 'http://localhost:3333'

    // Fazendo requisição as tarefas do usuário
    const listarTarefas = async (usuarioId: string): Promise<TarefaProps[]> => {
    try {
      const response = await fetch(`${url}/listar-tarefas`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({ usuarioId }),
      });

      // Converte resposta para JSON
      const resultado = await response.json();

      // Verifica se retornou uma lista e converte para model
      if (Array.isArray(resultado)) {
        return resultado as TarefaProps[];
      } else {
        console.warn('Resposta inesperada:', resultado);
        return [];
      }
    } catch (error) {
      console.error('Erro ao buscar tarefas:', error);
      return [];
    }
  };

    // Fazendo requisição para cadastrar tarefas
    const cadastrarTarefas = async (formData: any): Promise<TarefaProps | null> => {
    try {
        const authData = localStorage.getItem('auth');
        if (!authData) {
        console.error('Usuário não autenticado');
        return null;
        }

        const token = JSON.parse(authData).token;
        console.log(formData)

        const response = await fetch(`${url}/cadastrar-tarefa`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
        });

        console.log(response)

        if (!response.ok) {
        const errorText = await response.text();
        console.error('Erro na requisição:', response.statusText, errorText);
        return null;
        }

        const resultado = await response.json();
        console.log(resultado)

        // Retornando tarefa cadastrada
        return resultado as TarefaProps;

    } catch (error) {
        console.error('Erro ao cadastrar tarefa:', error);
        return null;
    }
    };

    return { listarTarefas, cadastrarTarefas}
}