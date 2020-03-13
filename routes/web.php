<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Login
Route::get('/', 'Auth\LoginController@showLoginForm')->name('login');
Route::post('/', 'Auth\LoginController@login');
Route::post('/', 'Auth\LoginController@logout')->name('logout');

Auth::routes();

Route::post('/user/login','UserController@login')->name('user.login');

Route::middleware(['check.login'])->get('/login', 'Auth\LoginController@showLoginForm')->name('login');
Route::post('/login', 'Auth\LoginController@login');   

// Protected routes
Route::group(['middleware' => ['check.user']], function() {
    // Home
    Route::get('/home','HomeController@index')->name('home.index');

    // Product
    Route::get('/product','ProductController@index')->name('product.index');
    Route::get('/product/create','ProductController@create')->name('product.create');
    Route::post('/product/create','ProductController@store')->name('product.store');
    Route::get('/product/edit','ProductController@edit')->name('product.edit');
    Route::get('/product/edit/{id}','ProductController@edit')->name('product.edit');
    Route::put('/product/update/{id}','ProductController@update')->name('product.update');
    Route::delete('/product/delete/{id}','ProductController@destroy')->name('product.destroy');

    // User
    Route::get('/user','UserController@index')->name('user.index');
});