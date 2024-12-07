<?php

use App\Http\Controllers\CatalogController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\TransactionController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\WishlistController;
use App\Models\Transaction;

Route::get('/', function () {
    return Inertia::render('Home');
});

Route::get('/catalog', [CatalogController::class, 'index'])->name('catalog.index');
Route::get('/products/{productID}', [CatalogController::class, 'show'])->name('products.show');

Route::middleware(['auth'])->group(function () {

    Route::get('/wishlist', [WishlistController::class, 'show'])->name('wishlist.show');
    Route::post('/wishlist/toggle', [WishlistController::class, 'toggleWishlist'])->name('wishlist.toggle');

    Route::get('/transactions', [TransactionController::class, 'index'])->name('transactions.index');

    Route::get('instant-buy', [TransactionController::class, 'showInstantBuy'])->middleware('payment')->name('instant-buy');

    Route::post('instant-buy', [TransactionController::class, 'storeInstantBuy']);
});

Route::get('/products', [CatalogController::class, 'index'])->name('products.index');
Route::get('/payment', [PaymentController::class, 'index'])->name('payment.index');

Route::get('/products/{productID}', [CatalogController::class, 'show'])->name('products.show');

Route::post('/login', [AuthenticatedSessionController::class, 'store'])->name('login.post');





Route::get('/admin/superadmin', function () {
    return Inertia::render('Admin/SuperAdmin');
});

Route::get('/map', function () {
    return Inertia::render('Map');
});

require __DIR__ . '/auth.php';
