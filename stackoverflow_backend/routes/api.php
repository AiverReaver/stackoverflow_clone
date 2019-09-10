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

Route::group(['middleware' => ['auth:api']], function () {

    Route::post('/posts', 'PostsController@store');
    Route::put('/posts/{post}', 'PostsController@update');
    Route::delete('/posts/{post}', 'PostsController@delete');

    Route::post('/posts/{post}/comments', 'CommentsController@storePostComment');
    Route::post('/posts/{post}/answers', 'AnswersController@store');

    Route::post('/answers/{answer}/comments', 'CommentsController@storeAnswerComment');

    Route::post('/tags', 'TagsController@store');
    Route::post('/logout', 'AuthController@logout');
});

Route::get('/tags', 'TagsController@getTags');
Route::get('/posts', 'PostsController@index');
Route::get('/posts/{post}', 'PostsController@show');

Route::post('/register', 'AuthController@register');
