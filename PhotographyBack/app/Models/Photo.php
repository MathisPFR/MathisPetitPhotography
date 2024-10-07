<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Photo extends Model
{
    use HasFactory;

    protected $fillable = ['title', 'description', 'image_path', 'likes', 'user_id'];

    
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function categories()
    {
        return $this->belongsToMany(Category::class, 'category_photo');
    }

    public function likedByUsers()
    {
        return $this->belongsToMany(User::class, 'user_photo_likes')->withTimestamps();
    }
}
