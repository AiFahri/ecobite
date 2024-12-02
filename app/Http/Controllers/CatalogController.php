<?php

namespace App\Http\Controllers;

use App\Http\Resources\CatalogResource;
use App\Models\TenantType;
use App\Models\Product;
use App\Models\ProductType;
use App\Http\Resources\ProductResource;
use App\Http\Resources\ReviewResource;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use App\Models\Wishlist;
use Illuminate\Http\Request;

class CatalogController extends Controller
{
    public function index(Request $request)
    {
        $user = auth()->user();
        $wishlists = [];

        if ($user) {
            $wishlists = Wishlist::where('user_id', $user->id)
                ->pluck('product_id')
                ->toArray();
        }

        $products = Product::with(['productMedia', 'tenant'])
            ->withAvg('ratings', 'star');

        // Filter Food Type
        if ($request->has('food_type')) {
            $foodTypes = explode(',', $request->food_type); // Memecah string menjadi array
            $products->whereHas('productType', function ($query) use ($foodTypes) {
                $query->whereIn('name', $foodTypes); // Kolom `name` di tabel product_types
            });
        }

        // Filter Tenant Type
        if ($request->has('tenant_type')) {
            $tenantTypes = explode(',', $request->tenant_type); // Memecah string menjadi array
            $products->whereHas('tenant', function ($query) use ($tenantTypes) {
                $query->whereHas('tenantType', function ($subQuery) use ($tenantTypes) {
                    $subQuery->whereIn('name', $tenantTypes); // `name` adalah kolom di tabel tenant_types
                });
            });
        }

        // Filter Price
        if ($request->has('min_price') || $request->has('max_price')) {
            $products->where(function ($query) use ($request) {
                if ($request->filled('min_price') && $request->filled('max_price')) {
                    $query->whereBetween('price', [
                        $request->min_price, 
                        $request->max_price
                    ]);
                } elseif ($request->filled('min_price')) {
                    $query->where('price', '>=', $request->min_price);
                } elseif ($request->filled('max_price')) {
                    $query->where('price', '<=', $request->max_price);
                }
            });
        }

        // Filter Rating
        if ($request->filled('rating')) {
            $ratings = explode(',', $request->rating);
            $products->havingRaw('FLOOR(COALESCE(ratings_avg_star, 0)) IN (' . implode(',', $ratings) . ')');
        }

        $productsData = $products->paginate(12);

        $productsData->through(function ($product) use ($wishlists) {
            $product->is_wishlisted = in_array($product->id, $wishlists);
            return $product;
        });

        // dd($products);

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

        return Inertia::render('Catalog', [
            'products' => $productsData,
            'wishlists' => $wishlists,
            'productTypes' => $productTypes,
            'tenantTypes' => $tenantTypes,
            'starCount' => $starCount,
            'filters' => request()->only(['search', 'type', 'rating'])
        ]);
    }

    public function show($productID)
    {
        $product = Product::with(['tenant', 'productMedia'])->findOrFail($productID);

        // Paginate ratings
        $ratings = $product->ratings()
            ->with(['transactionItem.transaction.address.user'])
            ->paginate(5);

        // Ambil similar products
        $similar_products = Product::with(['productMedia', 'tenant', 'productType'])
            ->select('products.*')
            ->join('product_types', 'products.product_type_id', '=', 'product_types.id')
            ->join('transaction_items', 'products.id', '=', 'transaction_items.product_id')
            ->join('transaction_item_ratings', 'transaction_items.id', '=', 'transaction_item_ratings.transaction_item_id')
            ->where('product_types.name', $product->productType->name)
            ->where('products.id', '!=', $productID)
            ->groupBy('products.id')
            ->selectRaw('AVG(transaction_item_ratings.star) as avg_stars')
            ->orderBy('avg_stars', 'DESC')
            ->limit(16)
            ->get();

        // Transform similar products untuk frontend
        $similar_products = $similar_products->map(function ($product) {
            $userId = auth()->user()?->id;
            
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
                'is_wishlisted' => $userId ? $product->wishlists()
                    ->where('user_id', $userId)
                    ->exists() : false
            ];
        });

        return Inertia::render('ProductDetail', [
            'product' => new ProductResource($product),
            'reviews' => [
                'data' => $ratings->items(),
                'links' => $ratings->links(),
                'meta' => [
                    'from' => $ratings->firstItem(),
                    'to' => $ratings->lastItem(),
                    'total' => $ratings->total(),
                ]
            ],
            'similar_products' => $similar_products
        ]);
    }
}
