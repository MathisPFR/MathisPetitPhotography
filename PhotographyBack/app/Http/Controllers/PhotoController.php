<?php

namespace App\Http\Controllers;

use App\Models\Photo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class PhotoController extends Controller
{
    // Lister toutes les photos
    public function index()
    {
        $photos = Photo::with('user', 'categories')->get();
        return response()->json($photos);
    }

    // Afficher une photo spécifique
    public function show($id)
    {
        $photo = Photo::with('user', 'categories')->findOrFail($id);
        return response()->json($photo);
    }

    // Créer une nouvelle photo (seulement pour les photographes)
    public function store(Request $request)
    {
        // Autorise seulement les partenaires et les administrateurs à ajouter des photos
        if (Auth::user()->role !== 'partner' && Auth::user()->role !== 'admin') {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        // Valider les données du formulaire, y compris le fichier image
        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048', // Validation pour les fichiers images
            'category_ids' => 'array|nullable', // Catégories associées
        ]);

        // Gestion de l'upload de l'image
        if ($request->hasFile('image')) {
            // Stocker l'image dans le répertoire 'public/photos'
            $imagePath = $request->file('image')->store('photos', 'public');
        }

        // Créer une nouvelle photo dans la base de données
        $photo = Photo::create([
            'title' => $validatedData['title'],
            'description' => $validatedData['description'],
            'image_path' => $imagePath, // Enregistre le chemin de l'image
            'user_id' => Auth::id(),
        ]);

        // Associe les catégories si elles sont fournies
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
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
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
