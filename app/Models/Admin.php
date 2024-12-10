<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Foundation\Auth\User as Authenticatable;

class Admin extends Authenticatable
{
    use HasUlids;
    //
    protected $fillable = [
        'name',
        'email',
        'password',
        'tenant_id',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    public function tenant()
    {
        return $this->belongsTo(Tenant::class);
    }
}
