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
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Cache;

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
        $user = auth()->user();
        $auth = null;
        if ($user) {
            $auth = [
                'id' => $user->id,
                'full_name' => $user->full_name,
                'email' => $user->email,
                'photo_url' => $user->photo_url,
            ];
        }

        $address = $request->address;
        $product = $request->product;
        $quantity = $request->quantity;
        $delivery_fee = $request->delivery_fee;
        $promo_voucher = $request->promo_voucher;

        return Inertia::render('Payment', [
            'auth' => $auth,
            'address' => $address,
            'product' => $product,
            'quantity' => $quantity,
            'delivery_fee' => $delivery_fee,
            'promo_voucher' => $promo_voucher,
        ]);
    }

    public function store(Request $request)
    {
        try {
            $request->validate([
                'products' => 'required|array',
                'products.*.product_id' => 'required|exists:products,id',
                'products.*.quantity' => 'required|integer|min:1',
                'address_id' => 'required|exists:addresses,id',
                'delivery_fee' => 'required|numeric',
                'promo_voucher' => 'required|numeric'
            ]);

            $total = 0;
            $transactionId = (string) \Illuminate\Support\Str::ulid();

            // Create transaction
            $transaction = Transaction::create([
                'id' => $transactionId,
                'status' => 'waiting-for-payment',
                'payment_type' => null,
                'token' => '',
                'address_id' => $request->address_id,
                'delivery_fee' => $request->delivery_fee,
                'promo_voucher' => $request->promo_voucher,
            ]);

            // Create transaction items
            foreach ($request->products as $item) {
                $product = Product::find($item['product_id']);
                $subtotal = $product->price * $item['quantity'];
                $total += $subtotal;

                TransactionItem::create([
                    'id' => (string) \Illuminate\Support\Str::ulid(),
                    'quantity' => $item['quantity'],
                    'price' => $product->price,
                    'discount_price' => $product->discount_price,
                    'product_id' => $product->id,
                    'transaction_id' => $transactionId,
                ]);
            }

            // Update total transaction
            $transaction->total = $total + $request->delivery_fee - $request->promo_voucher;
            $transaction->save();

            // Set up Midtrans params
            $params = [
                'transaction_details' => [
                    'order_id' => $transaction->id,
                    'gross_amount' => $transaction->total,
                ],
                'customer_details' => [
                    'first_name' => Auth::user()->full_name,
                    'email' => Auth::user()->email,
                ],
            ];

            try {
                // Generate Snap token
                $snapToken = Snap::getSnapToken($params);

                $transaction->token = $snapToken;
                $transaction->save();

                return redirect()->back()->with('success', $snapToken);
            } catch (\Exception $e) {
                dd('iw');
                return redirect()->back()->with('error', 'Failed to process payment');
            }
        } catch (\Exception $e) {
            dd($e->getMessage());
            return redirect()->back()->with('error', 'Failed to create transaction');
        }
    }

    public function validatePayment(Request $request)
    {
        $payload = $request->getContent();
        $notification = json_decode($payload);

        Log::info('Midtrans Notification Body:', [
            'body' => $request->getContent()
        ]);

        $transaction = Transaction::where('id', $notification->order_id)->first();

        if (!$transaction) {
            return response()->json(['message' => 'Transaction not found'], 404);
        }

        if ($notification->transaction_status == 'settlement') {
            $transaction->status = 'waiting-for-driver';
            $transaction->payment_type = $notification->payment_type;
        } else if ($notification->transaction_status == 'expire' || $notification->transaction_status == 'cancel') {
            $transaction->status = 'cancelled';
        }

        $transaction->save();

        return response()->json(['message' => 'Notification processed successfully']);
    }

    public function liveTracking(Request $request)
    {

        $auth = auth()->user();

        $transactionID = $request->query("order_id");

        $transaction = Transaction::with([
            'transactionItems.product.tenant',
            'address.user'
        ])
            ->where('id', $transactionID)
            ->whereHas('address.user', function ($query) use ($auth) {
                $query->where('id', $auth->id);
            })
            ->first();

        if (!$transaction) {
            return redirect()->route('catalog.index');
        }

        if (Cache::has("tracking_{$transactionID}")) {
            $tracking = Cache::get("tracking_{$transactionID}");
            $transaction->transactionItems()->first()->product->tenant->latitude = $tracking['latitude'];
            $transaction->transactionItems()->first()->product->tenant->longitude = $tracking['longitude'];
        }

        return Inertia::render('Map', [
            'auth' => $auth,
            'transaction' => $transaction,
        ]);
    }

    public function updateLiveTracking(Request $request, $transactionID)
    {
        $validated = $request->validate([
            'latitude' => 'required|numeric',
            'longitude' => 'required|numeric',
        ]);

        $transaction = Transaction::find($transactionID);
        if ($transaction->status !== 'on-delivery') {
            return response()->json(['message' => 'Transaction not found'], 404);
        }

        Cache::put("tracking_{$transactionID}", [
            'latitude' => $validated['latitude'],
            'longitude' => $validated['longitude'],
        ], 300);

        return response()->json(['message' => 'Location updated']);
    }

    public function getLiveTracking($transactionID)
    {

        $auth = auth()->user();
        $transaction = Transaction::with([
            'transactionItems.product.tenant',
            'address.user'
        ])
            ->where('id', $transactionID)
            ->whereHas('address.user', function ($query) use ($auth) {
                $query->where('id', $auth->id);
            })
            ->first();
        if ($transaction->status !== 'on-delivery') {
            return response()->json(['message' => 'Transaction not found'], 404);
        }

        $c = Cache::get("tracking_{$transactionID}", [
            'latitude' => $transaction->transactionItems()->first()->product->tenant->latitude,
            'longitude' => $transaction->transactionItems()->first()->product->tenant->longitude,
        ]);

        return response()->json($c);
    }
}
