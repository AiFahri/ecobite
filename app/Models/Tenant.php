<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Model;

class Tenant extends Model
{
    use HasUlids;
    protected $table = 'tenants';

    protected $fillable = [
        'name',
        'stars',
        'is_verified',
        'photo_url',
        'city',
        'state',
        'postal_code',
        'latitude',
        'longitude',
        'tenant_type_id', // Foreign key ke tabel tenant_types
    ];

    public function products()
    {
        return $this->hasOne(Tenant::class, 'tenant_id', 'id');
    }

    public function getAuthIdentifier()
    {
        return $this->id;
    }

    public function tenantType()
    {
        return $this->belongsTo(TenantType::class, 'tenant_type_id'); // Foreign key di tabel tenant
    }

    public function employees()
    {
        return $this->hasMany(Employee::class);
    }

    public function admins()
    {
        return $this->hasMany(Admin::class);
    }

    public function address()
    {
        return $this->belongsTo(Address::class, 'address_id');
    }
}
