module.exports = {
    root: true,

    env: {
        browser: true,
        commonjs: true,
        es6: true,
    },
    extends: [
        //'airbnb-base',
    ],
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
    },
    parserOptions: {
        //ecmaVersion: 2018,
        //parser: 'babel-eslint'
    },
    rules: {
         'indent': 'off',
        // 'indent-legacy': ['error', 4],
        // 'no-param-reassign': ['error', {
        //     'props': false
        // }],
        // 'no-console': ['error', {
        //     allow: ['warn', 'error', 'log']
        // }],
        // 'no-trailing-spaces': ['error', {
        //     'skipBlankLines': true
        // }],
        // 'no-underscore-dangle': ['error', {
        //     'allowAfterThis': true
        // }],
        // 'no-unused-expressions': ['error', {
        //     'allowTernary': true
        // }],
        // 'max-len': 'off',
        // "space-before-function-paren": ["error", "never"],
        // "prefer-destructuring": 'off',
      
    },
};