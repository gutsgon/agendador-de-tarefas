import { app } from "./app";
import "./queues/tarefasWorker"; 

// Configuração do servidor
const host = 'localhost';
const port = 3333;

app.listen(port, () => {
    console.log(`Servidor rodando em http://${host}:${port}`);
})
