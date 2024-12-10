<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Model;

class TenantType extends Model
{
    //
    use HasUlids;
    public function tenants()
    {
        return $this->hasMany(Tenant::class, 'tenant_type_id'); // Foreign key di tabel tenant
    }
}
