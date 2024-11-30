<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use Inertia\Inertia;

class PaymentController extends Controller
{
    //
    public function index(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1',
        ]);

        $product = Product::with(['tenant', 'productMedia'])->findOrFail($request->product_id);
        
        return Inertia::render('Payment', [
            'product' => [
                'id' => $product->id,
                'name' => $product->name,
                'price' => $product->price,
                'photo_url' => $product->productMedia->first()?->photo_url,
                'tenant' => [
                    'name' => $product->tenant->name,
                    'city' => $product->tenant->city,
                    'state' => $product->tenant->state,
                ],
            ],
            'quantity' => (int) $request->quantity,
            'delivery_fee' => 10000,
            'promo_voucher' => 10000,
        ]);
    }
}
