<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $this->call([
            TenantTypesSeeder::class,
            ProductTypesSeeder::class,
            TenantsSeeder::class,
            ProductsSeeder::class,
            ProductMediaSeeder::class
        ]);
    }
}
