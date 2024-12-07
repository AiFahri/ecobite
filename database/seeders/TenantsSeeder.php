<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;
use Illuminate\Support\Facades\DB;
use League\Csv\Reader;

class TenantsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create();

        // Path ke file CSV
        $file = database_path('data/tenants.csv');

        // Baca file CSV
        $csv = Reader::createFromPath($file, 'r');
        $csv->setHeaderOffset(0); // Header di baris pertama

        // Ambil semua data dari CSV
        $addresses = iterator_to_array($csv);

        $tenantTypes = DB::table('tenant_types')->pluck('id')->toArray();

        foreach (range(1, 10) as $index) {

            $record = $addresses[$index];

            DB::table('tenants')->insert([
                'id' => (string) \Illuminate\Support\Str::ulid(),
                'name' => $faker->company,
                'stars' => $faker->numberBetween(3, 5),
                'is_verified' => $faker->boolean,
                'city' => $record['City'],
                'state' => $record['State'],
                'postal_code' => $record['Postal Code'],
                'latitude' => $record['Latitude'],
                'longitude' => $record['Longitude'],
                'created_at' => now(),
                'updated_at' => now(),
                'tenant_type_id' => $faker->randomElement($tenantTypes),
            ]);
        }
    }
}
