<?php

namespace App\Http\Controllers;

use App\Http\Requests\InstantBuyRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Address;
use App\Models\Product;
use App\Models\UserVoucher;
use Illuminate\Support\Facades\Session;
use League\Geotools\Coordinate\Coordinate;
use League\Geotools\Distance\Distance;
use League\Geotools\Distance\Vincenty;

class TransactionController extends Controller
{
    //

    public function showInstantBuy()
    {

        if (!data_get(Session::get('instant-buy'), 'address_id')) {
            $address = Address::where('user_id', Auth::id())
                ->orderByDesc('is_primary')
                ->first();
        } else {
            // Ambil address_id dari session dan cari Address-nya di database
            $addressId = data_get(Session::get('instant-buy'), 'address_id');
            $address = Address::find($addressId); // Mengembalikan object Address
        }

        $product = Product::with(['tenant', 'productType', 'productMedia'])
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

        $dist = round($this->haversine($product->tenant->latitude, $product->tenant->longitude, $address->latitude, $address->longitude), 0);
        $address->distance = $dist > 1000 ? round($dist / 1000, 2) : $dist;

        $addresses = Address::where('user_id', Auth::id())
            ->where('id', '!=', $address->id)
            ->get();

        return response()->json([
            'address' => $address,
            'addresses' => $addresses,
            'product' => $product,
            'voucher' => $vouchers,
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

        session()->put('instant-buy', $validated);

        return redirect()->route('instant-buy');
    }
}
