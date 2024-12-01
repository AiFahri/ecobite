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
    public function index()
    {
        $user = auth()->user();

        $wishlists = Wishlist::where('user_id', $user->id)
            ->with(['product.tenant', 'product.productMedia'])
            ->paginate(12);

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
