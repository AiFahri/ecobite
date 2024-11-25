<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;
use Illuminate\Support\Facades\DB;

class ProductMediaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create();

        $productIds = DB::table('products')->pluck('id')->toArray();

        foreach ($productIds as $product) {
            DB::table('product_media')->insert([
                'id' => (string) \Illuminate\Support\Str::ulid(),
                'created_at' => now(),
                'updated_at' => now(),
                'product_id' => $product,
            ]);

            DB::table('product_media')->insert([
                'id' => (string) \Illuminate\Support\Str::ulid(),
                'created_at' => now(),
                'updated_at' => now(),
                'product_id' => $product,
            ]);
        }
    }
}
