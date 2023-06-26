<?php

use App\Http\Controllers\ConnectionController;
use App\Http\Controllers\SuggestionController;
use App\Models\Friendship;
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
*/

Route::get('/', function () {
    return view('welcome');
});



Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');

Route::post('/suggestions', [SuggestionController::class, 'index'])->name('get.suggestions');
Route::post('/send-request', [SuggestionController::class, 'sendRequest'])->name('send.request');
Route::post('/show-requests', [SuggestionController::class, 'showRequests'])->name('show.requests');
Route::post('/received-requests', [SuggestionController::class, 'receivedRequests'])->name('received.requests');
Route::post('/accept-request', [SuggestionController::class, 'acceptRequest'])->name('accept.request');
Route::post('/delete-request', [SuggestionController::class, 'deleteRequest'])->name('delete.request');




Route::post('/remove-connection', [ConnectionController::class, 'removeConnection'])->name('remove.connection');
Route::post('/show-connections', [ConnectionController::class, 'showConnections'])->name('show.connections');
