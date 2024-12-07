<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Model;

class Voucher extends Model
{
    //
    use HasUlids;

    public function users()
    {
        return $this->belongsToMany(User::class, 'user_vouchers', 'voucher_id', 'user_id')
            ->withPivot('is_active')
            ->withTimestamps();
    }
}
