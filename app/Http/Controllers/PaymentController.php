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
                return redirect()->back()->with('error', 'Failed to process payment');
            }

        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Failed to create transaction');
        }
    }
}
