<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class InstantBuyRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [

            'quantity' => [
                'required',
                'numeric',
                'min:1', // Minimal quantity adalah 1
            ],

            'product_id' => [
                'required',
                'string',
                'exists:products,id', // Harus ada di tabel products
                function ($attribute, $value, $fail) {
                    // Validasi stok produk
                    $product = \App\Models\Product::find($value);
                    if (!$product) {
                        $fail("The selected product does not exist.");
                    } elseif (request()->quantity > $product->stock) {
                        $fail("The requested quantity exceeds available stock.");
                    }
                },
            ],

            'voucher_id' => [
                'nullable',
                'string',
                'exists:user_vouchers,id', // Harus ada di tabel user_vouchers
                function ($attribute, $value, $fail) {
                    // Validasi voucher hanya boleh milik pengguna yang sedang login dan aktif
                    $voucher = \App\Models\UserVoucher::where('id', $value)
                        ->where('user_id', auth()->id())
                        ->where('is_active', 1)
                        ->first();

                    if (!$voucher) {
                        $fail("The selected voucher is invalid or inactive.");
                    }
                },
            ],

            'address_id' => [
                'nullable',
                'string',
                'exists:addresses,id', // Harus ada di tabel addresses
                function ($attribute, $value, $fail) {
                    // Validasi address hanya boleh milik pengguna yang sedang login
                    $address = \App\Models\Address::where('id', $value)
                        ->where('user_id', auth()->id())
                        ->first();

                    if (!$address) {
                        $fail("The selected address is invalid or does not belong to you.");
                    }
                },
            ],
        ];
    }
}
