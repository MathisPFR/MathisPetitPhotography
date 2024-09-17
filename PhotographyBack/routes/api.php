<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\PhotoController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');




Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('photos', [PhotoController::class, 'index']);
    Route::post('photos', [PhotoController::class, 'store']);
    Route::get('photos/{id}', [PhotoController::class, 'show']);
    Route::put('photos/{id}', [PhotoController::class, 'update']);
    Route::delete('photos/{id}', [PhotoController::class, 'destroy']);

    Route::post('photos/{id}/like', [PhotoController::class, 'like']);
});
