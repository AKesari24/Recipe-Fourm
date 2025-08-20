import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { RecipeCard } from './RecipeCard';
import { TrendingUp, Clock, Users } from 'lucide-react';

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

export function HomePage() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState<'recent' | 'popular'>('recent');

  const fetchRecipes = async () => {
    setLoading(true);
    try {
      let query = supabase.from('recipes').select('*');
      
      if (sortBy === 'recent') {
        query = query.order('updated_at', { ascending: false });
      } else {
        query = query.order('comment_count', { ascending: false });
      }

      const { data, error } = await query.limit(20);

      if (error) throw error;
      setRecipes(data || []);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipes();
    
    // Subscribe to real-time updates
    const subscription = supabase
      .channel('recipes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'recipes' }, () => {
        fetchRecipes();
      })
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [sortBy]);

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto"></div>
        <p className="text-gray-600 mt-4">Loading delicious recipes...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome to RecipeForum
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Discover amazing recipes, share your culinary creations, and connect with fellow food enthusiasts from around the world.
        </p>
      </div>

      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Community Recipes</h2>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setSortBy('recent')}
            className={`flex items-center space-x-1 px-4 py-2 rounded-lg transition-all ${
              sortBy === 'recent'
                ? 'bg-orange-600 text-white shadow-sm'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <Clock className="h-4 w-4" />
            <span>Most Recent</span>
          </button>
          <button
            onClick={() => setSortBy('popular')}
            className={`flex items-center space-x-1 px-4 py-2 rounded-lg transition-all ${
              sortBy === 'popular'
                ? 'bg-orange-600 text-white shadow-sm'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <TrendingUp className="h-4 w-4" />
            <span>Most Popular</span>
          </button>
        </div>
      </div>

      {recipes.length > 0 ? (
        <div className="space-y-6">
          {recipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            No recipes yet
          </h3>
          <p className="text-gray-600">
            Be the first to share a delicious recipe with the community!
          </p>
        </div>
      )}
    </div>
  );
}