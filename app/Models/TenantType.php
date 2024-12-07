<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TenantType extends Model
{
    //
    public function tenants()
    {
        return $this->hasMany(Tenant::class, 'tenant_type_id'); // Foreign key di tabel tenant
    }
}
