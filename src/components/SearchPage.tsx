import React, { useState, useEffect } from 'react';
import { Search, Filter } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { RecipeCard } from './RecipeCard';

interface Recipe {
  id: string;
  title: string;
  description: string;
  ingredients: string[];
  instructions: string;
  tags: string[];
  is_vegetarian: boolean;
  main_ingredient: string;
  author_id: string;
  created_at: string;
  updated_at: string;
  comment_count: number;
}

export function SearchPage() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterVegetarian, setFilterVegetarian] = useState<'all' | 'vegetarian' | 'non-vegetarian'>('all');
  const [loading, setLoading] = useState(false);

  const searchRecipes = async () => {
    setLoading(true);
    try {
      
      // Basic validation
      if (!searchTerm.trim() && filterVegetarian === 'all') {
        setRecipes([]);
        return;
      }
      
      let query = supabase.from('recipes').select('*');

      if (searchTerm.trim()) {
        query = query.or(
          `title.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%,main_ingredient.ilike.%${searchTerm}%,tags.cs.{${searchTerm}}`
        );
      }

      if (filterVegetarian === 'vegetarian') {
        query = query.eq('is_vegetarian', true);
      } else if (filterVegetarian === 'non-vegetarian') {
        query = query.eq('is_vegetarian', false);
      }

      query = query.order('updated_at', { ascending: false });

      const { data, error } = await query;

      if (error) {
        console.error('Error searching recipes:', error.message);
        // If table doesn't exist, show empty results
        if (error.message.includes('does not exist') || error.message.includes('schema cache')) {
          setRecipes([]);
          return;
        }
        throw error;
      }
      setRecipes(data || []);
    } catch (error) {
      console.error('Error searching recipes:', error instanceof Error ? error.message : 'Unknown error');
      setRecipes([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    searchRecipes();
  }, [searchTerm, filterVegetarian]);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Search Recipes</h1>
        
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by title, description, ingredient, or tags..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex items-center space-x-4">
            <Filter className="h-5 w-5 text-gray-500" />
            <select
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
              value={filterVegetarian}
              onChange={(e) => setFilterVegetarian(e.target.value as any)}
            >
              <option value="all">All Recipes</option>
              <option value="vegetarian">Vegetarian Only</option>
              <option value="non-vegetarian">Non-Vegetarian Only</option>
            </select>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto"></div>
          <p className="text-gray-600 mt-4">Searching recipes...</p>
        </div>
      ) : recipes.length > 0 ? (
        <div className="space-y-6">
          <p className="text-gray-600">
            Found {recipes.length} recipe{recipes.length !== 1 ? 's' : ''}
          </p>
          {recipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">
            {searchTerm.trim() || filterVegetarian !== 'all'
              ? 'No recipes found matching your criteria'
              : 'Start typing to search for recipes'}
          </p>
        </div>
      )}
    </div>
  );
}