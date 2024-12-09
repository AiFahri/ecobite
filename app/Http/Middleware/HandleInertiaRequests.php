<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;
use App\Models\Cart;

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
        return array_merge(parent::share($request), [
            'auth' => function () use ($request) {
                $user = $request->user();
                return $user ? [
                    'id' => $user->id,
                    'full_name' => $user->full_name,
                    'email' => $user->email,
                    'photo_url' => $user->photo_url,
                ] : null;
            },
            'flash' => [
                'message' => fn () => $request->session()->get('message')
            ],
            'cartItems' => function () use ($request) {
                if ($request->user()) {
                    return Cart::with(['product' => function ($query) {
                        $query->with(['product_media', 'product_type'])
                            ->select(['id', 'name', 'price', 'stock', 'product_type_id']);
                    }])->where('user_id', $request->user()->id)->get();
                }
                return [];
            },
        ]);
    }
}
