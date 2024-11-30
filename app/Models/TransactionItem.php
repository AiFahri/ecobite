<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUlids;

class TransactionItem extends Model
{
    use HasUlids;
    public function ratings()
    {
        return $this->hasMany(TransactionItemRating::class, 'transaction_item_id');
    }

    public function transaction()
    {
        return $this->belongsTo(Transaction::class, 'transaction_id'); // Foreign key: transaction_id
    }
}
