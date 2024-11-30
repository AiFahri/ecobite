<?php

use App\Http\Controllers\CatalogController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\TransactionController;

Route::get('/', function () {
    return Inertia::render('Home');
});

Route::middleware('auth')->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');
});

Route::get('/catalog', function () {
    return Inertia::render('Catalog');
});

Route::get('/productdetail', function () {
    return Inertia::render('ProductDetail');
});

Route::get('/products', [CatalogController::class, 'index'])->name('products.index');
Route::get('/products/{productID}', [CatalogController::class, 'show'])->name('products.show');

Route::post('/login', [AuthenticatedSessionController::class, 'store'])->name('login.post');

Route::get('instant-buy', [TransactionController::class, 'showInstantBuy'])->middleware('payment')->name('instant-buy');

Route::post('instant-buy', [TransactionController::class, 'storeInstantBuy']);

Route::get('pre', function () {

    // dd(Auth::id());

    return view('pre');
})->name('pre');

require __DIR__ . '/auth.php';
