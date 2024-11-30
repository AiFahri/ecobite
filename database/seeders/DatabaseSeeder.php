<?php

namespace Database\Seeders;

use App\Models\User;
use Faker\Provider\ar_EG\Address;
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
            ProductsSeeder::class,
            ProductMediaSeeder::class,
            VouchersSeeder::class,
            UsersSeeder::class,
            UsersVouchersSeeder::class,
            TenantsSeeder::class,
            WishlistsSeeder::class,
            AddressesSeeder::class,
            TransactionSeeder::class,
            CartsSeeder::class,
        ]);
    }
}
