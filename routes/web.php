<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|


Route::group(['middleware' => ['auth']], function () {
    Route::get('/', function () {
        return view('welcome');
    });
});
*/


/*
Route::get('/user/login', 'Auth\LoginController@showLoginForm');

Route::get('/user/register','Auth\RegisterController@');

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');
 */
Auth::routes();

Route::get('/nivel/{nivel}/img/{img}', 'HomeController@getImagesParts')->name('imgs');
Route::get('/', 'HomeController@index')->name('home');

