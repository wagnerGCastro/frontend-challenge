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

// Fonts
mix.copy([
    'node_modules/ionicons/fonts',
    'node_modules/font-awesome/fonts',

], 'public/fonts');

mix.js([ 'resources/assets/js/app.js'], 'public/js');

mix.babel('resources/assets/js/scripts/global.es6.js','resources/assets/js/scripts/temp/global.es5.js');

mix.scripts([
    'node_modules/es6-promise-polyfill/promise.min.js',
    'node_modules/url-polyfill/url-polyfill.min.js',
    'node_modules/@tarp/require/require.min.js',
    'node_modules/jquery-form/dist/jquery.form.min.js',
    'node_modules/js-base64/base64.min.js',
    'node_modules/vanilla-masker/lib/vanilla-masker.js',
    'resources/assets/js/scripts/temp/global.es5.js',

], 'public/js/scripts-all.js');

mix.sass('resources/assets/sass/app.scss', 'public/css');

mix.styles([
    'node_modules/ionicons/css/ionicons.min.css',
    'node_modules/font-awesome/css/font-awesome.min.css',

], 'public/css/styles-all.css');

mix.sass('resources/assets/sass/site.scss', 'public/css',  {
    sassOptions: {
        outputStyle: 'compressed',
    },
    implementation: require('node-sass') // Switch from Dart to node-sass implementation
})
    .options({
        autoprefixer: {
            options: {
                browsers: [
                    'last 22 versions',
                ]
            }
        }
    });
