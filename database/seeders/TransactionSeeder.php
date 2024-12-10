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

        $products = DB::table('products')->select('id', 'price', 'discount_price', 'tenant_id')->get();
        $addresses = DB::table('addresses')->pluck('id')->toArray();

        for ($i = 0; $i < 300; $i++) {
            // Pilih 1-3 produk secara acak
            $selectedProducts = $products->random($faker->numberBetween(1, 3));

            // Hitung total transaksi berdasarkan produk yang dipilih
            $total = 0;
            foreach ($selectedProducts as $product) {
                $total += $product->discount_price ?? $product->price;
            }

            // Ambil employee dari tenant yang sesuai
            $tenantIds = $selectedProducts->pluck('tenant_id')->unique();
            $employees = DB::table('employees')
                ->whereIn('tenant_id', $tenantIds)
                ->pluck('id')
                ->toArray();

            // Buat transaksi
            $transactionId = (string) Str::ulid();
            DB::table('transactions')->insert([
                'id' => $transactionId,
                'total' => $total,
                'status' => 'completed',
                'payment_type' => $faker->randomElement(['Transfer Bank', 'E-Wallet', 'Cash on Delivery']),
                'token' => $faker->uuid(),
                'created_at' => now(),
                'updated_at' => now(),
                'address_id' => $faker->randomElement($addresses),
                'employee_id' => $faker->randomElement($employees),
            ]);

            // Tambahkan produk ke transaction_items
            foreach ($selectedProducts as $product) {
                $transactionItemId = (string) Str::ulid();
                DB::table('transaction_items')->insert([
                    'id' => $transactionItemId,
                    'quantity' => 1, // Untuk setiap produk
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
