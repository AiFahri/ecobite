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

class CatalogController extends Controller
{
    public function index()
    {
        $products = Product::with(['productMedia', 'tenant'])
            ->withAvg('ratings', 'star')
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

        // Return data
        // CatalogResource::collection($products);

        // return ['key' => ProductResource::collection($products)->response()->getData(true)];
        return Inertia::render('Catalog', [
            'products' => $products,
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

        $similar_products = Product::with('productType')
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

        ReviewResource::collection($ratings);

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
            'meta' => [
                'from' => $ratings->firstItem(),
                'to' => $ratings->lastItem(),
                'total' => $ratings->total(),
            ]
        ]);
    }
}
