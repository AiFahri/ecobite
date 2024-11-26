<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Model;

class Tenant extends Model
{
    use HasUlids;
    protected $table = 'tenants';

    public function products()
    {
        return $this->hasOne(Tenant::class, 'tenant_id', 'id');
    }

    public function getAuthIdentifier()
    {
        return $this->id;
    }
}
