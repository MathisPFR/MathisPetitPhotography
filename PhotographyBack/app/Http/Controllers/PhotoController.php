<?php

namespace App\Http\Controllers;

use App\Models\Photo;
use App\Models\Partner;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

/**
 * @OA\Tag(name="Photos", description="Gestion des photos")
 */
class PhotoController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/photos",
     *     tags={"Photos"},
     *     summary="Lister toutes les photos",
     *     @OA\Parameter(
     *         name="partner_id",
     *         in="query",
     *         required=false,
     *         description="Filtrer les photos par ID du partenaire",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Liste des photos",
     *         @OA\JsonContent(type="array", @OA\Items(ref="#/components/schemas/Photo"))
     *     )
     * )
     */
    public function index(Request $request)
    {
        $partnerId = $request->query('partner_id');
        if ($partnerId) {
            $photos = Photo::with('user', 'categories')
                ->where('user_id', $partnerId)
                ->get();
        } else {
            $photos = Photo::with('user', 'categories')->get();
        }

        return response()->json($photos);
    }

    /**
     * @OA\Get(
     *     path="/api/photos/{id}",
     *     tags={"Photos"},
     *     summary="Afficher une photo spécifique",
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID de la photo",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Détails de la photo",
     *         @OA\JsonContent(ref="#/components/schemas/Photo")
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Photo non trouvée"
     *     )
     * )
     */
    public function show($id)
    {
        $photo = Photo::with('user', 'categories')->findOrFail($id);
        return response()->json($photo);
    }

    /**
     * @OA\Post(
     *     path="/api/photos",
     *     tags={"Photos"},
     *     summary="Créer une nouvelle photo",
     *     security={{"bearerAuth":{}}},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             @OA\Property(property="title", type="string", example="Titre de la photo"),
     *             @OA\Property(property="description", type="string", example="Description de la photo"),
     *             @OA\Property(property="image", type="string", format="binary"),
     *             @OA\Property(property="category_ids", type="array", @OA\Items(type="integer"))
     *         )
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Photo créée avec succès",
     *         @OA\JsonContent(ref="#/components/schemas/Photo")
     *     ),
     *     @OA\Response(
     *         response=403,
     *         description="Accès refusé"
     *     )
     * )
     */
    public function store(Request $request)
    {
        if (Auth::user()->role !== 'partner' && Auth::user()->role !== 'admin') {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:30720',
            'category_ids' => 'array|nullable',
        ]);

        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('photos', 'public');
        }

        $photo = Photo::create([
            'title' => $validatedData['title'],
            'description' => $validatedData['description'],
            'image_path' => $imagePath,
            'user_id' => Auth::id(),
        ]);

        if (isset($validatedData['category_ids'])) {
            $photo->categories()->sync($validatedData['category_ids']);
        }

        return response()->json($photo, 201);
    }

    /**
     * @OA\Put(
     *     path="/api/photos/{id}",
     *     tags={"Photos"},
     *     summary="Mettre à jour une photo",
     *     security={{"bearerAuth":{}}},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID de la photo",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             @OA\Property(property="title", type="string", example="Titre de la photo"),
     *             @OA\Property(property="description", type="string", example="Description de la photo"),
     *             @OA\Property(property="image", type="string", format="binary"),
     *             @OA\Property(property="category_ids", type="array", @OA\Items(type="integer"))
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Photo mise à jour avec succès",
     *         @OA\JsonContent(ref="#/components/schemas/Photo")
     *     ),
     *     @OA\Response(
     *         response=403,
     *         description="Accès refusé"
     *     )
     * )
     */
    public function update(Request $request, $id)
    {
        $photo = Photo::findOrFail($id);

        if (Auth::id() !== $photo->user_id && Auth::user()->role !== 'admin') {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:30720',
            'category_ids' => 'array|nullable',
        ]);

        if ($request->hasFile('image')) {
            if (Storage::disk('public')->exists($photo->image_path)) {
                Storage::disk('public')->delete($photo->image_path);
            }

            $imagePath = $request->file('image')->store('photos', 'public');
            $photo->image_path = $imagePath;
        }

        $photo->update([
            'title' => $validatedData['title'],
            'description' => $validatedData['description'] ?? $photo->description,
        ]);

        if (isset($validatedData['category_ids'])) {
            $photo->categories()->sync($validatedData['category_ids']);
        }

        return response()->json($photo);
    }

    /**
     * @OA\Delete(
     *     path="/api/photos/{id}",
     *     tags={"Photos"},
     *     summary="Supprimer une photo",
     *     security={{"bearerAuth":{}}},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID de la photo",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Photo supprimée avec succès",
     *         @OA\JsonContent(@OA\Property(property="message", type="string", example="Photo supprimée avec succès"))
     *     ),
     *     @OA\Response(
     *         response=403,
     *         description="Accès refusé"
     *     )
     * )
     */
    public function destroy($id)
    {
        $photo = Photo::findOrFail($id);

        if (Auth::id() !== $photo->user_id && Auth::user()->role !== 'admin') {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        if (Storage::disk('public')->exists($photo->image_path)) {
            Storage::disk('public')->delete($photo->image_path);
        }

        $photo->delete();

        return response()->json(['message' => 'Photo supprimée avec succès']);
    }

    /**
     * @OA\Post(
     *     path="/api/photos/{id}/like",
     *     tags={"Photos"},
     *     summary="Liker une photo",
     *     security={{"bearerAuth":{}}},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID de la photo",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Photo likée avec succès",
     *         @OA\JsonContent(@OA\Property(property="message", type="string", example="Photo likée avec succès"))
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Photo déjà likée"
     *     )
     * )
     */
    public function like($id)
    {
        $photo = Photo::findOrFail($id);

        if ($photo->likedByUsers()->where('user_id', Auth::id())->exists()) {
            return response()->json(['message' => 'Vous avez déjà liké cette photo'], 400);
        }

        $photo->likedByUsers()->attach(Auth::id());

        return response()->json(['message' => 'Photo likée avec succès']);
    }

    /**
     * @OA\Post(
     *     path="/api/photos/{id}/unlike",
     *     tags={"Photos"},
     *     summary="Retirer le like d'une photo",
     *     security={{"bearerAuth":{}}},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID de la photo",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Like retiré avec succès",
     *         @OA\JsonContent(@OA\Property(property="message", type="string", example="Like retiré avec succès"))
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Like non trouvé"
     *     )
     * )
     */
    public function unlike($id)
    {
        $photo = Photo::findOrFail($id);

        if (!$photo->likedByUsers()->where('user_id', Auth::id())->exists()) {
            return response()->json(['message' => 'Vous n\'avez pas liké cette photo'], 400);
        }

        $photo->likedByUsers()->detach(Auth::id());

        return response()->json(['message' => 'Like retiré avec succès']);
    }

    /**
     * @OA\Get(
     *     path="/api/photos/partner/{partnerId}",
     *     tags={"Photos"},
     *     summary="Obtenir les photos d'un partenaire spécifique",
     *     @OA\Parameter(
     *         name="partnerId",
     *         in="path",
     *         required=true,
     *         description="ID du partenaire",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Photos du partenaire",
     *         @OA\JsonContent(
     *             type="array",
     *             @OA\Items(ref="#/components/schemas/Photo")
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Partenaire non trouvé"
     *     )
     * )
     */
    public function getPhotosByPartner($partnerId)
    {
        $partner = Partner::find($partnerId);

        if (!$partner) {
            return response()->json(['message' => 'Partner not found'], 404);
        }

        $photos = Photo::where('user_id', $partner->user_id)->get();

        return response()->json($photos);
    }
}
