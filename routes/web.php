<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return inertia('Home');
});

Route::get('/about', function () {
    return inertia('Home');
});

Route::get('/login', function () {
    return inertia('Login');
});

Route::get('/contact', function () {
    return inertia('Contact');
});

Route::get('/dashboard', function () {
    return inertia('Dashboard');
});
