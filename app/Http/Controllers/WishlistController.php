<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Wishlist;
use Illuminate\Support\Facades\DB;
use App\Models\TenantType;
use App\Models\ProductType;
use Inertia\Inertia;

class WishlistController extends Controller
{
    public function index() {}

    public function show(Request $request)
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

        // Base query untuk wishlist
        $wishlists = Wishlist::where('user_id', $user->id)
            ->with(['product' => function ($query) {
                $query->with(['tenant', 'productMedia', 'productType'])
                    ->withAvg('ratings', 'star');
            }])
            ->whereHas('product');

        // Filter Food Type
        if ($request->filled('food_type')) {
            $foodTypes = explode(',', $request->food_type);
            $wishlists->whereHas('product.productType', function ($query) use ($foodTypes) {
                $query->whereIn('name', $foodTypes);
            });
        }

        // Filter Tenant Type
        if ($request->filled('tenant_type')) {
            $tenantTypes = explode(',', $request->tenant_type);
            $wishlists->whereHas('product.tenant.tenantType', function ($query) use ($tenantTypes) {
                $query->whereIn('name', $tenantTypes);
            });
        }

        // Filter Price
        if ($request->filled('min_price') || $request->filled('max_price')) {
            $wishlists->whereHas('product', function ($query) use ($request) {
                if ($request->filled('min_price') && $request->filled('max_price')) {
                    $query->whereBetween('price', [$request->min_price, $request->max_price]);
                } elseif ($request->filled('min_price')) {
                    $query->where('price', '>=', $request->min_price);
                } elseif ($request->filled('max_price')) {
                    $query->where('price', '<=', $request->max_price);
                }
            });
        }

        // Filter Rating - Perbaikan query
        if ($request->filled('rating')) {
            $ratings = explode(',', $request->rating);
            $wishlists->whereHas('product', function ($query) use ($ratings) {
                $query->whereIn(
                    DB::raw('COALESCE(FLOOR((SELECT AVG(star) FROM transaction_item_ratings 
                    INNER JOIN transaction_items ON transaction_items.id = transaction_item_ratings.transaction_item_id 
                    WHERE transaction_items.product_id = products.id)), 0)'),
                    $ratings
                );
            });
        }

        // Get product types dengan count - Hanya untuk produk di wishlist
        $productTypes = ProductType::whereHas('products', function($query) use ($user) {
            $query->whereHas('wishlists', function($q) use ($user) {
                $q->where('user_id', $user->id);
            });
        })
        ->withCount(['products' => function($query) use ($user) {
            $query->whereHas('wishlists', function($q) use ($user) {
                $q->where('user_id', $user->id);
            });
        }])
        ->orderBy('products_count', 'DESC')
        ->get(['name'])
        ->map(function ($type) {
            return [
                'name' => $type->name,
                'total' => $type->products_count,
            ];
        });

        // Get tenant types
        $tenantTypes = TenantType::orderBy('created_at')->pluck('name');

        // Get star count - Perbaikan untuk akurasi rating
        $starCount = collect(range(1, 5))->map(function($rating) use ($user) {
            $count = DB::table('products')
                ->join('wishlists', 'products.id', '=', 'wishlists.product_id')
                ->where('wishlists.user_id', $user->id)
                ->whereRaw('
                    COALESCE(FLOOR((
                        SELECT AVG(star) 
                        FROM transaction_item_ratings 
                        INNER JOIN transaction_items ON transaction_items.id = transaction_item_ratings.transaction_item_id 
                        WHERE transaction_items.product_id = products.id
                    )), 0) = ?
                ', [$rating])
                ->count();

            return [
                'rating_group' => $rating,
                'total_products' => $count
            ];
        })->sortByDesc('rating_group')->values();

        // Alternative approach jika yang di atas masih error
        if ($starCount->sum('total_products') === 0) {
            $starCount = collect(range(1, 5))->map(function($rating) {
                return [
                    'rating_group' => $rating,
                    'total_products' => 0
                ];
            })->sortByDesc('rating_group')->values();
        }

        // Pagination dengan transformasi data
        $wishlists = $wishlists->paginate(12)->withQueryString();
        
        // Transform data pagination untuk frontend
        $wishlists->through(function ($wishlist) {
            return [
                'id' => $wishlist->id,
                'product' => [
                    'id' => $wishlist->product->id,
                    'name' => $wishlist->product->name,
                    'price' => $wishlist->product->price,
                    'original_price' => $wishlist->product->original_price,
                    'tenant' => [
                        'name' => $wishlist->product->tenant?->name,
                        'is_verified' => $wishlist->product->tenant?->is_verified,
                    ],
                    'ratings_avg_star' => round($wishlist->product->ratings_avg_star ?? 0),
                    'product_media' => $wishlist->product->productMedia->map(function ($media) {
                        return [
                            'photo_url' => $media->photo_url
                        ];
                    }),
                ],
            ];
        });

        return Inertia::render('Wishlist', [
            'wishlists' => $wishlists,
            'productTypes' => $productTypes,
            'tenantTypes' => $tenantTypes,
            'starCount' => $starCount,
            'auth' => $auth,
        ]);
    }

    public function toggleWishlist(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
        ]);

        $user = $request->user();
        $productId = $request->input('product_id');

        $wishlist = Wishlist::where('user_id', $user->id)
            ->where('product_id', $productId)
            ->first();

        try {
            if ($wishlist) {
                $wishlist->delete();
                return redirect()->back()->with('success', 'Product removed from wishlist');
            } else {
                Wishlist::create([
                    'user_id' => $user->id,
                    'product_id' => $productId,
                ]);
                return redirect()->back()->with('success', 'Product added to wishlist');
            }
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Failed to toggle wishlist');
        }
    }
}
