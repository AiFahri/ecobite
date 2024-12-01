<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Wishlist;
use Illuminate\Support\Facades\DB;
use App\Models\TenantType;
use App\Models\ProductType;

class WishlistController extends Controller
{

    public function show()
    {
        $user = auth()->user();

        $wishlists = Wishlist::where('user_id', $user->id)
            ->with('product')
            ->paginate(12);

        $productTypes = ProductType::withCount('products')
            ->orderBy('products_count', 'DESC')
            ->get(['name'])->map(function ($type) {
                return [
                    'name' => $type->name,
                    'total' => $type->products_count,
                ];
            });

        $tenantTypes = TenantType::orderBy('created_at')->pluck('name');

        $subquery = DB::table('products as p')
            ->join('transaction_items as ti', 'p.id', '=', 'ti.product_id')
            ->join('transaction_item_ratings as tir', 'ti.id', '=', 'tir.transaction_item_id')
            ->selectRaw('FLOOR(AVG(tir.star)) as rating_group')
            ->groupBy('ti.product_id');

        $starCount = DB::table(DB::raw("({$subquery->toSql()}) as grouped_ratings"))
            ->mergeBindings($subquery)
            ->selectRaw('rating_group, COUNT(*) as total_products')
            ->groupBy('rating_group')
            ->orderBy('rating_group', 'DESC')
            ->get();

        return response()->json([
            'products' => $wishlists,
            'productTypes' => $productTypes,
            'tenantTypes' => $tenantTypes,
            'starCount' => $starCount,
        ]);
    }

    public function toggleWishlist(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
        ]);

        $user = $request->user(); // Mendapatkan user yang login
        $productId = $request->input('product_id');

        // Cari apakah produk sudah ada di wishlist
        $wishlist = Wishlist::where('user_id', $user->id)
            ->where('product_id', $productId)
            ->first();

        if ($wishlist) {
            // Jika ada, hapus dari wishlist
            $wishlist->delete();
            return response()->json(['message' => 'Product removed from wishlist.']);
        } else {
            // Jika tidak ada, tambahkan ke wishlist
            Wishlist::create([
                'user_id' => $user->id,
                'product_id' => $productId,
            ]);
            return response()->json(['message' => 'Product added to wishlist.']);
        }
    }
}
