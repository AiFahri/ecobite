<?php

namespace App\Http\Controllers;

use App\Models\TenantType;
use App\Models\Product;
use App\Models\ProductType;
use App\Http\Resources\ProductResource;
use Illuminate\Support\Facades\DB;

class CatalogController extends Controller
{
    public function index()
    {
        $products = Product::with(['productMedia', 'tenant'])->withAvg('ratings', 'star')->paginate(18);

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
            ->mergeBindings($subquery) // Pastikan parameter dari subquery terhubung
            ->selectRaw('rating_group, COUNT(*) as total_products')
            ->groupBy('rating_group')
            ->orderBy('rating_group', 'DESC')
            ->get();

        // Return data
        ProductResource::collection($products);
        return response()->json(['products' => $products, 'product_types' => $productTypes, 'tenant_types' => $tenantTypes, 'star_count' => $starCount]);
        // return ['key' => ProductResource::collection($products)->response()->getData(true)];
    }
}
