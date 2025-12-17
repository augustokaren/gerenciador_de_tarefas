import { useState } from "react";
import Input from "./input.jsx";

function AddTask({ onAddTaskSubmit, notify }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  return (
    // AddTask card: white/translucent card to contrast with the page gradient.
    <div className="space-y-4 p-6 bg-white bg-opacity-90 rounded-md shadow flex flex-col ">
      <Input
        type="text"
        placeholder="Digite o título da tarefa"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />

      <Input
        type="text"
        placeholder="Digite a descrição da tarefa"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
      />
      <button
        onClick={() => {
          // validação: usar toast via prop `notify` em vez de alert
          if (!title.trim() || !description.trim()) {
            if (typeof notify === "function") {
              notify("Por favor, preencha todos os campos.", "error");
            }
            return;
          }
          onAddTaskSubmit(title, description);
          setTitle(""); // Limpa o campo de título após adicionar a tarefa
          setDescription(""); // Limpa o campo de descrição após adicionar a tarefa
        }}
        // Primary action button styled orange to match the theme and
        // indicate the main call-to-action.
        className="bg-orange-600 text-white px-4 py-2 rounded-md font-medium"
      >
        Adicionar
      </button>
    </div>
  );
}

export default AddTask;
