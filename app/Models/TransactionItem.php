<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TransactionItem extends Model
{
    public function ratings()
    {
        return $this->hasOne(TransactionItemRating::class, 'transaction_item_id');
    }
}
