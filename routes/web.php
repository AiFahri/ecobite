<?php

use App\Http\Controllers\CatalogController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\TransactionController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\WishlistController;
use App\Http\Controllers\HomeController;
Route::get('/', [HomeController::class, 'index'])->name('home');

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

    // Cart routes
    Route::get('/cart', [CartController::class, 'index'])->name('cart.index');
    Route::post('/cart/add', [CartController::class, 'addToCart'])->name('cart.add');
    Route::post('/cart/update/{cartId}', [CartController::class, 'updateQuantity'])->name('cart.update');
    Route::delete('/cart/remove/{cartId}', [CartController::class, 'removeItem'])->name('cart.remove');
    Route::delete('/cart/remove-all', [CartController::class, 'removeAll'])->name('cart.removeAll');
    Route::post('/cart/toggle-wishlist/{productId}', [CartController::class, 'toggleWishlist'])->name('cart.toggleWishlist');
});

Route::get('/products', [CatalogController::class, 'index'])->name('products.index');
Route::get('/payment', [PaymentController::class, 'index'])->name('payment.index');

Route::get('/products/{productID}', [CatalogController::class, 'show'])->name('products.show');

Route::post('/login', [AuthenticatedSessionController::class, 'store'])->name('login.post');

Route::get('instant-buy', [TransactionController::class, 'showInstantBuy'])->middleware('payment')->name('instant-buy');

Route::post('instant-buy', [TransactionController::class, 'storeInstantBuy']);

Route::get('/transaction', function () {
    return Inertia::render('Transaction');
});


Route::get('/admin/superadmin', function () {
    return Inertia::render('Admin/SuperAdmin');
});

Route::get('/map', function () {
    return Inertia::render('Map');
});


// Route::get('/pre', function () {
//     // dd(Auth::id());
//     return view('pre');
// })->name('pre');

Route::get('/pre2', function () {
    return view('pre2');
})->name('pre2');

require __DIR__ . '/auth.php';
