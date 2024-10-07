<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Fortify\TwoFactorAuthenticatable;
use Laravel\Jetstream\HasProfilePhoto;
use Laravel\Sanctum\HasApiTokens;

/**
 * @OA\Schema(
 *     schema="User",
 *     type="object",
 *     title="User",
 *     description="Modèle représentant un utilisateur dans l'application",
 *     @OA\Property(
 *         property="id",
 *         type="integer",
 *         description="ID unique de l'utilisateur"
 *     ),
 *     @OA\Property(
 *         property="name",
 *         type="string",
 *         description="Nom de l'utilisateur"
 *     ),
 *     @OA\Property(
 *         property="email",
 *         type="string",
 *         format="email",
 *         description="Adresse email de l'utilisateur"
 *     ),
 *     @OA\Property(
 *         property="role",
 *         type="string",
 *         description="Rôle de l'utilisateur (user, partner, admin)"
 *     ),
 *     @OA\Property(
 *         property="profile_photo_url",
 *         type="string",
 *         description="URL de la photo de profil de l'utilisateur"
 *     ),
 *     @OA\Property(
 *         property="photos",
 *         type="array",
 *         @OA\Items(ref="#/components/schemas/Photo"),
 *         description="Liste des photos associées à cet utilisateur"
 *     ),
 *     @OA\Property(
 *         property="partner",
 *         ref="#/components/schemas/Partner",
 *         description="Partenaire associé à cet utilisateur, si l'utilisateur est un photographe"
 *     ),
 *     @OA\Property(
 *         property="likedPhotos",
 *         type="array",
 *         @OA\Items(ref="#/components/schemas/Photo"),
 *         description="Liste des photos likées par l'utilisateur"
 *     )
 * )
 */
class User extends Authenticatable
{
    use HasApiTokens, HasFactory, HasProfilePhoto, Notifiable, TwoFactorAuthenticatable;

    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
    ];

    protected $hidden = [
        'password',
        'remember_token',
        'two_factor_recovery_codes',
        'two_factor_secret',
    ];

    protected $appends = [
        'profile_photo_url',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function photos()
    {
        return $this->hasMany(Photo::class);
    }

    public function partner()
    {
        return $this->hasOne(Partner::class);
    }

    public function likedPhotos()
    {
        return $this->belongsToMany(Photo::class, 'user_photo_likes')->withTimestamps();
    }
}
