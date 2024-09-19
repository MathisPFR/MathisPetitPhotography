<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    // Lister toutes les catégories
    public function index()
    {
        $categories = Category::all();
        return response()->json($categories);
    }

    // Créer une nouvelle catégorie
    public function store(Request $request)
    {
        // Valider les données
        $validatedData = $request->validate([
            'name' => 'required|string|max:255|unique:categories',
        ]);

        // Créer la catégorie
        $category = Category::create([
            'name' => $validatedData['name'],
        ]);

        return response()->json($category, 201);
    }

    // Afficher une catégorie spécifique
    public function show($id)
    {
        $category = Category::findOrFail($id);
        return response()->json($category);
    }

    // Modifier une catégorie existante
    public function update(Request $request, $id)
    {
        $category = Category::findOrFail($id);

        // Valider les données
        $validatedData = $request->validate([
            'name' => 'required|string|max:255|unique:categories,name,' . $id,
        ]);

        // Mettre à jour la catégorie
        $category->update([
            'name' => $validatedData['name'],
        ]);

        return response()->json($category);
    }

    // Supprimer une catégorie
    public function destroy($id)
    {
        $category = Category::findOrFail($id);
        $category->delete();

        return response()->json(['message' => 'Catégorie supprimée avec succès']);
    }
}
