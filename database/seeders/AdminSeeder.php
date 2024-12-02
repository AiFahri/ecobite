<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('admins')->insert([
            'id' => (string) \Illuminate\Support\Str::ulid(),
            'name' => 'Super Admin',
            'email' => 'su@ecobite.id',
            'password' => Hash::make('123123123'),
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
}
