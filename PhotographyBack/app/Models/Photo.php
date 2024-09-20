<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Photo extends Model
{
    use HasFactory;

    protected $fillable = ['title', 'description', 'image_path', 'likes', 'user_id'];

    // Relation : une photo appartient à un utilisateur
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Relation : une photo peut appartenir à plusieurs catégories
    public function categories()
    {
        return $this->belongsToMany(Category::class, 'category_photo');
    }

    // Relation : une photo peut être likée par plusieurs utilisateurs
    public function likedByUsers()
    {
        return $this->belongsToMany(User::class, 'user_photo_likes')->withTimestamps();
    }
}
