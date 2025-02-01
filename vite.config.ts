// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

// 🔧 Configuração do Vite
export default defineConfig({
  plugins: [react()], // ✅ Habilita suporte ao React com SWC (mais rápido que Babel)

  server: {
    port: 5173,               // ✅ Porta do servidor local
    open: true,               // ✅ Abre o navegador automaticamente ao iniciar o servidor
    strictPort: true,         // ✅ Garante que a porta não será alterada automaticamente se estiver ocupada
    watch: {
      usePolling: true,       // ✅ Melhor compatibilidade com sistemas de arquivos externos (útil em redes ou containers)
    },
    hmr: {
      overlay: true,          // ✅ Exibe erros diretamente no navegador (Hot Module Replacement)
    },
    fs: {
      allow: ['.'],           // ✅ Permite servir arquivos fora da raiz do projeto (se necessário)
    },
    historyApiFallback: true, // ✅ Corrige erros 404 para rotas do React Router (Single Page Application)
  },

  build: {
    target: 'esnext',         // ✅ Suporte para recursos modernos do JavaScript
    sourcemap: true,          // ✅ Geração de sourcemaps para facilitar o debugging
    outDir: 'dist',           // ✅ Diretório de saída do build
    emptyOutDir: true,        // ✅ Limpa o diretório de saída antes de cada build
  },

  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // ✅ Permite imports simplificados, ex: "@/components/Button"
    },
  },

  esbuild: {
    jsx: 'automatic',         // ✅ Configuração para JSX automático (React 17+), sem precisar importar React em cada arquivo
  },

  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'], // ✅ Otimização de dependências para builds mais rápidos
  },
});
