import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // ✅ Define a porta do servidor de desenvolvimento
    open: true, // ✅ Abre automaticamente no navegador
    strictPort: true, // ✅ Mantém a porta fixa
    watch: {
      usePolling: true, // ✅ Melhor compatibilidade com sistemas de arquivos externos
    },
    hmr: {
      overlay: true, // ✅ Mostra erros no navegador
    },
    fs: {
      allow: ['.'], // ✅ Permite servir arquivos fora da raiz do projeto
    },
    middlewareMode: false, // ✅ Necessário para middlewares funcionarem corretamente
    configureServer: (server) => {
      server.middlewares.use((req, res, next) => {
        if (req.url && !req.url.includes('.')) {
          req.url = '/index.html'; // 🔥 Corrige erro 404 em rotas SPA do React Router
        }
        next();
      });
    },
  },
  build: {
    target: 'esnext', // ✅ Usa JS moderno
    sourcemap: true, // ✅ Facilita debugging
    outDir: 'dist', // ✅ Saída do build na pasta "dist"
    emptyOutDir: true, // ✅ Garante que a pasta seja limpa antes do build
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // ✅ Permite imports como "@/components/Button"
    },
  },
  esbuild: {
    jsxInject: `import React from 'react'`, // ✅ Evita erro de JSX não definido
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
  },
});
