<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Auth\OauthController;
use Illuminate\Support\Facades\Route;

Route::middleware('guest')->group(function () {
    Route::get('register', [RegisteredUserController::class, 'create'])->name('register');
    Route::post('register', [RegisteredUserController::class, 'store']);

    Route::get('login', [AuthenticatedSessionController::class, 'create'])->name('login');
    Route::post('login', [AuthenticatedSessionController::class, 'store']);

    Route::get('/auth/google', [OauthController::class, 'googleLogin'])->name('google.login');
    Route::get('/auth/google/callback', [OauthController::class, 'googleCallback']);

    Route::get('/auth/facebook', [OauthController::class, 'facebookLogin'])->name('facebook.login');
    Route::get('/auth/facebook/callback', [OauthController::class, 'facebookCallback']);
});

Route::middleware('auth')->group(function () {
    Route::get('logout', [AuthenticatedSessionController::class, 'destroy'])
        ->name('logout');
});
