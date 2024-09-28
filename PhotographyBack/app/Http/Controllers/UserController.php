<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;


class UserController extends Controller
{
    // Lister tous les utilisateurs (admin uniquement)
    public function index()
    {
        if (Auth::user()->role !== 'admin') {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $users = User::all();
        return response()->json($users);
    }

    // Afficher les informations d'un utilisateur spécifique
    public function show($id)
    {
        $user = User::findOrFail($id);
        return response()->json($user);
    }

    // Mettre à jour les informations de l'utilisateur (nom, email, mot de passe)
    public function update(Request $request, $id)
    {
        $user = User::findOrFail($id);

        // Vérifier si l'utilisateur connecté est celui à mettre à jour ou un admin
        if (Auth::id() !== $user->id && Auth::user()->role !== 'admin') {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        // Valider les données
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . $user->id,
            'password' => 'nullable|string|min:8|confirmed',
            'role' => 'required|string|max:255',
        ]);

        // Mettre à jour les informations
        $user->name = $validatedData['name'];
        $user->email = $validatedData['email'];
        $user->role = $validatedData['role'];

        if (!empty($validatedData['password'])) {
            $user->password = Hash::make($validatedData['password']);
        }

        $user->save();

        return response()->json(['message' => 'Utilisateur mis à jour avec succès', 'user' => $user]);
    }

    // Supprimer un utilisateur (admin uniquement)
    public function destroy($id)
    {
        $user = User::findOrFail($id);

        // Vérifier si l'utilisateur est un admin
        if (Auth::user()->role !== 'admin') {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $user->delete();

        return response()->json(['message' => 'Utilisateur supprimé avec succès']);
    }





    public function getLikedPhotos()
    {
        $user = Auth::user();

        // Vérifie si l'utilisateur est bien authentifié
        if (!$user) {
            return response()->json(['error' => 'Utilisateur non authentifié'], 401);
        }

        // Récupérer les photos likées par l'utilisateur authentifié
        $likedPhotos = $user->likedPhotos()->get();

        return response()->json($likedPhotos);
    }
}
