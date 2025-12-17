import { ChevronLeftIcon } from "lucide-react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Title from "../assets/components/Title";
import Button from "../assets/components/Button";

function TaskPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams(); // Pega os parâmetros da URL
  const title = searchParams.get("title"); // Pega o valor do parâmetro "title"
  const description = searchParams.get("description"); // Pega o valor do parâmetro "description"
  return (
    // Mantém o mesmo estilo da página principal: fundo em gradiente e coluna
    // centralizada para consistência visual entre telas.
    <div className="w-screen min-h-screen bg-gradient-to-br from-orange-500 via-amber-400 to-yellow-300 flex justify-center p-6">
      <div className="w-[500px] space-y-4 ">
        <div className="flex justify-center relative">
          {/* Botão Voltar posicionado à esquerda; usa o componente Button
              compartilhado para manter estilo consistente. */}
          <Button
            onClick={() => navigate(-1)}
            className="absolute left-0 top-0 bottom-0 bg-slate-500 text-white p-2"
          >
            <ChevronLeftIcon />
          </Button>
          <Title>Detalhes da Tarefa</Title>
        </div>

        {/* Card de detalhes: branco translúcido para contraste com o gradiente */}
        <div className="bg-white bg-opacity-90 p-6 rounded-md shadow">
          <h2 className="text-xl font-semibold mb-2 text-gray-900">
            {title || "(sem título)"}
          </h2>
          <p className="text-sm text-gray-700">
            {description || "(sem descrição)"}
          </p>
        </div>
      </div>
    </div>
  );
}

export default TaskPage;
