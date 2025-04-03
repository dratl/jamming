import js from '@eslint/js';
import reactRecommended from 'eslint-plugin-react/configs/recommended.js';

export default [
  js.configs.recommended,
  reactRecommended,
  {
    rules: {
      "react/react-in-jsx-scope": "off", // Disable for React 17+
    },
    languageOptions: {
      globals: {
        console: true, // Add this line to recognize 'console' as a global variable
        fetch: false
      },
    },
    settings: {
      react: {
        version: 'detect', // Automatically detect React version
      },
    },
  },
];