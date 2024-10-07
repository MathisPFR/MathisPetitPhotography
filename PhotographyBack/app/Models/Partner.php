<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @OA\Schema(
 *     schema="Partner",
 *     type="object",
 *     title="Partner",
 *     description="Modèle représentant un partenaire photographe dans l'application",
 *     @OA\Property(
 *         property="id",
 *         type="integer",
 *         description="ID unique du partenaire"
 *     ),
 *     @OA\Property(
 *         property="bio",
 *         type="string",
 *         description="Biographie du partenaire"
 *     ),
 *     @OA\Property(
 *         property="website",
 *         type="string",
 *         description="Site web du partenaire"
 *     ),
 *     @OA\Property(
 *         property="social_links",
 *         type="string",
 *         description="Liens vers les réseaux sociaux du partenaire"
 *     ),
 *     @OA\Property(
 *         property="user_id",
 *         type="integer",
 *         description="ID de l'utilisateur associé au partenaire"
 *     ),
 *     @OA\Property(
 *         property="photos",
 *         type="array",
 *         @OA\Items(ref="#/components/schemas/Photo"),
 *         description="Liste des photos associées à ce partenaire"
 *     ),
 *     @OA\Property(
 *         property="user",
 *         ref="#/components/schemas/User",
 *         description="Utilisateur associé à ce partenaire"
 *     )
 * )
 */
class Partner extends Model
{
    use HasFactory;

    protected $fillable = ['bio', 'website', 'social_links', 'user_id'];

    /**
     * Relation : un partenaire est lié à un utilisateur
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Relation : un partenaire peut avoir plusieurs photos via un utilisateur
     */
    public function photos()
    {
        return $this->hasManyThrough(Photo::class, User::class, 'id', 'user_id');
    }
}
