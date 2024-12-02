<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;
use Illuminate\Support\Facades\DB;
use League\Csv\Reader;

class ProductMediaSeeder extends Seeder
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

        $productIds = DB::table('products')->pluck('id')->toArray();

        foreach ($productIds as $k => $product) {
            $record = $products[$k + 1];
            foreach (range(1, 3) as $index) {
                DB::table('product_media')->insert([
                    'id' => (string) \Illuminate\Support\Str::ulid(),
                    'photo_url' => 'https://hpmvwwpbkmlzqfmmbjbd.supabase.co/storage/v1/object/public/ecobite/' . $record['id']  . '-' . $index . '.jpg',
                    'created_at' => now(),
                    'updated_at' => now(),
                    'product_id' => $product,
                ]);
            }
        }
    }
}
