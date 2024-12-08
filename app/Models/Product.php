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
        'category_id'
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

    public function category()
    {
        return $this->belongsTo(Category::class, 'category_id');
    }

    public function getAuthIdentifier()
    {
        return $this->id;
    }

    public function getInWishlistAttribute()
    {
        $userId = Auth::id();

        if (!$userId) {
            return false;
        }

        return $this->wishlists->where('user_id', $userId)->isNotEmpty();
    }

    public function ratings()
    {
        return $this->hasManyThrough(
            TransactionItemRating::class,
            TransactionItem::class,
            'product_id',
            'transaction_item_id',
            'id',
            'id'
        );
    }
}
