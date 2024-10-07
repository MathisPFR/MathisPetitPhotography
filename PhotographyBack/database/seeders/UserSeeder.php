<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run()
    {
        // Créer un utilisateur admin
        User::create([
            'name' => 'Admin User',
            'email' => 'admin@example.com',
            'password' => Hash::make('password'),
            'role' => 'admin',
        ]);

        // Créer 2 partenaires manuellement
        User::create([
            'name' => 'Partner 1',
            'email' => 'partner1@example.com',
            'password' => Hash::make('password'),
            'role' => 'partner',
        ]);

        User::create([
            'name' => 'Partner 2',
            'email' => 'partner2@example.com',
            'password' => Hash::make('password'),
            'role' => 'partner',
        ]);
    }
}
