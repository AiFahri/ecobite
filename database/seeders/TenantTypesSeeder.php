<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;
use Illuminate\Support\Facades\DB;

class TenantTypesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create();

        $names = ['Hotel', 'Resto', 'Resort', 'Others'];
        foreach (range(0, 3) as $index) {
            DB::table('tenant_types')->insert([
                'id' => (string) \Illuminate\Support\Str::ulid(),
                'name' => $names[$index],
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
