<?php

namespace Database\Seeders;

use App\Models\Partner;
use App\Models\User;
use Illuminate\Database\Seeder;

class PartnerSeeder extends Seeder
{
    public function run()
    {
        $partners = User::where('role', 'partner')->get();

        foreach ($partners as $partner) {
            Partner::create([
                'bio' => 'Je suis un photographe passionné.',
                'website' => 'https://photographerwebsite.com',
                'social_links' => 'Instagram: @photographer',
                'user_id' => $partner->id,
            ]);
        }
    }
}

