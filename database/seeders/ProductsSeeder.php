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
                'description' => $faker->text(50),
                'price' => $price = $faker->numberBetween(10000, 100000),
                'discount_price' => $faker->numberBetween(10000, $price),
                'stock' => $faker->numberBetween(1, 20),
                'created_at' => now(),
                'updated_at' => now(),
                'tenant_id' => $faker->randomElement($tenantIds),
                'product_type_id' => $faker->randomElement($productTypeIds),
            ]);
        }
    }
}
