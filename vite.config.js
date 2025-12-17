import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/gerenciador_de_tarefas/",
  plugins: [react()],
});
