<?php

namespace App\Http\Controllers;

use App\Models\Partner;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PartnerController extends Controller
{
    // Lister tous les partenaires
    public function index()
    {
        $partners = Partner::with('user')->get();
        return response()->json($partners);
    }

    // Afficher les informations d'un partenaire spécifique
    public function show($id)
    {
        $partner = Partner::where('user_id', $id)->firstOrFail();
        return response()->json($partner);
    }

    // Mettre à jour les informations du partenaire (bio, site web, liens sociaux)
    public function update(Request $request, $id)
    {



        // Récupérer les informations du partenaire
        $partner = Partner::where('user_id', $id)->firstOrFail();



        // Vérifier si l'utilisateur connecté est bien le propriétaire des informations ou un admin
        if (Auth::id() !== $partner->user_id && Auth::user()->role !== 'admin') {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        try {
            // Valider les données
            $validatedData = $request->validate([
                'bio' => 'nullable|string',
                'website' => 'nullable|url|max:255',
                'social_links' => 'nullable|string|max:255',
            ]);
        } catch (\Illuminate\Validation\ValidationException $e) {
            // Retourner les erreurs de validation
            return response()->json($e->errors(), 422);
        }



        // Mettre à jour les informations
        $partner->update($validatedData);


        return response()->json(['message' => 'Informations mises à jour avec succès', 'partner' => $partner]);
    }

    // Supprimer un partenaire (si nécessaire)

}
