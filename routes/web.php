<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return inertia('Home');
});

Route::get('/register', function () {
    return inertia('Register');
});

Route::get('/login', function () {
    return inertia('Login');
});
