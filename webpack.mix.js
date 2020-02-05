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

mix.js('resources/assets/js/app.js', 'public/js')
   .sass('resources/assets/sass/app.scss', 'public/css');

mix.scripts([
    
    'node_modules/jquery-form/dist/jquery.form.min.js',
    'node_modules/datatables.net/js/jquery.dataTables.min.js',
    //'node_modules/datatables.net-bs/js/dataTables.bootstrap.min.js', 
     'node_modules/datatables.net-select/js/dataTables.select.min.js',
    // 'node_modules/datatables.net-select-bs/js/select.bootstrap.min.js',
     'node_modules/datatables.net-buttons/js/dataTables.buttons.min.js',
    // 'node_modules/datatables.net-buttons-bs/js/buttons.bootstrap.min.js',
     'node_modules/datatables.net-buttons/js/buttons.html5.min.js',
     'node_modules/datatables.net-responsive/js/dataTables.responsive.min.js', 
    // 'node_modules/datatables.net-responsive-bs/js/responsive.bootstrap.min.js',
     'node_modules/datatables.net-searchpanes/js/dataTables.searchPanes.min.js',
    // 'node_modules/datatables.net-searchpanes-bs/js/searchPanes.bootstrap.min.js',
    'node_modules/js-base64/base64.min.js',
    // 'node_modules/vanilla-masker/lib/vanilla-masker.js',
    'resources/assets/js/scripts/global.js'

], 'public/js/scripts-all.js');


mix.styles([ 
    // 'node_modules/datatables.net-bs/css/dataTables.bootstrap.min.css',
     'node_modules/datatables.net-select/js/dataTables.select.min.js',
    // 'node_modules/datatables.net-select-bs/css/select.bootstrap.min.css',
     'node_modules/datatables.net-buttons/js/dataTables.buttons.js',
    // 'node_modules/datatables.net-buttons-bs/css/buttons.bootstrap.min.css',
     'node_modules/datatables.net-responsive-dt/css/responsive.dataTables.min.css',
    // 'node_modules/datatables.net-responsive-bs/css/responsive.bootstrap.min.css',
    // 'node_modules/datatables.net-searchpanes-bs/css/searchPanes.bootstrap.min.css',

], 'public/css/styles-all.css')

    .sass('resources/assets/sass/site.scss', 'public/css');
