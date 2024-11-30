<?php

namespace App\Http\Controllers;

use App\Http\Requests\InstantBuyRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Address;
use App\Models\Product;
use App\Models\UserVoucher;
use Illuminate\Support\Facades\Session;

class TransactionController extends Controller
{
    //

    public function showInstantBuy()
    {

        $addresses = Address::where('user_id', Auth::id())
            ->orderByDesc('is_primary')
            ->get();

        // Proses setiap produk dari session
        $products = [];
        foreach (Session::get('instant-buy')['products'] as $item) {
            $product = Product::with(['productType', 'productMedia'])
                ->where('id', $item['product_id'])
                ->first();

            if ($product) {
                // Tambahkan quantity ke produk
                $product->quantity = $item['quantity'] ?? 1; // Default quantity = 1 jika tidak ada
                $products[] = $product;
            }
        }


        $voucherId = Session::get('instant-buy')['voucher_id'] ?? null;

        $vouchers = $voucherId
            ? UserVoucher::with('voucher')
            ->where('user_id', Auth::id())
            ->where('id', $voucherId)
            ->where('is_active', true)
            ->get()
            : null;

        return response()->json([
            'addresses' => $addresses,
            'products' => $products,
            'voucher' => $vouchers,
        ]);
    }

    public function storeInstantBuy(InstantBuyRequest $request)
    {

        $validated = $request->validated();

        session()->put('instant-buy', $validated);

        return redirect()->route('instant-buy');
    }
}
