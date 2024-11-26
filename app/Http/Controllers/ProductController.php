<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Http\Resources\ProductResource;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::with('type')->get();

        // Return data
        return response()->json(ProductResource::collection($products));
    }
}
