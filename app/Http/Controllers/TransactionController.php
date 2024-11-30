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

        $product = Product::with(['productType', 'productMedia'])
            ->where('id', Session::get('instant-buy')['product_id'])
            ->first();

        $product->quantity = Session::get('instant-buy')['quantity'];

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
            'product' => $product,
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
