import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // Porta padrão do Vite (mude se necessário)
  },
  build: {
    target: 'esnext', // Usa a versão mais moderna do JS
    sourcemap: true, // Mantém sourcemaps para debug no ambiente de desenvolvimento
  },
});
