<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;
use Illuminate\Support\Facades\DB;

class ProductsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create();
        $faker->addProvider(new \FakerRestaurant\Provider\id_ID\Restaurant($faker));

        $tenantIds = DB::table('tenants')->pluck('id')->toArray();
        $productTypeIds = DB::table('product_types')->pluck('id')->toArray();

        foreach (range(1, 100) as $index) {
            DB::table('products')->insert([
                'id' => (string) \Illuminate\Support\Str::ulid(),
                'name' => $faker->foodName(),
                'description' => $faker->paragraph() . ' '  . $faker->paragraph() . ' ' . $faker->paragraph() . ' ' . $faker->paragraph() . ' ' . $faker->paragraph(),
                'price' => $price = $faker->numberBetween(300, 999) * 100,
                'discount_price' => $faker->numberBetween(100, $price / 100) * 100,
                'stock' => $faker->numberBetween(5, 20),
                'created_at' => now(),
                'updated_at' => now(),
                'tenant_id' => $faker->randomElement($tenantIds),
                'product_type_id' => $faker->randomElement($productTypeIds),
            ]);
        }
    }
}
