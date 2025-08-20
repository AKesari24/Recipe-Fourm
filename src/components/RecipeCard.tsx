import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Clock, Users, MessageCircle, Leaf, ChefHat } from 'lucide-react';
import { supabase } from '../lib/supabase';

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

interface Profile {
  display_name: string;
}

interface RecipeCardProps {
  recipe: Recipe;
}

export function RecipeCard({ recipe }: RecipeCardProps) {
  const [authorName, setAuthorName] = useState<string>('');

  useEffect(() => {
    async function fetchAuthor() {
      const { data } = await supabase
        .from('profiles')
        .select('display_name')
        .eq('id', recipe.author_id)
        .single();
      
      if (data) setAuthorName(data.display_name);
    }
    
    fetchAuthor();
  }, [recipe.author_id]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <article className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-orange-100 hover:border-orange-200 group">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <Link
              to={`/recipe/${recipe.id}`}
              className="block group-hover:text-orange-600 transition-colors"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
                {recipe.title}
              </h3>
            </Link>
            <p className="text-gray-600 text-sm line-clamp-2 mb-3">
              {recipe.description}
            </p>
          </div>
          {recipe.is_vegetarian && (
            <div className="flex items-center space-x-1 bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium ml-4">
              <Leaf className="h-3 w-3" />
              <span>Vegetarian</span>
            </div>
          )}
        </div>

        <div className="flex items-center text-sm text-gray-500 mb-4">
          <ChefHat className="h-4 w-4 mr-1" />
          <span className="font-medium text-orange-600">{authorName}</span>
          <span className="mx-2">•</span>
          <Clock className="h-4 w-4 mr-1" />
          <span>{formatDate(recipe.created_at)}</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1 text-sm text-gray-500">
              <Users className="h-4 w-4" />
              <span>{recipe.ingredients.length} ingredients</span>
            </div>
            <div className="flex items-center space-x-1 text-sm text-gray-500">
              <MessageCircle className="h-4 w-4" />
              <span>{recipe.comment_count} comments</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-1">
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-700">
              {recipe.main_ingredient}
            </span>
            {recipe.tags.slice(0, 2).map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}