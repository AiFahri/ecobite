<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use \Faker\Factory as Faker;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use League\Csv\Reader;

class AddressesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Path ke file CSV
        $file = database_path('data/addresses.csv');

        // Baca file CSV
        $csv = Reader::createFromPath($file, 'r');
        $csv->setHeaderOffset(0); // Header di baris pertama

        // Ambil semua data dari CSV
        $addresses = iterator_to_array($csv);

        // Ambil data user dari tabel users
        $users = DB::table('users')->select('id', 'full_name')->get();

        foreach ($users as $index => $user) {
            // Ambil data address secara acak
            $record = $addresses[$index + 1];

            // Ambil nama depan dari full_name
            $title = explode('. ', $user->full_name);
            $firstName = explode(' ', (count($title) === 1 ? $title[0] : $title[1]))[0];

            // Insert data ke tabel addresses
            DB::table('addresses')->insert([
                'id' => (string) Str::ulid(),
                'name' => $firstName . "'s Primary Address",
                'phone_number' => '+628' . random_int(1000000000, 9999999999),
                'detailed_address' => $record['Street'],
                'city' => $record['City'],
                'state' => $record['State'],
                'postal_code' => $record['Postal Code'],
                'latitude' => $record['Latitude'],
                'longitude' => $record['Longitude'],
                'is_primary' => true,
                'created_at' => now(),
                'updated_at' => now(),
                'user_id' => $user->id,
            ]);
        }
    }
}
