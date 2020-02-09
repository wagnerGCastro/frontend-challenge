let mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */


mix.copy(
    ['node_modules/ionicons/fonts'
    
], 'public/fonts');


mix.js('resources/assets/js/app.js', 'public/js')
   .sass('resources/assets/sass/app.scss', 'public/css')

mix.scripts([
    'node_modules/jquery-form/dist/jquery.form.min.js',
    'node_modules/js-base64/base64.min.js',
    'node_modules/vanilla-masker/lib/vanilla-masker.js',
    'resources/assets/js/scripts/es6.js',
    'resources/assets/js/scripts/global.js',

], 'public/js/scripts-all.js');


mix.styles([ 
    'node_modules/ionicons/css/ionicons.min.css',

], 'public/css/styles-all.css')

    .sass('resources/assets/sass/site.scss', 'public/css');
