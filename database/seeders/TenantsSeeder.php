<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;
use Illuminate\Support\Facades\DB;

class TenantsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create('id_ID');

        $tenantTypes = DB::table('tenant_types')->pluck('id')->toArray();

        foreach (range(1, 10) as $index) {
            DB::table('tenants')->insert([
                'id' => (string) \Illuminate\Support\Str::ulid(),
                'name' => $faker->company,
                'stars' => $faker->numberBetween(3, 5),
                'is_verified' => $faker->boolean,
                'city' => $faker->city,
                'state' => $faker->state,
                'postal_code' => $faker->postcode,
                'latitude' => $faker->latitude(-10, 5),
                'longitude' => $faker->longitude(95, 141),
                'created_at' => now(),
                'updated_at' => now(),
                'tenant_type_id' => $faker->randomElement($tenantTypes),
            ]);
        }
    }
}
