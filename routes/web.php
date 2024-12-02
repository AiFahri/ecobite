<?php

use App\Http\Controllers\CatalogController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\TransactionController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\WishlistController;
Route::get('/', function () {
    return Inertia::render('Home');
});

Route::middleware('auth')->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');
});

Route::middleware(['auth'])->group(function () {
    Route::get('/catalog', [CatalogController::class, 'index'])->name('catalog.index');
    Route::get('/products/{productID}', [CatalogController::class, 'show'])->name('products.show');
    
    // Wishlist routes
    Route::get('/wishlist', [WishlistController::class, 'show'])->name('wishlist.show');
    Route::post('/wishlist/toggle', [WishlistController::class, 'toggleWishlist'])->name('wishlist.toggle');
});

Route::get('/products', [CatalogController::class, 'index'])->name('products.index');
Route::get('/payment', [PaymentController::class, 'index'])->name('payment.index');

Route::post('/login', [AuthenticatedSessionController::class, 'store'])->name('login.post');

Route::get('instant-buy', [TransactionController::class, 'showInstantBuy'])->middleware('payment')->name('instant-buy');

Route::post('instant-buy', [TransactionController::class, 'storeInstantBuy']);

Route::get('/carts', function () {
    return Inertia::render('Cart');
});

// Route::get('/pre', function () {
//     // dd(Auth::id());
//     return view('pre');
// })->name('pre');

Route::get('/pre2', function () {
    return view('pre2');
})->name('pre2');

require __DIR__ . '/auth.php';
