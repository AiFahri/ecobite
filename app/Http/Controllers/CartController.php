<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\Cart;
use Illuminate\Support\Facades\Auth;

class CartController extends Controller
{
    //

    public function show()
    {

        $carts = Cart::with(['product.productMedia'])
            ->where('user_id', Auth::id())
            ->get();

        $similar_products = Product::with('productType')
            ->select('products.*')
            ->join('product_types', 'products.product_type_id', '=', 'product_types.id')
            ->join('transaction_items', 'products.id', '=', 'transaction_items.product_id')
            ->join('transaction_item_ratings', 'transaction_items.id', '=', 'transaction_item_ratings.transaction_item_id')
            ->groupBy('products.id')
            ->selectRaw('FLOOR(AVG(transaction_item_ratings.star)) as avg_stars')
            ->orderBy('avg_stars', 'DESC')
            ->limit(16)
            ->get();

        return response()->json(['carts' => $carts, 'similar_products' => $similar_products]);
    }
}
