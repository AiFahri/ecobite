<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;
use Illuminate\Support\Facades\DB;
use League\Csv\Reader;

class ProductsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create();

        // Path ke file CSV
        $file = database_path('data/products.csv');

        // Baca file CSV
        $csv = Reader::createFromPath($file, 'r');
        $csv->setHeaderOffset(0); // Header di baris pertama

        // Ambil semua data dari CSV
        $products = iterator_to_array($csv);

        $tenantIds = DB::table('tenants')->pluck('id')->toArray();
        $productTypeIds = DB::table('product_types')->pluck('id')->toArray();

        foreach (range(1, 25) as $index) {

            $record = $products[$index];
            $productId = (string) \Illuminate\Support\Str::ulid();
            DB::table('products')->insert([
                'id' => $productId,
                'name' => $record['Nama'],
                'description' => $faker->paragraph() . ' '  . $faker->paragraph() . ' ' . $faker->paragraph() . ' ' . $faker->paragraph() . ' ' . $faker->paragraph(),
                'price' => $price = $faker->numberBetween(300, 999) * 100,
                'discount_price' => $faker->numberBetween(100, $price / 100) * 100,
                'stock' => $faker->numberBetween(5, 20),
                'created_at' => now(),
                'updated_at' => now(),
                'tenant_id' => $faker->randomElement($tenantIds),
                'product_type_id' => $faker->randomElement($productTypeIds),
            ]);

            foreach (range(1, 3) as $idx) {
                DB::table('product_media')->insert([
                    'id' => (string) \Illuminate\Support\Str::ulid(),
                    'photo_url' => 'https://hpmvwwpbkmlzqfmmbjbd.supabase.co/storage/v1/object/public/ecobite/' . $record['id']  . '-' . $idx . '.jpg',
                    'created_at' => now(),
                    'updated_at' => now(),
                    'product_id' => $productId,
                ]);
            }
        }
    }
}
