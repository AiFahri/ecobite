<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $this->call([
            // Master Data
            TenantTypesSeeder::class,
            ProductTypesSeeder::class,
            
            // Core Data
            TenantsSeeder::class,
            ProductsSeeder::class,
            ProductMediaSeeder::class,
            
            // User Related
            UsersSeeder::class,
            AddressesSeeder::class,
            
            // Features
            VouchersSeeder::class,
            UsersVouchersSeeder::class,
            WishlistsSeeder::class,
            
            // Transactions
            TransactionSeeder::class,
        ]);
    }
}
