<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Transaction extends Model
{
    //
    use HasFactory, HasUlids;

    protected $fillable = [
        'id',
        'total',
        'status',
        'payment_type',
        'address_id',
        'token',
    ];

    public function address()
    {
        return $this->belongsTo(Address::class, 'address_id'); // Foreign key: address_id
    }
}
