<?php

namespace Database\Factories;

use App\Models\Partner;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class PartnerFactory extends Factory
{
    protected $model = Partner::class;

    public function definition()
    {
        return [
            'user_id' => User::factory(), // Associe le partenaire à un utilisateur
            'bio' => $this->faker->paragraph,
            'website' => $this->faker->url,
            'social_links' => json_encode([
                'facebook' => $this->faker->url,
                'instagram' => $this->faker->url,
            ]),
        ];
    }
}
