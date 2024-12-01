<?php

namespace App\Http\Controllers;

use App\Http\Requests\InstantBuyRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Address;
use App\Models\Product;
use App\Models\Transaction;
use App\Models\TransactionItem;
use App\Models\UserVoucher;
use Illuminate\Support\Facades\Session;
use League\Geotools\Coordinate\Coordinate;
use League\Geotools\Distance\Distance;
use League\Geotools\Distance\Vincenty;
use Inertia\Inertia;
use Midtrans\Snap;

class TransactionController extends Controller
{
    public function __construct()
    {
        \Midtrans\Config::$serverKey = config('midtrans.server_key');
        \Midtrans\Config::$isProduction = config('midtrans.is_production');
        \Midtrans\Config::$isSanitized = config('midtrans.is_sanitized');
        \Midtrans\Config::$is3ds = config('midtrans.is_3ds');
    }

    public function showInstantBuy(Request $request)
    {
        return Inertia::render('Payment/Confirmation', [
            'product' => [
                'id' => $request->product['id'],
                'name' => $request->product['name'],
                'price' => $request->product['price'],
                'photo_url' => $request->product['photo_url'],
                'tenant' => [
                    'name' => $request->product['tenant']['name'],
                    'city' => $request->product['tenant']['city'],
                    'state' => $request->product['tenant']['state'],
                ],
            ],
            'quantity' => (int) $request->quantity,
            'delivery_fee' => 10000,
            'promo_voucher' => 10000,
        ]);
    }

    private function haversine($latitudeFrom, $longitudeFrom, $latitudeTo, $longitudeTo)
    {
        $earthRadius = 6371;

        $latFrom = deg2rad($latitudeFrom);
        $lonFrom = deg2rad($longitudeFrom);
        $latTo = deg2rad($latitudeTo);
        $lonTo = deg2rad($longitudeTo);

        $latDelta = $latTo - $latFrom;
        $lonDelta = $lonTo - $lonFrom;

        $angle = 2 * asin(sqrt(pow(sin($latDelta / 2), 2) +
            cos($latFrom) * cos($latTo) * pow(sin($lonDelta / 2), 2)));

        $distanceInKilometers = $earthRadius * $angle;

        return $distanceInKilometers * 1000;
    }

    public function storeInstantBuy(InstantBuyRequest $request)
    {
        $request->validated();

        $product = Product::with('tenant', 'productMedia')->find($request['product_id']);
        
        return Inertia::render('Payment/Confirmation', [
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
            'quantity' => (int) $request['quantity'],
            'delivery_fee' => 10000,
            'promo_voucher' => 10000,
        ]);
    }

    public function processPayment(Request $request)
    {
        $request->validate([
            'product_id' => 'required',
            'quantity' => 'required|integer|min:1',
            'address_id' => 'required|exists:addresses,id',
        ]);

        $product = Product::with('tenant', 'productMedia')->find($request->product_id);
        $total = $product->discount_price * $request->quantity;

        $transactionId = (string) \Illuminate\Support\Str::ulid();
        $transaction = Transaction::create([
            'id' => $transactionId,
            'total' => $total,
            'status' => 'waiting-for-payment',
            'payment_type' => null,
            'token' => '',
            'address_id' => $request->address_id,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        TransactionItem::create([
            'id' => (string) \Illuminate\Support\Str::ulid(),
            'quantity' => $request->quantity,
            'price' => $product->price * $request->quantity,
            'discount_price' => $product->discount_price * $request->quantity,
            'product_id' => $product->id,
            'transaction_id' => $transactionId,
        ]);

        $params = [
            'transaction_details' => [
                'order_id' => $transaction->id,
                'gross_amount' => $transaction->total,
            ],
        ];

        $snapToken = Snap::getSnapToken($params);

        $transaction->token = $snapToken;
        $transaction->save();

        return response()->json([
            'snap_token' => $snapToken,
            'transaction_id' => $transaction->id
        ]);
    }
}
