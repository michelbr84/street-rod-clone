module.exports = {
  preset: "ts-jest",                          // ✅ Suporte para TypeScript com Jest
  testEnvironment: "jsdom",                  // ✅ Simula o DOM (essencial para testar componentes React)

  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",            // ✅ Transforma arquivos TypeScript (.ts e .tsx)
    "^.+\\.(js|jsx|mjs)$": "babel-jest"      // ✅ Transforma arquivos JS/JSX e ESM (mjs) com Babel
  },

  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy", // ✅ Mock para importar arquivos de estilo (CSS Modules)
    "^@/(.*)$": "<rootDir>/src/$1"                    // ✅ Alias para importações absolutas (ex: import X from '@/components/X')
  },

  transformIgnorePatterns: [
    "/node_modules/(?!@babel|lodash-es)"     // ✅ Ignora node_modules, mas permite transformar libs ESM específicas
  ],

  setupFilesAfterEnv: [
    "@testing-library/jest-dom/extend-expect", // ✅ Configurações do Testing Library (matchers personalizados)
    "<rootDir>/src/tests/setupTests.ts"        // ✅ Configurações globais de testes (se existir)
  ],

  testMatch: [
    "**/__tests__/**/*.(ts|tsx|js|jsx)",       // ✅ Procura por testes em pastas __tests__
    "**/?(*.)+(spec|test).(ts|tsx|js|jsx)"     // ✅ Suporte para arquivos com sufixo .spec ou .test
  ],

  collectCoverage: true,                       // ✅ Habilita coleta de cobertura de testes
  coverageReporters: ["text", "lcov", "html"], // ✅ Gera relatórios de cobertura em texto, LCOV e HTML
  coverageDirectory: "coverage",               // ✅ Diretório de saída para relatórios de cobertura

  clearMocks: true,                            // ✅ Limpa mocks entre cada teste para evitar efeitos colaterais
  resetMocks: true,                            // ✅ Reseta o estado dos mocks automaticamente

  globals: {
    "ts-jest": {
      isolatedModules: true,                   // ✅ Transpila TypeScript de forma independente (ótimo para projetos Vite)
      diagnostics: false                       // ✅ Desabilita erros do TypeScript durante os testes (mantém o foco nos testes)
    }
  },

  watchPlugins: [                              // ✅ Suporte para melhorar o modo watch do Jest
    "jest-watch-typeahead/filename",
    "jest-watch-typeahead/testname"
  ]
};
