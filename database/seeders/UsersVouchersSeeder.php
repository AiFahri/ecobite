<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;
use Illuminate\Support\Facades\DB;

class UsersVouchersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create();

        $userIds = DB::table('users')->pluck('id')->toArray();
        $voucherIds = DB::table('vouchers')->pluck('id')->toArray();

        foreach (range(1, 50) as $index) {
            DB::table('user_vouchers')->insert([
                'id' => (string) \Illuminate\Support\Str::ulid(),
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
                'user_id' => $faker->randomElement($userIds),
                'voucher_id' => $faker->randomElement($voucherIds),
            ]);
        }
    }
}
