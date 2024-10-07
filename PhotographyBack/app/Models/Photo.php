<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @OA\Schema(
 *     schema="Photo",
 *     type="object",
 *     title="Photo",
 *     description="Modèle représentant une photo dans l'application",
 *     @OA\Property(
 *         property="id",
 *         type="integer",
 *         description="ID unique de la photo"
 *     ),
 *     @OA\Property(
 *         property="title",
 *         type="string",
 *         description="Titre de la photo"
 *     ),
 *     @OA\Property(
 *         property="description",
 *         type="string",
 *         description="Description de la photo"
 *     ),
 *     @OA\Property(
 *         property="image_path",
 *         type="string",
 *         description="Chemin vers l'image de la photo"
 *     ),
 *     @OA\Property(
 *         property="likes",
 *         type="integer",
 *         description="Nombre de likes que la photo a reçu"
 *     ),
 *     @OA\Property(
 *         property="user_id",
 *         type="integer",
 *         description="ID de l'utilisateur ayant téléchargé la photo"
 *     ),
 *     @OA\Property(
 *         property="categories",
 *         type="array",
 *         @OA\Items(ref="#/components/schemas/Category"),
 *         description="Liste des catégories associées à cette photo"
 *     ),
 *     @OA\Property(
 *         property="likedByUsers",
 *         type="array",
 *         @OA\Items(ref="#/components/schemas/User"),
 *         description="Liste des utilisateurs ayant liké la photo"
 *     )
 * )
 */
class Photo extends Model
{
    use HasFactory;

    protected $fillable = ['title', 'description', 'image_path', 'likes', 'user_id'];

    /**
     * Relation avec l'utilisateur
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Relation avec les catégories
     */
    public function categories()
    {
        return $this->belongsToMany(Category::class, 'category_photo');
    }

    /**
     * Relation avec les utilisateurs ayant liké la photo
     */
    public function likedByUsers()
    {
        return $this->belongsToMany(User::class, 'user_photo_likes')->withTimestamps();
    }
}
