<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use \Faker\Factory as Faker;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class AddressesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create('id_ID');

        $users = DB::table('users')->select('id', 'full_name')->get();

        foreach ($users as $user) {

            $title = explode('. ', $user->full_name);
            $firstName = explode(' ', (count($title) === 1 ? $title[0] : $title[1]))[0];

            DB::table('addresses')->insert([
                'id' => (string) Str::ulid(),
                'name' => $firstName . "'s Primary Address",
                'phone_number' => $faker->phoneNumber,
                'detailed_address' => $faker->streetAddress,
                'city' => $faker->city,
                'state' => $faker->state,
                'postal_code' => $faker->postcode,
                'latitude' => $faker->latitude(-10, 6),
                'longitude' => $faker->longitude(95, 141),
                'is_primary' => true,
                'created_at' => now(),
                'updated_at' => now(),
                'user_id' => $user->id,
            ]);
        }
    }
}
