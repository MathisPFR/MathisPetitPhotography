<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Photo;
use App\Models\User;
use App\Models\Category;
use Illuminate\Support\Facades\Storage;

class PhotoSeeder extends Seeder
{
    public function run()
    {
        // Récupérer les utilisateurs admin et partenaires
        $users = User::whereIn('role', ['partner', 'admin'])->get();
        $categories = Category::all();

        // Liste des vraies photos que tu souhaites utiliser pour le seeding
        $photosToSeed = [
            'photo1.jpg',
            'photo2.jpg',
            'photo3.jpg',
            'photo4.jpg',
            'photo5.jpg',
            'photo6.jpg',
            'photo7.jpg',
            'photo8.jpg',
            'photo9.jpg',
            'photo10.jpg',
            'photo12.jpg',
            'photo13.jpg',
            'photo14.jpg',
            'photo15.jpg',
            'photo16.jpg',
            'photo17.jpg',
            'photo18.jpg',
            'photo19.jpg',
            'photo20.jpg',
            'photo21.jpg',
            'photo22.jpg',
            'photo23.jpg',
            'photo24.jpg',
            'photo25.jpg',
            'photo26.jpg',
            'photo27.jpg',
        ];

        foreach ($photosToSeed as $photoFileName) {
            // Sélectionner aléatoirement un utilisateur (admin ou partner)
            $user = $users->random();

            // Copier la photo depuis le dossier de stockage local
            Storage::copy("photos-seed/{$photoFileName}", "public/photos/{$photoFileName}");

            // Créer une nouvelle entrée dans la table 'photos' avec l'image
            $photo = Photo::create([
                'title' => 'Photo de ' . $user->name,
                'description' => 'Une belle photo capturée par ' . $user->name,
                'image_path' => "photos/{$photoFileName}",
                'user_id' => $user->id,
            ]);

            // Associer la photo à une ou plusieurs catégories
            $photo->categories()->attach(
                $categories->random(rand(1, 3))->pluck('id')->toArray()
            );
        }
    }
}
