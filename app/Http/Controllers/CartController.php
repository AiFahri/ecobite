<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\Cart;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Models\Wishlist;
use App\Http\Resources\ProductResource;

class CartController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $cartItems = [];
        $similar_products = [];

        if ($user) {
            $cartItems = Cart::with(['product' => function ($query) use ($user) {
                $query->with(['productMedia', 'tenant', 'productType'])
                    ->withCount(['wishlists as is_wishlisted' => function ($query) use ($user) {
                        $query->where('user_id', $user->id);
                    }]);
            }])->where('user_id', $user->id)->get();

            // Transform cart items untuk menambahkan is_wishlisted sebagai boolean
            $cartItems = $cartItems->map(function ($item) {
                $item->product->is_wishlisted = (bool) $item->product->is_wishlisted;
                return $item;
            });

            // Get similar products
            $similar_products = $this->getSimilarProducts($user);
        }

        return Inertia::render('Cart', [
            'cartItems' => $cartItems,
            'similar_products' => $similar_products,
            'auth' => $user
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
        try {
            $user = auth()->user();
            $cart = Cart::findOrFail($cartId);
            $product = $cart->product;

            if ($request->quantity > $product->stock) {
                return back()->with('error', 'Quantity exceeds available stock');
            }

            // Update quantity
            $cart->quantity = $request->quantity;
            $cart->save();

            return back()->with('success', 'Cart updated successfully');

        } catch (\Exception $e) {
            return back()->with('error', 'Failed to update cart');
        }
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

    public function update(Request $request, $id)
    {
        try {
            $user = auth()->user();
            $cart = Cart::findOrFail($id);
            $product = $cart->product;
            
            // Validasi stok
            if ($request->quantity > $product->stock) {
                return Inertia::render('Cart', [
                    'cartItems' => Cart::with(['product.productMedia', 'product.productType'])
                        ->where('user_id', $user->id)
                        ->get(),
                    'similar_products' => $this->getSimilarProducts($user),
                    'auth' => $user,
                    'errors' => [
                        'message' => 'Quantity exceeds available stock'
                    ]
                ]);
            }

            // Hitung perubahan stok
            $quantityDiff = $request->quantity - $cart->quantity;
            
            // Update quantity cart
            $cart->quantity = $request->quantity;
            $cart->save();

            // Update stock produk
            $product->stock = $product->stock - $quantityDiff;
            $product->save();

            return Inertia::render('Cart', [
                'cartItems' => Cart::with(['product.productMedia', 'product.productType'])
                    ->where('user_id', $user->id)
                    ->get(),
                'similar_products' => $this->getSimilarProducts($user),
                'auth' => $user,
                'success' => 'Cart updated successfully'
            ]);

        } catch (\Exception $e) {
            return Inertia::render('Cart', [
                'cartItems' => Cart::with(['product.productMedia', 'product.productType'])
                    ->where('user_id', $user->id)
                    ->get(),
                'similar_products' => $this->getSimilarProducts($user),
                'auth' => $user,
                'errors' => [
                    'message' => 'Failed to update cart'
                ]
            ]);
        }
    }

    // Helper method untuk mendapatkan similar products
    private function getSimilarProducts($user)
    {
        $cartItems = Cart::where('user_id', $user->id)->get();
        
        if ($cartItems->isEmpty()) {
            return [
                'data' => [],
                'message' => 'Add items to your cart to see similar products'
            ];
        }
        
        $productTypeIds = $cartItems->pluck('product.product_type_id')->unique()->filter();
        
        if ($productTypeIds->isEmpty()) {
            return [
                'data' => [],
                'message' => 'No similar products found'
            ];
        }

        $similar_products = Product::with(['productMedia', 'tenant', 'productType', 'ratings'])
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
            ->get();

        return [
            'data' => $similar_products->map(function ($product) use ($user) {
                return [
                    'id' => $product->id,
                    'name' => $product->name,
                    'image' => $product->productMedia[0]->photo_url ?? null,
                    'price' => $product->price,
                    'oldPrice' => $product->discount_price,
                    'store' => $product->tenant->name,
                    'rating' => round($product->avg_stars),
                    'verified' => $product->tenant->is_verified,
                    'photo_urls' => $product->productMedia->pluck('photo_url'),
                    'tenant' => [
                        'name' => $product->tenant->name,
                        'is_verified' => $product->tenant->is_verified
                    ],
                    'avg_stars' => round($product->avg_stars),
                    'is_wishlisted' => $product->wishlists()
                        ->where('user_id', $user->id)
                        ->exists()
                ];
            }),
            'message' => null
        ];
    }
}
