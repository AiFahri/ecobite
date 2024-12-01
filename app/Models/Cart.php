<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Model;

class Cart extends Model
{
    //
    use HasUlids;

    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}