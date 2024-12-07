<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Auth\OauthController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\TransactionController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\WishlistController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\AdminManagementController;
use App\Http\Controllers\TenantManagementController;

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

Route::prefix('admin')->name('admin.')->group(function () {
    Route::get('login', [AdminController::class, 'create'])->name('login');
    Route::post('login', [AdminController::class, 'store']);
    Route::post('logout', [AdminController::class, 'destroy'])->name('logout');

    Route::middleware('auth:admin')->group(function () {
        Route::get('dashboard', [AdminController::class, 'index'])->name('dashboard');
    });
});

Route::middleware('auth:admin')->prefix('admin')->name('admin.')->group(function () {
    Route::get('manage-admins', [AdminManagementController::class, 'index'])->name('manageAdmins');
    Route::get('manage-admins/create', [AdminManagementController::class, 'create'])->name('manageAdmins.create');
    Route::post('manage-admins', [AdminManagementController::class, 'store'])->name('manageAdmins.store');
    Route::get('manage-admins/{id}/edit', [AdminManagementController::class, 'edit'])->name('manageAdmins.edit');
    Route::put('manage-admins/{id}', [AdminManagementController::class, 'update'])->name('manageAdmins.update');
    Route::delete('manage-admins/{id}', [AdminManagementController::class, 'destroy'])->name('manageAdmins.destroy');

    Route::get('manage-tenants', [TenantManagementController::class, 'index'])->name('manageTenants');
    Route::get('manage-tenants/create', [TenantManagementController::class, 'create'])->name('manageTenants.create');
    Route::post('manage-tenants', [TenantManagementController::class, 'store'])->name('manageTenants.store');
    Route::get('manage-tenants/{id}/edit', [TenantManagementController::class, 'edit'])->name('manageTenants.edit');
    Route::put('manage-tenants/{id}', [TenantManagementController::class, 'update'])->name('manageTenants.update');
    Route::delete('manage-tenants/{id}', [TenantManagementController::class, 'destroy'])->name('manageTenants.destroy');
});

Route::middleware('auth')->group(function () {
    Route::get('logout', [AuthenticatedSessionController::class, 'destroy'])
        ->name('logout');

    Route::get('/cart', [CartController::class, 'index'])->name('cart.index');
    // Route::get('/cart', [CartController::class, 'show'])->name('cart');

    Route::get('/instant-buy', [TransactionController::class, 'showInstantBuy'])->middleware('payment')->name('instant-buy');

    Route::post('/instant-buy', [TransactionController::class, 'storeInstantBuy']);

    Route::post('/payment', [PaymentController::class, 'store'])->name('payment.store');

    Route::get('/wishlists', [WishlistController::class, 'show'])->name('wishlist');
    Route::post('/wishlist/toggle', [WishlistController::class, 'toggleWishlist']);
});
