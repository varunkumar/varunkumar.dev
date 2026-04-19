import js from '@eslint/js';
import prettierConfig from 'eslint-config-prettier';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import globals from 'globals';

export default [
  js.configs.recommended,
  {
    ...reactPlugin.configs.flat.recommended,
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ...reactPlugin.configs.flat.recommended.languageOptions,
      globals: {
        ...globals.browser,
        ...globals.es2022,
      },
    },
    settings: {
      react: { version: 'detect' },
    },
  },
  {
    files: ['**/*.{js,jsx}'],
    plugins: {
      'react-hooks': reactHooksPlugin,
    },
    rules: {
      ...reactHooksPlugin.configs.recommended.rules,
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
    },
  },
  prettierConfig,
];
