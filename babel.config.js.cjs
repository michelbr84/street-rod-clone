module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: { node: "current" }, // ✅ Compatível com o Node.js atual (ideal para Jest e Vite)
        modules: "auto",              // 🔄 Alterna automaticamente entre CommonJS e ESM
        useBuiltIns: "usage",         // 📦 Inclui polyfills apenas quando necessário
        corejs: 3                     // 🚀 Polyfills modernos com core-js v3
      }
    ],
    "@babel/preset-react",            // ⚛️ Suporte completo para JSX (React 17+)
    "@babel/preset-typescript"        // 📦 Suporte completo para TypeScript
  ],
  plugins: [
    "@babel/plugin-transform-runtime", // 🔄 Otimiza o código gerado, evitando duplicação de helpers
    "@babel/plugin-syntax-jsx",        // 📦 Parsing da sintaxe JSX
    [
      "babel-plugin-module-resolver",  // ✅ Suporte para aliases no import (ex: @/components)
      {
        root: ["./src"],
        alias: {
          "@": "./src"                 // 🚀 Importação simplificada: import X from '@/components/X'
        }
      }
    ]
  ],
  env: {
    test: {
      plugins: ["@babel/plugin-transform-modules-commonjs"] // ✅ Suporte para Jest (transpila ESM para CommonJS)
    }
  }
};
