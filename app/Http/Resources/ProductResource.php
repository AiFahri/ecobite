<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use DateTime;
use Illuminate\Support\Facades\DB;


class ProductResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray($request): array
    {

        // dd($this->productMedia);

        return [
            'product' => [
                'id' => $this->id,
                'name' => $this->name,
                'description' => $this->description,
                'price' => $this->price,
                'discount_price' => $this->discount_price,
                'stocks' => $this->stock,
                'photo_urls' => $this->productMedia->pluck('photo_url'),
                'in_wishlist' => $this->in_wishlist,
            ],
            'tenant' => [
                'id' => $this->tenant->id,
                'name' => $this->tenant->name,
                'city' => $this->tenant->city,
                'state' => $this->tenant->state,
                'is_verified' => $this->tenant->is_verified,
                'photo_url' => $this->tenant->photo_url,

            ],
        ];
    }
}
