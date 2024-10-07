<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @OA\Schema(
 *     schema="Category",
 *     title="Category",
 *     description="Category model",
 *     @OA\Property(
 *         property="id",
 *         type="integer",
 *         description="ID of the category",
 *         example=1
 *     ),
 *     @OA\Property(
 *         property="name",
 *         type="string",
 *         description="Name of the category",
 *         example="Landscape"
 *     ),
 *     @OA\Property(
 *         property="created_at",
 *         type="string",
 *         format="date-time",
 *         description="Timestamp when the category was created",
 *         example="2024-10-04T12:34:56.000000Z"
 *     ),
 *     @OA\Property(
 *         property="updated_at",
 *         type="string",
 *         format="date-time",
 *         description="Timestamp when the category was updated",
 *         example="2024-10-05T12:34:56.000000Z"
 *     ),
 *     @OA\Property(
 *         property="photos",
 *         type="array",
 *         @OA\Items(ref="#/components/schemas/Photo"),
 *         description="List of photos belonging to the category"
 *     )
 * )
 */
class Category extends Model
{
    use HasFactory;

    protected $fillable = ['name'];

    /**
     * Relation : une catégorie peut avoir plusieurs photos
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function photos()
    {
        return $this->belongsToMany(Photo::class, 'category_photo');
    }
}
