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
            'products' => ['required', 'array', 'min:1'], // Harus berupa array dengan minimal satu produk
            'products.*.product_id' => ['required', 'exists:products,id'], // Validasi setiap product_id harus ada di tabel products
            'products.*.quantity' => ['required', 'integer', 'min:1'], // Validasi setiap quantity harus angka bulat minimal 1
            'voucher_id' => ['nullable', 'exists:user_vouchers,id'], // Voucher opsional, tetapi harus valid jika ada
        ];
    }
}
