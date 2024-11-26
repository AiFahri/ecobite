<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class WishlistsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = \Faker\Factory::create();
        $existingCombinations = [];

        $userIds = DB::table('users')->pluck('id')->toArray();
        $productIds = DB::table('products')->pluck('id')->toArray();

        for ($i = 0; $i < 500; $i++) {
            $id = (string) \Illuminate\Support\Str::ulid();

            $userId = $faker->randomElement($userIds);
            $productId = $faker->randomElement($productIds);

            while (isset($existingCombinations["$userId|$productId"])) {
                $userId = $faker->randomElement($userIds);
                $productId = $faker->randomElement($productIds);
            }

            $existingCombinations["$userId|$productId"] = true;

            DB::table('wishlists')->insert([
                'id' => $id,
                'created_at' => now(),
                'updated_at' => now(),
                'user_id' => $userId,
                'product_id' => $productId,
            ]);
        }
    }
}
