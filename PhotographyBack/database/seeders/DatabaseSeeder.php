<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Photo;
use App\Models\Category;
use App\Models\Partner;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
            'role' => 'admin'
        ]);

        Category::factory()->count(5)->create();

        // Crée 10 utilisateurs avec 3 photos chacun
        User::factory()->has(Photo::factory()->count(3))->count(10)->create();

        // Crée 5 utilisateurs en tant que photographes partenaires
        Partner::factory()->count(5)->create();
    }
}
