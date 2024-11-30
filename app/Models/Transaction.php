<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUlids;

class Transaction extends Model
{
    //
    use HasUlids;
    public function address()
    {
        return $this->belongsTo(Address::class, 'address_id'); // Foreign key: address_id
    }
}
