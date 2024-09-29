<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Partner extends Model
{
    use HasFactory;

    protected $fillable = ['bio', 'website', 'social_links', 'user_id'];

    // Relation : un partenaire est lié à un utilisateur
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function photos()
    {
        return $this->hasManyThrough(Photo::class, User::class, 'id', 'user_id');
    }
}
