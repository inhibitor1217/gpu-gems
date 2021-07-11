module.exports = {
  extends: ['plugin:prettier/recommended'],
  env: {
    browser: true,
  },
  ignorePatterns: [
    'node_modules/',
    '.vscode/',
  ],
  parser: '@typescript-eslint/parser',
  plugins: [
    'eslint-plugin-import',
  ],
  rules: {
    'arrow-body-style': 'off',
    'prefer-arrow-callback': ['error', { allowNamedFunctions: true }],
    'import/prefer-default-export': 'off',
  },
  settings: {
    'import/resolver': {
      node: {
        paths: ['src'],
        extensions: ['.js', '.ts'],
      },
    },
  },
};
