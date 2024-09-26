<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\PhotoController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\PartnerController;
use App\Http\Controllers\UserController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');



Route::get('photos', [PhotoController::class, 'index']);
Route::get('photos/{id}', [PhotoController::class, 'show']);

Route::middleware(['auth:sanctum'])->group(function () {
    Route::post('photos', [PhotoController::class, 'store']);
    Route::put('photos/{id}', [PhotoController::class, 'update']);
    Route::delete('photos/{id}', [PhotoController::class, 'destroy']);

    Route::post('photos/{id}/like', [PhotoController::class, 'like']);
    Route::post('photos/{id}/unlike', [PhotoController::class, 'unlike']);
});



Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('categories', [CategoryController::class, 'index']);
    Route::post('categories', [CategoryController::class, 'store']);
    Route::get('categories/{id}', [CategoryController::class, 'show']);
    Route::put('categories/{id}', [CategoryController::class, 'update']);
    Route::delete('categories/{id}', [CategoryController::class, 'destroy']);
});



Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('partners', [PartnerController::class, 'index']); // Lister tous les partenaires
    Route::get('partners/{id}', [PartnerController::class, 'show']); // Voir les informations d'un partenaire
    Route::put('partners/{id}', [PartnerController::class, 'update']); // Mettre à jour les informations du partenaire
});



Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('users', [UserController::class, 'index']); // Lister tous les utilisateurs (admin)
    Route::get('users/{id}', [UserController::class, 'show']); // Afficher un utilisateur spécifique
    Route::put('users/{id}', [UserController::class, 'update']); // Mettre à jour un utilisateur
    Route::delete('users/{id}', [UserController::class, 'destroy']); // Supprimer un utilisateur (admin)
});



Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('liked-photos', [UserController::class, 'getLikedPhotos']);
});

Route::middleware('auth:sanctum')->get('/me', function (Request $request) {
    return $request->user();
});
