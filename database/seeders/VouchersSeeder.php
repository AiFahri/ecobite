<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;
use Illuminate\Support\Facades\DB;

class VouchersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create();

        foreach (range(1, 50) as $index) {
            $isPercentage = $faker->boolean;

            DB::table('vouchers')->insert([
                'id' => (string) \Illuminate\Support\Str::ulid(),
                'name' => ucwords($faker->words(2, true)) . ' Discount',
                'description' => $faker->text(50),
                'is_percentage' => $isPercentage,
                'amount' => $isPercentage ? $faker->randomNumber(2) : $faker->randomNumber(5),
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
