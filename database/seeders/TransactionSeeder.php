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

        foreach ($products as $product) {

            $otherProducts = $products->filter(function ($p) use ($product) {
                return $p->id !== $product->id;
            })->values()->all();

            $randomCount = random_int(0, 2);
            $productInsert = [$product];

            if ($randomCount === 0) {
                goto skip;
            }

            $rand = array_rand($otherProducts, $randomCount);

            if ($randomCount === 2) {
                foreach ($rand as $index) {
                    $productInsert[] = $otherProducts[$index];
                }
            } else if ($randomCount === 1) {
                $productInsert[] = $otherProducts[$rand];
            }

            skip:

            $transactionId = (string) Str::ulid();
            $total = array_reduce($productInsert, function ($sum, $product) {
                return $sum + $product->discount_price;
            }, 0);

            DB::table('transactions')->insert([
                'id' => $transactionId,
                'total' => $total,
                'status' => 'completed',
                'payment_type' => $faker->randomElement(['Transfer Bank', 'E-Wallet', 'Cash on Delivery']),
                'created_at' => now(),
                'updated_at' => now(),
                'address_id' => $faker->randomElement($addresses),
            ]);

            foreach ($productInsert as $product) {
                // Buat item transaksi baru
                $transactionItemId = (string) Str::ulid();

                DB::table('transaction_items')->insert([
                    'id' => $transactionItemId,
                    'quantity' => 1,
                    'price' => $product->price,
                    'discount_price' => $product->discount_price,
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
}
