<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Model;

class ProductMedia extends Model
{
    use HasUlids;
    protected $table = 'product_media';

    public function products()
    {
        return $this->hasMany(ProductMedia::class, 'product_id', 'id');
    }

    public function getAuthIdentifier()
    {
        return $this->id;
    }
}
