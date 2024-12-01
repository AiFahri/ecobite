<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use \Faker\Factory as Faker;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class TransactionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create();

        $products = DB::table('products')->select('id', 'price', 'discount_price')->get();
        $addresses = DB::table('addresses')->pluck('id')->toArray();

        for ($i = 0; $i < 300; $i++) {

            $product = $products->random();
            $quantity = $faker->numberBetween(1, 5);

            $transactionId = (string) Str::ulid();
            DB::table('transactions')->insert([
                'id' => $transactionId,
                'total' => ($product->discount_price ?? $product->price) * $quantity,
                'status' => 'completed',
                'payment_type' => $faker->randomElement(['Transfer Bank', 'E-Wallet', 'Cash on Delivery']),
                'token' => $faker->uuid(),
                'created_at' => now(),
                'updated_at' => now(),
                'address_id' => $faker->randomElement($addresses),
            ]);

            $transactionItemId = (string) Str::ulid();
            DB::table('transaction_items')->insert([
                'id' => $transactionItemId,
                'quantity' => $quantity,
                'price' => $product->price * $quantity,
                'discount_price' => $product->discount_price * $quantity,
                'product_id' => $product->id,
                'transaction_id' => $transactionId,
            ]);

            // Tambahkan rating untuk setiap transaction_item
            DB::table('transaction_item_ratings')->insert([
                'id' => (string) Str::ulid(),
                'feedback' => $faker->sentence(),
                'star' => $faker->numberBetween(1, 5),
                'created_at' => now(),
                'updated_at' => now(),
                'transaction_item_id' => $transactionItemId,
            ]);
        }
    }
}
