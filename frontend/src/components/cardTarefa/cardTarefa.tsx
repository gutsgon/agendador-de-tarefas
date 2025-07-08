export type TarefaProps = {
  id?: string;
  titulo: string;
  descricao?: string;
  horarioExecucao: Date;
};

import styles from './cardTarefa.module.css'

export const CardTarefa = ({ titulo, descricao, horarioExecucao }: TarefaProps) => {

  // Formatando data para a do Brasil
  const data = new Intl.DateTimeFormat('pt-BR', {
    timeZone: 'America/Sao_Paulo',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(horarioExecucao);

  const hora = new Intl.DateTimeFormat('pt-BR', {
    timeZone: 'America/Sao_Paulo',
    hour: '2-digit',
    minute: '2-digit',
  }).format(horarioExecucao);

  return (
    <div className={styles.cardTarefa}>
      <h2>{titulo}</h2>
      <p>
        <strong>Descrição:</strong> {descricao || 'Sem descrição'}
      </p>
      <p>
        <strong>Data:</strong> {data}
      </p>
      <p>
        <strong>Hora:</strong> {hora}
      </p>
    </div>
  );
};
