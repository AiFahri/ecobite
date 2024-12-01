<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Auth\OauthController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\TransactionController;
use Illuminate\Container\Attributes\Auth;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\WishlistController;

Route::middleware('guest')->group(function () {
    Route::get('register', [RegisteredUserController::class, 'create'])->name('register');
    Route::post('register', [RegisteredUserController::class, 'store']);

    Route::get('login', [AuthenticatedSessionController::class, 'create'])->name('login');
    Route::post('login', [AuthenticatedSessionController::class, 'store']);

    Route::get('login2', [AuthenticatedSessionController::class, 'create2'])->name('login2');

    Route::get('/auth/google', [OauthController::class, 'googleLogin'])->name('google.login');
    Route::get('/auth/google/callback', [OauthController::class, 'googleCallback']);

    Route::get('/auth/facebook', [OauthController::class, 'facebookLogin'])->name('facebook.login');
    Route::get('/auth/facebook/callback', [OauthController::class, 'facebookCallback']);
});

Route::middleware('auth')->group(function () {
    Route::get('logout', [AuthenticatedSessionController::class, 'destroy'])
        ->name('logout');

    Route::get('/cart', [CartController::class, 'show'])->name('cart');

    Route::get('/instant-buy', [TransactionController::class, 'showInstantBuy'])->middleware('payment')->name('instant-buy');

    Route::post('/instant-buy', [TransactionController::class, 'storeInstantBuy']);

    Route::post('/payment', [PaymentController::class, 'store'])->name('payment.store');

    Route::get('/wishlists', [WishlistController::class, 'show'])->name('wishlist');
    Route::post('/wishlist/toggle', [WishlistController::class, 'toggleWishlist']);
});
