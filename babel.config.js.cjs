module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: { node: "current" }, // ✅ Compatível com o Node.js atual (ideal para Jest)
        modules: "auto",              // ✅ Deixa o Babel decidir entre CommonJS e ESM conforme necessário
        useBuiltIns: "usage",         // ✅ Adiciona polyfills apenas onde for usado
        corejs: 3                     // ✅ Usa o core-js v3 para polyfills modernos
      }
    ],
    "@babel/preset-react",            // ✅ Suporte completo para JSX (React)
    "@babel/preset-typescript"        // ✅ Suporte completo para TypeScript
  ],
  plugins: [
    "@babel/plugin-transform-runtime", // ✅ Evita duplicação de helpers do Babel
    "@babel/plugin-syntax-jsx"         // ✅ Garante o parsing da sintaxe JSX
  ]
};
