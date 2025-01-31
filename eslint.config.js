import js from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import pluginReact from 'eslint-plugin-react';
import globals from 'globals';
import prettier from 'eslint-plugin-prettier';
import configPrettier from 'eslint-config-prettier';

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
      },
      globals: { ...globals.browser, ...globals.node },
    },
    plugins: {
      react: pluginReact,
      prettier: prettier,
      '@typescript-eslint': tseslint,
    },
    settings: {
      react: {
        version: 'detect', // 🔥 Detecta automaticamente a versão do React
      },
    },
    rules: {
      ...js.configs.recommended.rules, // Regras padrão do JavaScript
      ...tseslint.configs.recommended.rules, // Regras padrão do TypeScript
      ...pluginReact.configs.recommended.rules, // Regras recomendadas para React
      ...pluginReact.configs['jsx-runtime'].rules, // Suporte ao JSX automático
      ...configPrettier.rules, // Regras do Prettier

      'no-console': 'warn',
      'prettier/prettier': 'warn', // Integração com Prettier
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }], // Ignora variáveis iniciadas com "_"
      'react/react-in-jsx-scope': 'off', // Não necessário no React 18+
    },
  },
];
