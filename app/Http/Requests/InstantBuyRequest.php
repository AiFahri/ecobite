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
            'products' => ['required', 'array', 'min:1'],
            'products.*.product_id' => [
                'required',
                'string',
                'exists:products,id',
                function ($attribute, $value, $fail) {
                    $index = explode('.', $attribute)[1];
                    $quantity = request()->input("products.{$index}.quantity");
                    
                    $product = \App\Models\Product::find($value);
                    if (!$product) {
                        $fail("The selected product does not exist.");
                    } elseif ($quantity > $product->stock) {
                        $fail("The requested quantity exceeds available stock.");
                    }
                },
            ],
            'products.*.quantity' => [
                'required',
                'numeric',
                'min:1',
            ],
            'delivery_fee' => ['required', 'numeric', 'min:0'],
            'promo_voucher' => ['nullable', 'numeric', 'min:0'],
        ];
    }
}
