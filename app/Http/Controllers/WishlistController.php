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

        $wishlists = Wishlist::where('user_id', $user->id)
            ->with(['product.tenant', 'product.productMedia']);

        // Filter Food Type
        if ($request->has('food_type')) {
            $foodTypes = explode(',', $request->food_type); // Memecah string menjadi array
            $wishlists->whereHas('productType', function ($query) use ($foodTypes) {
                $query->whereIn('name', $foodTypes); // Kolom `name` di tabel product_types
            });
        }

        // Filter Tenant Type
        if ($request->has('tenant_type')) {
            $tenantTypes = explode(',', $request->tenant_type); // Memecah string menjadi array
            $wishlists->whereHas('tenant', function ($query) use ($tenantTypes) {
                $query->whereHas('tenantType', function ($subQuery) use ($tenantTypes) {
                    $subQuery->whereIn('name', $tenantTypes); // `name` adalah kolom di tabel tenant_types
                });
            });
        }

        // Filter Price
        if ($request->has('min_price') || $request->has('max_price')) {
            $wishlists->where(function ($query) use ($request) {
                if ($request->filled('min_price') && $request->filled('max_price')) {
                    // Filter untuk min_price dan max_price secara bersamaan
                    $query->where(function ($subQuery) use ($request) {
                        $subQuery->whereBetween('price', [$request->min_price, $request->max_price])
                            ->orWhereBetween('discount_price', [$request->min_price, $request->max_price]);
                    });
                } elseif ($request->filled('min_price')) {
                    // Filter hanya untuk min_price
                    $query->where('price', '>=', $request->min_price)
                        ->orWhere('discount_price', '>=', $request->min_price);
                } elseif ($request->filled('max_price')) {
                    // Filter hanya untuk max_price
                    $query->where('price', '<=', $request->max_price)
                        ->orWhere('discount_price', '<=', $request->max_price);
                }
            });
        }

        // Filter Rating
        if ($request->filled('rating')) {
            $ratings = explode(',', $request->rating);
            $wishlists->havingRaw('FLOOR(COALESCE(ratings_avg_star, 0)) IN (' . implode(',', $ratings) . ')');
        }

        $wishlists = $wishlists->paginate(12);

        return Inertia::render('Wishlist', [
            'wishlists' => $wishlists,
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

        if ($wishlist) {
            $wishlist->delete();
            return redirect()->back();
        } else {
            Wishlist::create([
                'user_id' => $user->id,
                'product_id' => $productId,
            ]);
            return redirect()->back();
        }
    }
}
