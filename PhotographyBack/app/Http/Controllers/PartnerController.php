<?php

namespace App\Http\Controllers;

use App\Models\Partner;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

/**
 * @OA\Tag(name="Partners", description="Gestion des partenaires")
 */
class PartnerController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/partners",
     *     tags={"Partners"},
     *     summary="Lister tous les partenaires",
     *     @OA\Response(
     *         response=200,
     *         description="Liste des partenaires",
     *         @OA\JsonContent(
     *             type="array",
     *             @OA\Items(ref="#/components/schemas/Partner")
     *         )
     *     )
     * )
     */
    public function index()
    {
        $partners = Partner::with('user')->get();
        return response()->json($partners);
    }

    /**
     * @OA\Get(
     *     path="/api/partners/{id}",
     *     tags={"Partners"},
     *     summary="Afficher un partenaire spécifique",
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID de l'utilisateur associé au partenaire",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Informations du partenaire",
     *         @OA\JsonContent(ref="#/components/schemas/Partner")
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Partenaire non trouvé"
     *     )
     * )
     */
    public function show($id)
    {
        $partner = Partner::where('user_id', $id)->firstOrFail();
        return response()->json($partner);
    }

   
    /**
 * @OA\Put(
 *     path="/api/partners/{id}",
 *     tags={"Partners"},
 *     summary="Mettre à jour un partenaire",
 *     security={{"bearerAuth":{}}},
 *     @OA\Parameter(
 *         name="id",
 *         in="path",
 *         required=true,
 *         description="ID de l'utilisateur associé au partenaire",
 *         @OA\Schema(type="integer")
 *     ),
 *     @OA\RequestBody(
 *         required=true,
 *         @OA\JsonContent(
 *             @OA\Property(property="bio", type="string", example="Je suis un photographe passionné..."),
 *             @OA\Property(property="website", type="string", format="url", example="http://monsiteweb.com"),
 *             @OA\Property(property="social_links", type="string", example="Instagram: @moncompte")
 *         )
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Informations mises à jour avec succès",
 *         @OA\JsonContent(
 *             @OA\Property(property="message", type="string", example="Informations mises à jour avec succès"),
 *             @OA\Property(property="partner", ref="#/components/schemas/Partner")
 *         )
 *     ),
 *     @OA\Response(
 *         response=403,
 *         description="Accès refusé"
 *     ),
 *     @OA\Response(
 *         response=422,
 *         description="Erreur de validation"
 *     )
 * )
 */

    public function update(Request $request, $id)
    {
        $partner = Partner::where('user_id', $id)->firstOrFail();

        // Vérifier si l'utilisateur connecté est bien le propriétaire ou un admin
        if (Auth::id() !== $partner->user_id && Auth::user()->role !== 'admin') {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        try {
            $validatedData = $request->validate([
                'bio' => 'nullable|string',
                'website' => 'nullable|url|max:255',
                'social_links' => 'nullable|string|max:255',
            ]);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json($e->errors(), 422);
        }

        $partner->update($validatedData);

        return response()->json(['message' => 'Informations mises à jour avec succès', 'partner' => $partner]);
    }
}
