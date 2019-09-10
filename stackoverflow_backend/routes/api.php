<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('/auth/login', 'AuthController@login');
Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/posts', 'PostsController@index');
Route::get('/posts/{post}', 'PostsController@show');
Route::post('/posts', 'PostsController@store');
Route::put('/posts/{post}', 'PostsController@update');
Route::delete('/posts/{post}', 'PostsController@delete');

Route::post('/posts/{post}/comments', 'CommentsController@storePostComment');

Route::post('/answers/{answer}/comments', 'CommentsController@storeAnswerComment');


Route::post('/tags', 'TagsController@store');
Route::get('/tags', 'TagsController@getTags');

Route::post('/register', 'AuthController@register');

Route::post('/logout', 'AuthController@logout');
