<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Tenant;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class EmployeesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = \Faker\Factory::create();
        $tenants = Tenant::all();

        // Untuk setiap tenant, buat 3 employees
        foreach ($tenants as $tenant) {
            for ($i = 1; $i <= 3; $i++) {
                DB::table('employees')->insert([
                    'id' => (string) Str::ulid(),
                    'name' => $faker->name,
                    'license_plate' => strtoupper(Str::random(8)), // Random license plate
                    'photo_url' => null, // Optional
                    'tenant_id' => $tenant->id,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }
        }
    }
}
