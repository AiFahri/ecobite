<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
<<<<<<< HEAD
use Illuminate\Support\Facades\Log;
=======
>>>>>>> a0ea1417d677445d19065936d095f5f33a5ec0e5
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
<<<<<<< HEAD
        Log::info('Current user:', ['user' => $request->user()]);
        
        return array_merge(parent::share($request), [
            'auth' => [
                'user' => $request->user() ? [
                    'id' => $request->user()->id,
                    'name' => $request->user()->name,
                    'email' => $request->user()->email,
                    'profile_photo_url' => $request->user()->profile_photo_path 
                        ? asset('storage/' . $request->user()->profile_photo_path)
                        : 'https://ui-avatars.com/api/?name=' . urlencode($request->user()->name),
                ] : null
            ],
            'flash' => [
                'message' => fn () => $request->session()->get('message')
            ],
        ]);
=======
        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user(),
            ],
            'flash' => [
                'success' => session('success'),
                'error' => session('error'),
            ],
        ];
>>>>>>> a0ea1417d677445d19065936d095f5f33a5ec0e5
    }
}
