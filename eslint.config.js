import js from '@eslint/js'
import reactPlugin from 'eslint-plugin-react'
import tsParser from '@typescript-eslint/parser'
import tsPlugin from '@typescript-eslint/eslint-plugin'
import importPlugin from 'eslint-plugin-import'
import prettierPlugin from 'eslint-plugin-prettier'

export default [
  js.configs.recommended,
  {
    files: ['**/*.ts', '**/*.tsx'],
    ignores: ['node_modules', 'dist', 'build'],
    languageOptions: {
      parser: tsParser,
      ecmaVersion: 2021,
      sourceType: 'module',
    },
    plugins: {
      react: reactPlugin,
      '@typescript-eslint': tsPlugin,
      prettier: prettierPlugin,
      import: importPlugin,
    },
    settings: {
      react: {
        version: 'detect',
      },
      'import/resolver': {
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
          moduleDirectory: ['node_modules', 'src/'],
        },
      },
    },
    rules: {
      // Общие правила
      'react/jsx-max-props-per-line': ['error', { maximum: 1 }],
      'react/jsx-first-prop-new-line': ['error', 'multiline'],
      'prettier/prettier': ['error', { printWidth: 80, jsxBracketSameLine: false }],
      indent: ['error', 2],
      'prettier/prettier': 'error',
      'linebreak-style': ['error', 'unix'],
      quotes: ['error', 'single'],
      semi: ['error', 'never'],
      'max-len': ['error', { code: 120, tabWidth: 2 }],

      // TypeScript-specific
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],

      // React-specific
      'react/jsx-filename-extension': [1, { extensions: ['.ts', '.tsx'] }],
      'react/jsx-indent': ['error', 2],
      'react/jsx-indent-props': ['error', 2],

      // Import rules
      'import/no-unresolved': [2, { caseSensitive: false }],
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
          'newlines-between': 'always',
        },
      ],
    },
  },
]
