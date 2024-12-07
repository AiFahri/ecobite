<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUlids;

class Address extends Model
{
    //
    use HasUlids;
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id'); // Foreign key: user_id
    }
}
