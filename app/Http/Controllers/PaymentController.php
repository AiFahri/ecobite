<?php

namespace App\Http\Controllers;

use App\Http\Requests\InstantBuyRequest;
use App\Http\Requests\PaymentRequest;
use App\Models\Transaction;
use App\Models\TransactionItem;
use Illuminate\Http\Request;
use App\Models\Product;
use Midtrans\Snap;
use Midtrans\Config;
use Inertia\Inertia;

class PaymentController extends Controller
{
    //

    public function __construct()
    {
        Config::$serverKey = config('midtrans.server_key');
        Config::$isProduction = config('midtrans.is_production');
        Config::$isSanitized = config('midtrans.is_sanitized');
        Config::$is3ds = config('midtrans.is_3ds');
    }

    public function index(Request $request)
    {
        $product = Product::with('tenant')->findOrFail($request->product_id);
        $quantity = $request->quantity;
        
        // Nilai default untuk delivery fee dan promo voucher
        $delivery_fee = 10000;
        $promo_voucher = 10000;

        return inertia('Payment', [
            'product' => $product,
            'quantity' => $quantity,
            'delivery_fee' => $delivery_fee,
            'promo_voucher' => $promo_voucher
        ]);
    }

    public function store(PaymentRequest $request)
    {
        $request->validated();

        $product = Product::with('tenant', 'productMedia')->find($request['product_id']);
        $total = $product->discount_price * $request['quantity'];

        $transactionId = (string) \Illuminate\Support\Str::ulid();
        $transaction = Transaction::create([
            'id' => $transactionId,
            'total' => $total,
            'status' => 'waiting-for-payment',
            'payment_type' => null,
            'token' => '',
            'created_at' => now(),
            'updated_at' => now(),
            'address_id' => $request->address_id,
        ]);

        TransactionItem::create([
            'id' => (string) \Illuminate\Support\Str::ulid(),
            'quantity' => $request['quantity'],
            'price' => $product->price * $product['quantity'],
            'discount_price' => $product->discount_price * $product['quantity'],
            'product_id' => $product['id'],
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

        // Format response sesuai struktur yang diinginkan
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
            'transaction' => [
                'id' => $transaction->id,
                'snap_token' => $snapToken,
            ],
        ]);
    }
}
