<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        $user = auth()->user();
        
        $auth = null;
        if ($user) {
            $auth = [
                'id' => $user->id,
                'full_name' => $user->full_name,
                'email' => $user->email,
                'photo_url' => $user->photo_url,
            ];
        }

        return Inertia::render('Home', [
            'auth' => $auth
        ]);
    }
} 