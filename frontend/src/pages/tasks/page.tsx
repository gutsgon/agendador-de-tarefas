import { useEffect, useState } from 'react';
import { CardTarefa, type TarefaProps } from '../../components/cardTarefa/cardTarefa';
import { Button, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { tasksService } from '../../services/tasks';
import styles from './page.module.css';

export function Tarefas() {
  // Lista de Tarefas
  const [tarefas, setTarefas] = useState<TarefaProps[]>([]);

  // Estado para controlar modo cadastro
  const [modoCadastro, setModoCadastro] = useState(false);

  // Estado para os dados do formulário de tarefa
  const [formData, setFormData] = useState({
    titulo: '',
    descricao: '',
    horarioExecucao: new Date(),
  });

  // Navegador
  const navigate = useNavigate();

  // Serviços de tarefa
  const { listarTarefas, cadastrarTarefas } = tasksService();

  function handlerBack() {
    navigate('/');
  }

  // Busca tarefas do usuário
  useEffect(() => {
    const buscarTarefas = async () => {
      const usuarioIdData = localStorage.getItem('auth');
      if (usuarioIdData) {
        const usuarioId = JSON.parse(usuarioIdData).usuarioId;
        const dados = await listarTarefas(usuarioId);
        setTarefas(dados);
      }
    };

    buscarTarefas();
  }, []);

  // Atualizar dados do formulário
  const handleChangeFormData = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Envia formulário do cadastro
  const handleSubmitForm = async (e: any) => {
    e.preventDefault();

    // Validar dados mínimos (pode melhorar)
    if (!formData.titulo || !formData.horarioExecucao) {
      alert('Título e horário são obrigatórios');
      return;
    }

    // Pegando id do usuario
    const usuarioIdData = localStorage.getItem('auth');
    if (!usuarioIdData) {
      alert('Usuário não autenticado');
      return;
    }

    const usuarioId = JSON.parse(usuarioIdData).usuarioId;

    // Preparar dados para cadastro
    const tarefaParaCadastrar = {
      titulo: formData.titulo,
      descricao: formData.descricao,
      horarioExecucao: new Date(formData.horarioExecucao).toISOString(),
      usuarioId
    };

    console.log(tarefaParaCadastrar)

    const sucesso = await cadastrarTarefas(tarefaParaCadastrar);

    if (sucesso) {
      // Atualiza lista de tarefas
      const dadosAtualizados = await listarTarefas(usuarioId);
      setTarefas(dadosAtualizados);

      // Fecha formulário e limpa dados
      setModoCadastro(false);
      setFormData({ titulo: '', descricao: '', horarioExecucao: new Date() });
    } else {
      alert('Erro ao cadastrar tarefa');
    }
  };

  return (
    <>
      {/* Botão para voltar ao login */}
      <Button onClick={handlerBack} className={styles.btnVoltar}>
        Voltar
      </Button>

      {/* Botão para cadastrar tarefa */}
      {!modoCadastro && (
        <Button onClick={() => setModoCadastro(true)} className={styles.btnVoltar}>
          Nova Tarefa
        </Button>
      )}

      <h1 className={styles.titulo}>Minhas Tarefas</h1>

      {/* Verifica o estado da página e exibe o compatível*/}
      {modoCadastro ? (
        <form onSubmit={handleSubmitForm} className={styles.formCadastro}>
          <TextField
            required
            label="Título"
            name="titulo"
            value={formData.titulo}
            onChange={handleChangeFormData}
            fullWidth
            margin="normal"
          />

          <TextField
            label="Descrição"
            name="descricao"
            value={formData.descricao}
            onChange={handleChangeFormData}
            fullWidth
            margin="normal"
            multiline
            rows={3}
          />

          <TextField
            required
            label="Horário de Execução"
            name="horarioExecucao"
            type="datetime-local"
            value={formData.horarioExecucao}
            onChange={handleChangeFormData}
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            style={{width: '250px'}}
          />

          {/* Botão de cadastro */}
          <Button type="submit" variant="contained" color="primary" style={{ marginRight: '8px' }}>
            Cadastrar
          </Button>

          {/* Botão de cancelar a ação e retorna a listagem de tarefas */}
          <Button type="button" variant="outlined" onClick={() => setModoCadastro(false)}>
            Cancelar
          </Button>
        </form>
      ) : (
        <div className={styles.tarefasContainer}>
          {tarefas.length > 0 ? (
            tarefas.map((tarefa) => (
              <CardTarefa
                key={tarefa.id}
                titulo={tarefa.titulo}
                descricao={tarefa.descricao}
                horarioExecucao={new Date(tarefa.horarioExecucao)}
              />
            ))
          ) : (
            <p className={styles.mensagemVazia}>Nenhuma tarefa encontrada</p>
          )}
        </div>
      )}
    </>
  );
}
