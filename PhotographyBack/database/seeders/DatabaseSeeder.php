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
        $this->call(UserSeeder::class);        // Seeder pour les utilisateurs
        $this->call(CategorySeeder::class);    // Seeder pour les catégories
        $this->call(PartnerSeeder::class);     // Seeder pour les partenaires
        $this->call(PhotoSeeder::class);       // Seeder pour les photos
    }
}
