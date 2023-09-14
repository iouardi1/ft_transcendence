// module.exports = {
//   parser: '@typescript-eslint/parser',
//   parserOptions: {
//     project: 'tsconfig.json',
//     tsconfigRootDir: __dirname,
//     sourceType: 'module',
//   },
//   plugins: ['@typescript-eslint/eslint-plugin'],
//   extends: [
//     'plugin:@typescript-eslint/recommended',
//     'plugin:prettier/recommended',
//   ],
//   root: true,
//   env: {
//     node: true,
//     jest: true,
//   },
//   ignorePatterns: ['.eslintrc.js'],
//   rules: {
//     '@typescript-eslint/interface-name-prefix': 'off',
//     '@typescript-eslint/explicit-function-return-type': 'off',
//     '@typescript-eslint/explicit-module-boundary-types': 'off',
//     '@typescript-eslint/no-explicit-any': 'off',
//   },
  
// };


/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  root: true,
  env: {
    node: true,
    es6: true
  },
  parser: 'vue-eslint-parser',
  plugins: ['standard-recommended'],
  extends: [
    'plugin:vue/vue3-essential',
    'plugin:vue/vue3-strongly-recommended',
    'plugin:vue/vue3-recommended',
    'eslint:recommended',
    '@vue/eslint-config-typescript/recommended',
    '@vue/eslint-config-prettier',
    './.eslintrc-auto-import.json',
    'plugin:@typescript-eslint/recommended-requiring-type-checking'
  ],
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 'latest',
    ecmaFeatures: {
      jsx: true
    },
    project: './tsconfig.json'
  },
  rules: {
    'standard-recommended/no-index': 'error',
    'prettier/prettier': ['warn', { printWidth: 120 }],
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    eqeqeq: 'error',
    'no-alert': 'error',
    quotes: 'off',
    'no-const-assign': 'error',
    'no-eval': 'error',
    'no-implied-eval': 'error',
    semi: 'off',
    'no-multi-spaces': 'error',
    'no-new-wrappers': 'error',
    'no-script-url': 'error',
    'no-self-compare': 'error',
    'no-useless-return': 'error',
    'no-void': 'error',
    'require-await': 'error',
    'wrap-iife': ['error', 'inside'],
    yoda: 'error',
    'no-undef': 'off',
    'no-use-before-define': 'off',
    'global-require': 'error',
    'no-new-require': 'error',
    camelcase: 'error',
    'comma-dangle': 'error',
    'line-comment-position': 'error',
    'max-depth': 'error',
    'max-nested-callbacks': 'error',
    'multiline-comment-style': 'error',
    'no-inline-comments': 'error',
    'no-lonely-if': 'error',
    'no-trailing-spaces': 'error',
    'no-unneeded-ternary': 'error',
    'no-whitespace-before-property': 'error',
    'operator-assignment': 'error',
    'padded-blocks': ['error', 'never'],
    'space-before-function-paren': 'off',
    'spaced-comment': 'error',
    'switch-colon-spacing': 'error',
    'no-duplicate-imports': 'error',
    'no-useless-rename': 'error',
    'no-var': 'error',
    'prefer-const': 'error',
    'default-case': 'error',
    'default-case-last': 'error',
    'default-param-last': 'error',
    'new-cap': 'error',
    'no-else-return': 'error',
    'no-empty-function': 'error',
    'no-lone-blocks': 'error',
    'no-return-await': 'error',
    'array-bracket-spacing': 'error',
    'arrow-parens': ['error', 'as-needed'],
    'arrow-spacing': 'error',
    'brace-style': 'error',
    'comma-spacing': 'error',
    'key-spacing': 'error',
    'keyword-spacing': 'error',
    'lines-between-class-members': 'error',
    'no-multiple-empty-lines': 'error',
    'nonblock-statement-body-position': 'error',
    'object-curly-spacing': ['error', 'always'],
    'rest-spread-spacing': 'error',
    'space-before-blocks': 'error',
    'space-in-parens': 'error',
    '@typescript-eslint/array-type': 'error',
    '@typescript-eslint/no-duplicate-enum-values': 'error',
    '@typescript-eslint/no-empty-interface': 'error',
    '@typescript-eslint/no-inferrable-types': 'error',
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-namespace': 'off',
    '@typescript-eslint/prefer-optional-chain': 'off',

    '@typescript-eslint/naming-convention': [
      'error',
      { selector: ['interface', 'typeAlias', 'enum'], format: ['PascalCase'] },
      { selector: ['function', 'parameter'], format: ['camelCase'] },
      {
        selector: 'memberLike',
        modifiers: ['private'],
        format: ['camelCase'],
        leadingUnderscore: 'require'
      }
    ],
    'vue/html-self-closing': [
      'error',
      {
        html: {
          void: 'always',
          normal: 'always',
          component: 'always'
        },
        svg: 'always',
        math: 'always'
      }
    ],
    'vue/multiline-html-element-content-newline': 'error',
    'vue/no-spaces-around-equal-signs-in-attribute': 'error',
    'vue/no-template-shadow': 'error',
    'vue/no-setup-props-destructure': 'off',
    'vue/prop-name-casing': 'error',
    'vue/multi-word-component-names': 'off',
    'vue/no-v-html': 'off'
  },
  overrides: [
    {
      files: [
        'src/components/base-chart/**/*',
        'src/components/base-curd/base-curd.vue',
        'src/components/base-ui/**/*',
        'src/types/global.d.ts',
        'src/utils/component.ts',
        'src/utils/extends.ts',
        'src/utils/localstorage.ts'
      ],
      rules: {
        '@typescript-eslint/no-explicit-any': 'off'
      }
    },
    {
      files: ['src/directive/index.ts', 'src/plugins/core/index.ts', 'src/service/index.ts', 'src/router/index.ts'],
      rules: {
        'standard-recommended/no-index': 'off'
      }
    }
  ]
};
