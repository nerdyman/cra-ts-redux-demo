module.exports = {
  root: true,

  parser: '@typescript-eslint/parser',

  extends: [
    'eslint:recommended',
    'plugin:jest/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:import/typescript',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:jsx-a11y/recommended',
    'prettier',
    'prettier/@typescript-eslint',
  ],

  plugins: ['@typescript-eslint', 'react', 'react-hooks', 'jest'],

  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },

  rules: {
    'linebreak-style': ['error', 'unix'],
    'no-console': 'warn',
    'no-negated-condition': 'warn',
    'no-restricted-imports': [
      'error',
      {
        paths: [
          {
            name: 'lodash',
            message: "Prefer explicit path for each module, e.g. 'lodash/get'",
          },
          {
            name: 'reakit',
            message:
              "Prefer explicit path for each module, e.g. 'reakit/Button'",
          },
        ],
      },
    ],
    'no-unexpected-multiline': 0,
    'no-unused-vars': 0,
    'require-await': 0,
    'semi-style': 0,
    'spaced-comment': 0,

    'babel/camelcase': 0,
    'babel/object-curly-spacing': 0,
    'babel/semi': 0,

    'import/extensions': 0,
    'import/no-extraneous-dependencies': 'warn',
    'import/no-default-export': ['error'],
    'import/no-unused-modules': 0,
    'import/order': 'warn',

    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',

    'react/jsx-filename-extension': 0,
    'react/jsx-indent': 0,
    'react/jsx-indent-props': 0,
    'react/jsx-uses-react': 'error',
    'react/prop-types': 0,
    'react/state-in-constructor': 0,

    '@typescript-eslint/explicit-function-return-type': [
      'warn',
      {
        allowExpressions: true,
        allowTypedFunctionExpressions: true,
      },
    ],
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        args: 'all',
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      },
    ],
  },

  settings: {
    react: {
      version: 'detect',
    },
  },
};
