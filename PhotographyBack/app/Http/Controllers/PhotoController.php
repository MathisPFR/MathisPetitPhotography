<?php

namespace App\Http\Controllers;

use App\Models\Photo;
use App\Models\Partner;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class PhotoController extends Controller
{
    // Lister toutes les photos
    public function index(Request $request)
    {
        // Récupérer le partner_id depuis la requête, s'il est passé
        $partnerId = $request->query('partner_id');

        // Si un partner_id est passé, on filtre les photos par l'ID du partenaire (user_id)
        if ($partnerId) {
            $photos = Photo::with('user', 'categories')
                ->where('user_id', $partnerId)
                ->get();
        } else {
            // Sinon, on récupère toutes les photos
            $photos = Photo::with('user', 'categories')->get();
        }

        return response()->json($photos);
    }


    public function getPhotosByPartner($partnerId)
    {
        // Trouver le partenaire par son ID
        $partner = Partner::find($partnerId);

        // Vérifier si le partenaire existe
        if (!$partner) {
            return response()->json(['message' => 'Partner not found'], 404);
        }

        // Utiliser le user_id du partenaire pour trouver les photos associées
        $photos = Photo::where('user_id', $partner->user_id)->get();

        return response()->json($photos);
    }

    // Afficher une photo spécifique
    public function show($id)
    {
        $photo = Photo::with('user', 'categories')->findOrFail($id);
        return response()->json($photo);
    }


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



    // Modifier une photo (uniquement par le photographe qui l'a créée ou l'admin)
    public function update(Request $request, $id)
    {
        $photo = Photo::findOrFail($id);

        // Vérifie que l'utilisateur est bien le propriétaire de la photo ou un admin
        if (Auth::id() !== $photo->user_id && Auth::user()->role !== 'admin') {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        // Valide les nouvelles données
        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:30720',
            'category_ids' => 'array|nullable',
        ]);

        // Si une nouvelle image est uploadée, supprimer l'ancienne et stocker la nouvelle
        if ($request->hasFile('image')) {
            // Supprime l'ancienne image
            if (Storage::disk('public')->exists($photo->image_path)) {
                Storage::disk('public')->delete($photo->image_path);
            }

            // Stocke la nouvelle image
            $imagePath = $request->file('image')->store('photos', 'public');
            $photo->image_path = $imagePath; // Met à jour le chemin de l'image
        }

        // Mettre à jour les autres champs
        $photo->title = $validatedData['title'];
        $photo->description = $validatedData['description'] ?? $photo->description;


        if (isset($validatedData['category_ids'])) {
            $photo->categories()->sync($validatedData['category_ids']);
        }


        $photo->save();



        return response()->json($photo);
    }


    // Supprimer une photo


    public function destroy($id)
    {
        $photo = Photo::findOrFail($id);

        // Vérifie que l'utilisateur est bien le propriétaire de la photo ou un admin
        if (Auth::id() !== $photo->user_id && Auth::user()->role !== 'admin') {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        // Supprimer l'image du stockage si elle existe
        if (Storage::disk('public')->exists($photo->image_path)) {
            Storage::disk('public')->delete($photo->image_path);
        }

        // Supprimer la photo de la base de données
        $photo->delete();

        return response()->json(['message' => 'Photo supprimée avec succès']);
    }


    // Liker une photo
    public function like($id)
    {
        $photo = Photo::findOrFail($id);

        // Vérifie si l'utilisateur a déjà liké la photo
        if ($photo->likedByUsers()->where('user_id', Auth::id())->exists()) {
            return response()->json(['message' => 'Vous avez déjà liké cette photo'], 400);
        }

        $photo->likedByUsers()->attach(Auth::id());

        return response()->json(['message' => 'Photo likée avec succès']);
    }

    public function unlike($id)
    {
        $photo = Photo::findOrFail($id);

        // Vérifie si l'utilisateur a liké la photo
        if (!$photo->likedByUsers()->where('user_id', Auth::id())->exists()) {
            return response()->json(['message' => 'Vous n\'avez pas liké cette photo'], 400);
        }

        // Détache l'utilisateur de la photo dans la table pivot
        $photo->likedByUsers()->detach(Auth::id());

        return response()->json(['message' => 'Like retiré avec succès']);
    }
}
