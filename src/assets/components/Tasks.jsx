import { Pencil, TrashIcon, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";

function Tasks({ tasks, onTaskClick, onDeleteTaskClick, onOpenModal }) {
  const navigate = useNavigate();

  function onSeeDatailsClick(task) {
    const query = new URLSearchParams(); // Para trazer mais confiança na construção da URL
    query.set("title", task.title); // Adiciona o título da tarefa como parâmetro de consulta
    query.set("description", task.description); // Adiciona a descrição da tarefa como parâmetro de consulta
    navigate(`/tasks?${query.toString()}`); // Navega para a página de detalhes da tarefa com os parâmetros de consulta;
  }
  return (
    // Container da lista de tarefas: card branco translúcido para garantir
    // contraste com o fundo em gradiente e manter consistência com o card
    // de adição de tarefas.
    <ul className="space-y-4 p-6 bg-white bg-opacity-90 rounded-md shadow">
      {tasks.map((task) => (
        <li key={task.id} className="flex gap-2">
          {/* Botão com o título da tarefa: usamos texto escuro no card branco
              para legibilidade; `truncate` evita que o título quebre a linha. */}
          <button
            onClick={() => onTaskClick(task.id)}
            title={task.title}
            className={`text-left w-full p-2 rounded-md truncate ${
              task.isCompleted
                ? "line-through text-gray-400"
                : "bg-gray-100 text-gray-900"
            }`}
          >
            {task.title}
          </button>
          {/* Botões de ação: cores para diferenciar das tarefas (editar/excluir).
              O botão de editar abre o modal de edição (sem navegação). */}
          <Button
            onClick={() => onOpenModal("edit", task)}
            className="bg-orange-600 text-white p-2"
          >
            <Pencil />
          </Button>
          {/* Botão de ver detalhes: navega para a rota /tasks com parâmetros */}
          <Button
            onClick={() => onSeeDatailsClick(task)}
            className="bg-orange-600 text-white p-2"
          >
            <ChevronRight />
          </Button>
          {/* Botão de excluir: abre modal de confirmação (em-app). */}
          <Button
            onClick={() => onOpenModal("confirm", task)}
            className="bg-red-500 text-white p-2"
          >
            <TrashIcon />
          </Button>
        </li>
      ))}
    </ul>
  );
}

export default Tasks;
