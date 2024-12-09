<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\Cart;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Models\Wishlist;

class CartController extends Controller
{
    public function index()
    {
        $user = auth()->user();
        $cartItems = [];
        $similar_products = [];

        if ($user) {
            $cartItems = Cart::with(['product.productMedia', 'product.tenant', 'product.productType'])
                ->where('user_id', $user->id)
                ->get();

            // Ambil product_type_ids dari items di cart
            $productTypeIds = $cartItems->pluck('product.product_type_id')->unique()->filter();

            if ($productTypeIds->isNotEmpty()) {
                // Ambil similar products berdasarkan product type yang ada di cart
                $similar_products = Product::with(['productMedia', 'tenant', 'productType'])
                    ->select('products.*')
                    ->join('product_types', 'products.product_type_id', '=', 'product_types.id')
                    ->join('transaction_items', 'products.id', '=', 'transaction_items.product_id')
                    ->join('transaction_item_ratings', 'transaction_items.id', '=', 'transaction_item_ratings.transaction_item_id')
                    ->whereIn('products.product_type_id', $productTypeIds)
                    ->whereNotIn('products.id', $cartItems->pluck('product.id'))
                    ->groupBy('products.id')
                    ->selectRaw('AVG(transaction_item_ratings.star) as avg_stars')
                    ->orderBy('avg_stars', 'DESC')
                    ->limit(16)
                    ->get()
                    ->map(function ($product) use ($user) {
                        return [
                            'id' => $product->id,
                            'name' => $product->name,
                            'price' => $product->price,
                            'discount_price' => $product->discount_price,
                            'photo_urls' => $product->productMedia->pluck('photo_url'),
                            'avg_stars' => round($product->avg_stars),
                            'tenant' => [
                                'name' => $product->tenant->name,
                                'is_verified' => $product->tenant->is_verified
                            ],
                            'is_wishlisted' => $product->wishlists()
                                ->where('user_id', $user->id)
                                ->exists()
                        ];
                    });
            }

            $cartItems = Cart::with(['product', 'product.productType', 'product.productMedia'])
                ->where('user_id', $user->id)
                ->get();
        }

        return Inertia::render('Cart', [
            'cartItems' => $cartItems,
            'similar_products' => $similar_products,
            'auth' => $user,
        ]);
    }

    public function addToCart(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1',
        ]);

        $user = Auth::user();

        if (!$user) {
            return response()->json(['message' => 'Unauthenticated.'], 401);
        }

        // Cek apakah produk sudah ada di cart
        $existingCart = Cart::where('user_id', $user->id)
            ->where('product_id', $request->product_id)
            ->first();

        if ($existingCart) {
            // Update quantity jika produk sudah ada
            $existingCart->quantity += $request->quantity;
            $existingCart->save();
        } else {
            // Buat cart baru jika produk belum ada
            Cart::create([
                'user_id' => $user->id,
                'product_id' => $request->product_id,
                'quantity' => $request->quantity
            ]);
        }

        return redirect()->route('cart.index')->with('success', 'Product added to cart successfully');
    }

    public function updateQuantity(Request $request, $cartId)
    {
        $request->validate([
            'quantity' => 'required|integer|min:1',
        ]);

        $cart = Cart::findOrFail($cartId);

        // Validasi stock
        $product = Product::findOrFail($cart->product_id);
        if ($request->quantity > $product->stocks) {
            return response()->json([
                'message' => 'Quantity exceeds available stock'
            ], 422);
        }

        $cart->quantity = $request->quantity;
        $cart->save();

        return response()->json([
            'success' => true,
            'quantity' => $cart->quantity
        ]);
    }

    public function removeItem($cartId)
    {
        Cart::findOrFail($cartId)->delete();
        return redirect()->back();
    }

    public function removeAll()
    {
        $user = Auth::user();
        Cart::where('user_id', $user->id)->delete();
        return redirect()->back();
    }

    public function toggleWishlist($productId)
    {
        $user = Auth::user();

        // Cek apakah produk sudah ada di wishlist
        $existingWishlist = Wishlist::where('user_id', $user->id)
            ->where('product_id', $productId)
            ->first();

        if ($existingWishlist) {
            $existingWishlist->delete();
        } else {
            Wishlist::create([
                'user_id' => $user->id,
                'product_id' => $productId
            ]);
        }

        return redirect()->back();
    }
}
