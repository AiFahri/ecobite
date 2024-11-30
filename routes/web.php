<?php

use App\Http\Controllers\CatalogController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;


Route::get('/', function () {
    return Inertia::render('Home');
});

Route::middleware('auth')->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');
});

Route::get('/catalog', [CatalogController::class, 'index'])->name('catalog.index');

Route::get('/productdetail', function () {
    return Inertia::render('ProductDetail');
});

Route::get('/products', [CatalogController::class, 'index'])->name('products.index');
Route::get('/payment', function () {
    return Inertia::render('Payment');
}); 

Route::get('/cart', function () {
    return Inertia::render('Cart');
});
Route::get('/products/{productID}', [CatalogController::class, 'show'])->name('products.show');

Route::post('/login', [AuthenticatedSessionController::class, 'store'])->name('login.post');
Route::get('/payment', [PaymentController::class, 'index'])->name('payment.index');

require __DIR__ . '/auth.php';
