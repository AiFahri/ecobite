<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UsersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create();

        foreach (range(1, 50) as $index) {
            DB::table('users')->insert([
                'id' => (string) \Illuminate\Support\Str::ulid(),
                'full_name' => $faker->name,
                'email' => $faker->unique()->safeEmail,
                'password' => Hash::make('123123123'),
                'photo_url' => 'https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg',
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
