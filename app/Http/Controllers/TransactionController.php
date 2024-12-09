<?php

namespace App\Http\Controllers;

use App\Http\Requests\InstantBuyRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Address;
use App\Models\Product;
use App\Models\UserVoucher;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;
use League\Geotools\Coordinate\Coordinate;
use League\Geotools\Distance\Distance;
use League\Geotools\Distance\Vincenty;

class TransactionController extends Controller
{
    //

    public function index()
    {
        $transactions = \App\Models\Transaction::query()
            ->with([
                'transactionItems.product.productType',
                'transactionItems.product.productMedia',
                'transactionItems.product.tenant',
                'address.user'
            ])
            ->whereHas('address.user', function ($query) {
                $query->where('id', Auth::id());
            })
            ->orderBy('created_at', 'desc')
            ->paginate(5);

        return Inertia::render('Transactions', [
            'auth' => Auth::user(),
            'transactions' => $transactions
        ]);
    }

    public function showInstantBuy()
    {
        $user = Auth::user();
        
        if (!Session::has('instant-buy')) {
            return redirect()->route('cart.index');
        }

        $instantBuy = Session::get('instant-buy');
        $products = [];
        $total = 0;

        // Load products data
        foreach ($instantBuy['products'] as $item) {
            $product = Product::with(['tenant', 'productType', 'productMedia'])
                ->find($item['product_id']);
                
            if ($product) {
                $product->quantity = $item['quantity'];
                $products[] = $product;
                $total += $product->price * $item['quantity'];
            }
        }

        // Get primary address
        $address = Address::where('user_id', $user->id)
            ->orderByDesc('is_primary')
            ->first();

        return Inertia::render('Payment', [
            'auth' => $user,
            'products' => $products,
            'address' => $address,
            'total' => $total,
            'delivery_fee' => $instantBuy['delivery_fee'] ?? 0,
            'promo_voucher' => $instantBuy['promo_voucher'] ?? 0
        ]);
    }

    private function haversine($latitudeFrom, $longitudeFrom, $latitudeTo, $longitudeTo)
    {
        $earthRadius = 6371; // Radius bumi dalam kilometer

        // Konversi derajat ke radian
        $latFrom = deg2rad($latitudeFrom);
        $lonFrom = deg2rad($longitudeFrom);
        $latTo = deg2rad($latitudeTo);
        $lonTo = deg2rad($longitudeTo);

        // Hitung delta latitude dan longitude
        $latDelta = $latTo - $latFrom;
        $lonDelta = $lonTo - $lonFrom;

        // Formula haversine
        $angle = 2 * asin(sqrt(pow(sin($latDelta / 2), 2) +
            cos($latFrom) * cos($latTo) * pow(sin($lonDelta / 2), 2)));

        $distanceInKilometers = $earthRadius * $angle;

        // Ubah ke meter
        return $distanceInKilometers * 1000; // Hasil dalam meter
    }


    public function storeInstantBuy(InstantBuyRequest $request)
    {
        $validated = $request->validated();
        
        // Pastikan data yang disimpan ke session sesuai format
        $instantBuy = [
            'products' => $validated['products'],
            'delivery_fee' => $validated['delivery_fee'],
            'promo_voucher' => $validated['promo_voucher']
        ];
        
        session()->put('instant-buy', $instantBuy);
        return redirect()->route('instant-buy');
    }
}
