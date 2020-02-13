/**
 * @version gulp 4.1
 *
 * Referências:
 *
 *     @link http://www.matera.com/blog/post/gulp-ferramentas-para-front-end-parte-2
 *     @link https://gist.github.com/timarney/f122a1004de3f09ec215
 *     @link https://hackersandslackers.com/upgrading-to-gulp-4/
 *
 *     | prefixer | Gulp Sourcemaps
 *     @link https://blog.da2k.com.br/2015/02/21/sourcemaps-debugando-js-e-css-minificados/
 *     @link https://medium.com/@fnandaleite/gulp-direto-ao-ponto-fluxo-de-trabalho-para-iniciantes-2da02f5ab41e  | prefixer
 *
 *     | gullp series | gullp paralelo
 *     @link https://codeburst.io/switching-to-gulp-4-0-271ae63530c0   | gullp series | gullp paralelo
 *
 *     | autoprefixer | browsers | overrideBrowserslist
 *     @link https://github.com/browserslist/browserslist#readme | autoprefixer | browsers
 *
 *     | uglify | Mimificar arquivos JS já concaenados em um único arquivo
 *     @link https://www.npmjs.com/package/gulp-uglify
 *
 *      | error: The following tasks did not complete: default, Did you forget to signal async completion?
 *      @link https://stackoverflow.com/questions/52678262/gulp4-tasks-did-not-complete-and-forget-to-signal-async-completion
 *      @link https://visdup.blogspot.com/2019/01/gulp-error-following-tasks-did-not.html
 *      @link https://stackoverflow.com/questions/36897877/gulp-error-the-following-tasks-did-not-complete-did-you-forget-to-signal-async
 *
 * Tarefas a ser executas:
 *
 *     Copíar arquivos externos de libs e recursos necessários
 *     Mimificar arquivos CSS, HTML, JS
 *     Limpar arquivos intermediários
 *     Veriricar a qualidade código, debugando erros em desenvolvimento em arquivos .css e .js
 *     Concatenar arquivos .css e .js em um único arquivo
 *
 * Instalações:
 *
 *     - npm install gulp-cli -g
 *     - npm install --save-dev gulp || npm install -D gulp@4.0.1   || npm install -D gulp
 *     - npm install --save-dev gulp-jshint
 *     - npm install --save-dev gulp-eslint
 *     - npm install --save-dev gulp@next
 *     - npm install --save-dev jshint
 *     - npm install --save-dev eslint-config-airbnb-base
 *     - npm i --save-dev  eslint-plugin-import
 *
 * help: gulp --help |  gulp -v
 * Gulp:  CLI version: 2.2.0
 *
 */



'use strict';

// Abaixo com a versão Gulp 4
var gulp             = require('gulp');
var gulpJshint       = require('gulp-jshint');
var gulpEslint        = require('gulp-eslint');

/*---------------------------------------------------------------
   Validando erros do Javascript
----------------------------------------------------------------*/

// JS: hint =>  Análisa o Código JS reportando erros caso exista
gulp.task('jshint', gulp.series( function () {
    return gulp.src(
            [
               'resources/assets/js/scripts/babel/global.es6.js',
            ],
            { allowEmpty: true }
        )
        .pipe( gulpJshint() )
        .pipe(gulpJshint.reporter('default'));
}));


// // JS: eslint
gulp.task('default-eslint', gulp.series( () => {
    return gulp.src([
            'resources/assets/js/scripts/babel/global.js',
            '!node_modules/**',
            '!resources/assets/js/app.js',
            '!resources/assets/js/bootstrap.js',
            '!resources/assets/components/**',
        ])

        // eslint() attaches the lint output to the "eslint" property
        // of the file object so it can be used by other modules.
        .pipe(gulpEslint({
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
            globals: [
                'jQuery',
                '$'
            ],
            envs: [
                'browser',
                'commonjs',
                'es6',
            ]
        }))

        // eslint.format() outputs the lint results to the console.
        // Alternatively use eslint.formatEach() (see Docs).

        .pipe(gulpEslint.format())
        // To have the process exit with an error code (1) on
        // lint error, return the stream and pipe to failAfterError last.
        .pipe(gulpEslint.failAfterError());
}));


// // JS: eslint formatter
// gulp.task('custom-formatter', gulp.series( () => {
//     function embolden(text) {
//         return `\u001b[1m${text}\u001b[22m `;
//     }

//     function pluralish(count, text) {
//         return `${count} ${text}${count === 1 ? '' : 's'}`;
//     }

//     return src('../test/fixtures/**/*.js')
//         .pipe(gulpEslint())
//         .pipe(gulpEslint.format(results => {

//             // return formatted text to display
//             return embolden('[Custom ESLint Summary]')
//                 + pluralish(results.length, 'File') + ', '
//                 + pluralish(results.errorCount, 'Error') + ', and '
//                 + pluralish(results.warningCount, 'Warning');
//         }));
// }));



// /*--------------------------------------------------------------
//         >>> Watch: Alterações nos arquivos .css e .js
// ----------------------------------------------------------------*/

// JS:
gulp.task('watch', gulp.series( function() {
    gulp.watch(['resources/assets/js/scripts/babel/global.es6.js'], gulp.parallel(['jshint']));
    //gulp.watch(['assets/js/**/*.js'], gulp.parallel(['watch-js']));
}));


// /**
//  * Defautl:
//  *
//  * 1 - Executar sempre quando há alterações em arquivos .css e .js
//  *
//  */
// //gulp.task('default', gulp.series( ['watch'] ));


// gulp.task('eslint', ['default-eslint','custom-formatter']);
