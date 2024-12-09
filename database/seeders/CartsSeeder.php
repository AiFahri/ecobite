<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Cart;
use Illuminate\Support\Facades\DB;
use Faker\Factory as Faker;

class CartsSeeder extends Seeder
{
    public function run()
    {
        $faker = Faker::create();
        
        // Get real user and product IDs from database
        $userIds = DB::table('users')->pluck('id')->toArray();
        $productIds = DB::table('products')->pluck('id')->toArray();

        if (empty($userIds) || empty($productIds)) {
            return; // Skip if no users or products exist
        }

        foreach ($userIds as $userId) {
            // Generate 1-3 cart items for each user
            $numberOfItems = $faker->numberBetween(1, 3);
            $selectedProducts = $faker->randomElements($productIds, $numberOfItems);

            foreach ($selectedProducts as $productId) {
                Cart::create([
                    'user_id' => $userId,
                    'product_id' => $productId,
                    'quantity' => $faker->numberBetween(1, 5),
                ]);
            }
        }
    }
}
