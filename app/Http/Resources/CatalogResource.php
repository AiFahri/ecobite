<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CatalogResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'product' => [
                'id' => $this->id,
                'name' => $this->name,
                'price' => $this->price,
                'discount_price' => $this->discount_price,
                'photo_url' => $this->productMedia[0]->photo_url,
                'in_wishlist' => $this->in_wishlist,
                'average_rating' => floor($this->ratings_avg_star) ?? 0,
            ],
            'tenant' => [
                'id' => $this->tenant->id,
                'name' => $this->tenant->name,
                'is_verified' => $this->tenant->is_verified,
            ]
        ];
    }
}
