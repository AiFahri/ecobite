<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use \Faker\Factory as Faker;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class CartsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create();

        $userIds = DB::table('users')->pluck('id')->toArray();
        $productIds = DB::table('products')->pluck('id')->toArray();

        foreach ($userIds as $userId) {

            $randomProductIds = $faker->randomElements($productIds, $faker->numberBetween(3, 5));

            foreach ($randomProductIds as $productId) {
                DB::table('carts')->insert([
                    'id' => (string) Str::ulid(),
                    'quantity' => $faker->numberBetween(1, 3),
                    'created_at' => now(),
                    'updated_at' => now(),
                    'user_id' => $userId,
                    'product_id' => $productId,
                ]);
            }
        }
    }
}
