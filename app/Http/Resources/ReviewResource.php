<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Datetime;

class ReviewResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray($request): array
    {
        $transactionItem = $this->transactionItem;
        $transaction = $transactionItem->transaction ?? null;
        $address = $transaction?->address ?? null;

        return [
            'id' => $this->id,
            'full_name' => $address?->user?->full_name ?? null,
            'city' => $address?->city ?? null,
            'state' => $address?->state ?? null,
            'feedback' => $this->feedback,
            'star' => $this->star,
            'photo_url' => $address?->user?->photo_url ?? null,
            'created_at' => (new DateTime($this->created_at))->format('d F Y'),
        ];
    }
}
