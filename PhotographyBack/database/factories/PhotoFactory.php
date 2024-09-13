<?php

namespace Database\Factories;

use App\Models\Photo;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class PhotoFactory extends Factory
{
    protected $model = Photo::class;

    public function definition()
    {
        return [
            'title' => $this->faker->sentence,
            'description' => $this->faker->paragraph,
            'image_path' => $this->faker->imageUrl(640, 480, 'nature', true),
            'likes' => $this->faker->numberBetween(0, 1000),
            'user_id' => User::factory(), // Associe la photo à un utilisateur aléatoire
        ];
    }
}
