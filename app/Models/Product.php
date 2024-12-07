<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class Product extends Model
{
    use HasUlids;
    protected $table = 'products';

    protected $fillable = [
        'name',
        'price',
        'quantity',
    ];

    public function transactionItems()
    {
        return $this->hasMany(TransactionItem::class, 'product_id');
    }

    public function productMedia()
    {
        return $this->hasMany(ProductMedia::class, 'product_id', 'id')->orderBy('created_at');
    }

    public function tenant()
    {
        return $this->belongsTo(Tenant::class, 'tenant_id', 'id');
    }

    public function productType()
    {
        return $this->belongsTo(ProductType::class, 'product_type_id');
    }

    public function wishlists()
    {
        return $this->hasMany(Wishlist::class, 'product_id', 'id');
    }

    public function getAuthIdentifier()
    {
        return $this->id; // Misalnya, jika kolom ULID di model adalah `ulid`
    }

    public function getInWishlistAttribute()
    {
        $userId = Auth::id(); // Mendapatkan ID user yang login

        if (!$userId) {
            return false; // Jika tidak ada user login, kembalikan false
        }

        return $this->wishlists->where('user_id', $userId)->isNotEmpty();
    }

    public function ratings()
    {
        return $this->hasManyThrough(
            TransactionItemRating::class, // Target model
            TransactionItem::class,      // Intermediate model
            'product_id',                // Foreign key on TransactionItem
            'transaction_item_id',       // Foreign key on TransactionItemRating
            'id',                        // Local key on Product
            'id'                         // Local key on TransactionItem
        );
    }
}
