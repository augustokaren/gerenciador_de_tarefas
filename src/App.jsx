import { useEffect, useState } from "react";
import AddTask from "./assets/components/AddTask";
import Input from "./assets/components/Input";
import Tasks from "./assets/components/Tasks";
import { v4 } from "uuid";
import Title from "./assets/components/Title";
function App() {
  // Carrega as tarefas do localStorage para que os dados persistam após
  // recarregar a página. Se não houver nada salvo, usa uma lista padrão.
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("tasks")) || [
      //ARMAZENA AS TAREFAS NO LOCALSTORAGE ONDE O USUÁRIO NÃO PERDERÁ AS TAREFAS AO ATUALIZAR A PÁGINA
      {
        id: 1,
        title: "Estudar React",
        description: "Estudar React todos os dias às 09h",
        isCompleted: false, // Para indicar se a tarefa foi concluída ou não//}]);
      },
      {
        id: 2,
        title: "Fazer Exercícios",
        description: "Fazer exercícios físicos às 18h",
        isCompleted: false, // Para indicar se a tarefa foi concluída ou não
      },

      {
        id: 3,
        title: "Ler um Livro",
        description: "Ler um capítulo de um livro às 20h",
        isCompleted: false, // Para indicar se a tarefa foi concluída ou não
      },
    ]
  ); // State (Estado)

  // Persiste as tarefas no localStorage sempre que mudarem, garantindo que
  // o usuário não perca os dados ao atualizar a página.
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Carrega sugestões de tarefas de um arquivo JSON local em `public/`.
  // Substitui a API externa usada anteriormente; as sugestões estão em
  // português para facilitar o uso no app.
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    // Usar import.meta.env.BASE_URL para garantir que o caminho esteja
    // correto tanto em dev quanto em deploy (caso o app esteja em um
    // subpath). Também verificamos `res.ok` e logamos erros para facilitar
    // o diagnóstico quando o arquivo não for encontrado ou houver erro.
    const suggestionsUrl = `${import.meta.env.BASE_URL}suggestions.json`;
    fetch(suggestionsUrl)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => setSuggestions(data))
      .catch((err) => {
        console.error("Erro ao carregar sugestões:", err, suggestionsUrl);
        setSuggestions([]);
      });
  }, []); // carrega apenas uma vez quando o componente monta

  function onTaskClick(taskId) {
    // Função para lidar com o clique na tarefa
    const newTasks = tasks.map((task) => {
      // Cria um novo array de tarefas
      if (task.id === taskId) {
        // Verifica se é a tarefa clicada
        return { ...task, isCompleted: !task.isCompleted }; // Alterna o estado de conclusão da tarefa
      }

      // Não precisa alterar a tabela

      return task;
    });
    setTasks(newTasks); // Atualiza o estado da tarefa
  }

  function onDeleteTaskClick(taskId) {
    const newTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(newTasks);
  }

  function onAddTaskSubmit(title, description) {
    // Função para adicionar uma nova tarefa
    const newTask = {
      // Cria uma nova tarefa
      id: v4(), // Gera um novo ID para a tarefa usando a biblioteca uuid
      title,
      description,
      isCompleted: false,
    };
    setTasks([...tasks, newTask]); // Adiciona a nova tarefa ao estado
    // Notificação: informa ao usuário que a tarefa foi adicionada
    showNotification("Tarefa adicionada com sucesso", "success");
  }

  // Modal state for in-app confirm/delete and edit flows
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMode, setModalMode] = useState(null); // 'confirm' | 'edit'
  const [modalTask, setModalTask] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");

  function handleOpenModal(mode, task) {
    setModalMode(mode);
    setModalTask(task);
    if (mode === "edit") {
      setEditTitle(task.title || "");
      setEditDescription(task.description || "");
    }
    setModalVisible(true);
  }

  function handleCloseModal() {
    setModalVisible(false);
    setModalMode(null);
    setModalTask(null);
    setEditTitle("");
    setEditDescription("");
  }

  function handleConfirmDelete() {
    if (modalTask) {
      onDeleteTaskClick(modalTask.id);
    }
    handleCloseModal();
    // Notificação: confirma ao usuário que a tarefa foi excluída
    showNotification("Tarefa excluída com sucesso", "success");
  }

  function handleSaveEdit() {
    // validação substituída: mostra toast de erro em vez de alert
    if (!editTitle.trim() || !editDescription.trim()) {
      return showNotification(
        "Por favor, preencha os campos antes de salvar.",
        "error"
      );
    }
    const newTasks = tasks.map((t) =>
      t.id === modalTask.id
        ? { ...t, title: editTitle, description: editDescription }
        : t
    );
    setTasks(newTasks);
    handleCloseModal();
    // Notificação: informa que a edição foi salva
    showNotification("Tarefa atualizada com sucesso", "success");
  }

  // === Sistema simples de notificações (toasts) ===
  // Estado que guarda a notificação atual: { message, type }
  const [notification, setNotification] = useState(null);

  // Função para exibir uma notificação e removê-la automaticamente
  function showNotification(message, type = "success") {
    setNotification({ message, type });
  }

  // Sempre que `notification` muda, removemos após 3 segundos
  useEffect(() => {
    if (!notification) return;
    const id = setTimeout(() => setNotification(null), 3000);
    return () => clearTimeout(id);
  }, [notification]);

  return (
    // Usa um gradiente de fundo (laranja → amarelo). Substitui o fundo
    // anterior em slate para combinar com o novo tema visual.
    <div className="w-screen min-h-screen bg-gradient-to-br from-orange-500 via-amber-400 to-yellow-300 flex justify-center p-6">
      <div className="w-[500px] space-y-4 ">
        {/* Title component: kept as a small wrapper around an <h1> */}
        <Title>Gerenciador de Tarefas</Title>
        <AddTask onAddTaskSubmit={onAddTaskSubmit} notify={showNotification} />
        {/* Suggestions card: changed to white/translucent for contrast over
            the orange/yellow gradient and to match other cards. */}
        <div className="p-4 bg-white bg-opacity-90 rounded">
          <h2 className="text-xl font-semibold mb-2">Sugestões</h2>
          {suggestions.length === 0 ? (
            <p className="text-sm text-slate-700">Carregando sugestões...</p>
          ) : (
            <ul className="space-y-2">
              {suggestions.map((s, idx) => (
                <li key={idx} className="flex justify-between items-center">
                  <div>
                    <div className="font-medium">{s.title}</div>
                    <div className="text-sm text-slate-700">
                      {s.description}
                    </div>
                  </div>
                  {/* Add button for suggestions — use the orange primary color
                      to indicate primary action and match the rest of the UI. */}
                  <button
                    onClick={() => onAddTaskSubmit(s.title, s.description)}
                    className="bg-orange-600 text-white px-3 py-1 rounded"
                  >
                    Adicionar
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <Tasks
          tasks={tasks}
          onTaskClick={onTaskClick}
          onDeleteTaskClick={onDeleteTaskClick}
          onOpenModal={handleOpenModal}
        />
        {/* Passando o estado 'tasks' como props para o componente Tasks */}
      </div>
      {/* In-app modal for confirm/delete and edit (no navigation) */}
      {/* Notificação transitória (toast) exibida no canto inferior direito */}
      {notification && (
        <div
          className={`fixed right-6 bottom-6 z-50 px-4 py-2 rounded shadow text-white ${
            notification.type === "error" ? "bg-red-500" : "bg-green-600"
          }`}
        >
          {notification.message}
        </div>
      )}

      {modalVisible && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="w-[520px] max-w-[95%] bg-white rounded-md p-6 shadow-lg">
            {modalMode === "confirm" && (
              <div>
                <h3 className="text-lg font-semibold mb-4">
                  Tem certeza que deseja deletar a tarefa?
                </h3>
                <div className="flex gap-2 justify-end">
                  <button
                    onClick={handleCloseModal}
                    className="px-4 py-2 rounded bg-gray-200"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleConfirmDelete}
                    className="px-4 py-2 rounded bg-red-500 text-white"
                  >
                    Excluir
                  </button>
                  <button
                    onClick={() => handleOpenModal("edit", modalTask)}
                    className="px-4 py-2 rounded bg-orange-600 text-white"
                  >
                    Editar
                  </button>
                </div>
              </div>
            )}
            {modalMode === "edit" && (
              <div>
                <h3 className="text-lg font-semibold mb-4">Editar tarefa</h3>
                <div className="space-y-3">
                  {/* Usar componente Input para consistência visual e controle */}
                  <Input
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    placeholder="Título"
                  />
                  <Input
                    multiline
                    rows={4}
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                    placeholder="Descrição"
                  />
                </div>
                <div className="flex gap-2 justify-end mt-4">
                  <button
                    onClick={handleCloseModal}
                    className="px-4 py-2 rounded bg-gray-200"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleSaveEdit}
                    className="px-4 py-2 rounded bg-green-600 text-white"
                  >
                    Salvar
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
