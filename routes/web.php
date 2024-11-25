<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


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

require __DIR__ . '/auth.php';
