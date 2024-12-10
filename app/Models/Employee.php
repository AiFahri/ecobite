<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Model;

class Employee extends Model
{
    //

    protected $fillable = [
        'name',
        'license_plate',
        'photo_url',
        'tenant_id',
    ];

    use HasUlids;

    public function tenant()
    {
        return $this->belongsTo(Tenant::class);
    }
}
