<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Model;

class UserVoucher extends Model
{
    //
    use HasUlids;

    public function voucher()
    {
        return $this->belongsTo(Voucher::class, 'voucher_id');
    }
}
