<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Model;

class ProductType extends Model
{
    use HasUlids;
    protected $table = 'product_types';

    public function products()
    {
        return $this->hasMany(Product::class, 'product_type_id');
    }
}
