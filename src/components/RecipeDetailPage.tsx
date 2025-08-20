import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAuth } from '../hooks/useAuth';
import { Clock, Users, MessageCircle, Leaf, ChefHat, ArrowLeft, Send } from 'lucide-react';

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

interface Comment {
  id: string;
  recipe_id: string;
  author_id: string;
  content: string;
  created_at: string;
  profiles: {
    display_name: string;
  };
}

interface Profile {
  display_name: string;
}

export function RecipeDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [authorName, setAuthorName] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [commentText, setCommentText] = useState('');
  const [submittingComment, setSubmittingComment] = useState(false);

  const fetchRecipe = async () => {
    if (!id) return;

    try {
      const { data, error } = await supabase
        .from('recipes')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      setRecipe(data);

      // Fetch author name
      const { data: authorData } = await supabase
        .from('profiles')
        .select('display_name')
        .eq('id', data.author_id)
        .single();
      
      if (authorData) setAuthorName(authorData.display_name);
    } catch (error) {
      console.error('Error fetching recipe:', error);
      navigate('/');
    }
  };

  const fetchComments = async () => {
    if (!id) return;

    try {
      const { data, error } = await supabase
        .from('comments')
        .select(`
          *,
          profiles (
            display_name
          )
        `)
        .eq('recipe_id', id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setComments(data || []);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !id || !commentText.trim()) return;

    setSubmittingComment(true);
    try {
      // Ensure user has a profile
      const { data: profile } = await supabase
        .from('profiles')
        .select('id')
        .eq('id', user.id)
        .single();

      if (!profile) {
        await supabase.from('profiles').insert({
          id: user.id,
          display_name: user.email?.split('@')[0] || 'Anonymous User',
        });
      }

      const { error } = await supabase.from('comments').insert({
        recipe_id: id,
        author_id: user.id,
        content: commentText.trim(),
      });

      if (error) throw error;

      setCommentText('');
      fetchComments();
      fetchRecipe(); // Refresh to update comment count
    } catch (error) {
      console.error('Error submitting comment:', error);
      alert('Failed to submit comment. Please try again.');
    } finally {
      setSubmittingComment(false);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await Promise.all([fetchRecipe(), fetchComments()]);
      setLoading(false);
    };

    loadData();

    // Subscribe to real-time comment updates
    const subscription = supabase
      .channel(`recipe-${id}`)
      .on('postgres_changes', { 
        event: '*', 
        schema: 'public', 
        table: 'comments',
        filter: `recipe_id=eq.${id}`
      }, () => {
        fetchComments();
        fetchRecipe();
      })
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [id]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto"></div>
        <p className="text-gray-600 mt-4">Loading recipe...</p>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Recipe not found</p>
        <button
          onClick={() => navigate('/')}
          className="mt-4 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
        >
          Go Home
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <button
        onClick={() => navigate('/')}
        className="flex items-center space-x-2 text-orange-600 hover:text-orange-700 mb-6 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Back to Recipes</span>
      </button>

      <article className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
        <div className="p-8">
          <div className="flex items-start justify-between mb-6">
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{recipe.title}</h1>
              <p className="text-gray-600 text-lg mb-4">{recipe.description}</p>
            </div>
            {recipe.is_vegetarian && (
              <div className="flex items-center space-x-1 bg-green-100 text-green-700 px-3 py-2 rounded-full text-sm font-medium ml-6">
                <Leaf className="h-4 w-4" />
                <span>Vegetarian</span>
              </div>
            )}
          </div>

          <div className="flex items-center text-sm text-gray-500 mb-6">
            <ChefHat className="h-4 w-4 mr-1" />
            <span className="font-medium text-orange-600">{authorName}</span>
            <span className="mx-2">•</span>
            <Clock className="h-4 w-4 mr-1" />
            <span>{formatDate(recipe.created_at)}</span>
            <span className="mx-2">•</span>
            <MessageCircle className="h-4 w-4 mr-1" />
            <span>{recipe.comment_count} comments</span>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Ingredients</h2>
              <ul className="space-y-2">
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index} className="flex items-start">
                    <span className="w-2 h-2 bg-orange-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span className="text-gray-700">{ingredient}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Details</h2>
              <div className="space-y-3">
                <div className="flex items-center">
                  <span className="font-medium text-gray-700 w-32">Main Ingredient:</span>
                  <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded-full text-sm">
                    {recipe.main_ingredient}
                  </span>
                </div>
                {recipe.tags.length > 0 && (
                  <div className="flex items-start">
                    <span className="font-medium text-gray-700 w-32 mt-1">Tags:</span>
                    <div className="flex flex-wrap gap-1">
                      {recipe.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Instructions</h2>
            <div className="prose max-w-none">
              <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                {recipe.instructions}
              </p>
            </div>
          </div>
        </div>
      </article>

      {/* Comments Section */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            Comments ({comments.length})
          </h2>
        </div>

        {user && (
          <div className="p-6 border-b border-gray-200">
            <form onSubmit={handleSubmitComment} className="space-y-4">
              <textarea
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Share your thoughts about this recipe..."
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors resize-none"
                required
              />
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={submittingComment || !commentText.trim()}
                  className="flex items-center space-x-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 focus:ring-2 focus:ring-orange-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  <Send className="h-4 w-4" />
                  <span>{submittingComment ? 'Posting...' : 'Post Comment'}</span>
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="divide-y divide-gray-200">
          {comments.length > 0 ? (
            comments.map((comment) => (
              <div key={comment.id} className="p-6">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                    <span className="text-orange-600 font-medium text-sm">
                      {comment.profiles.display_name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="font-medium text-gray-900">
                        {comment.profiles.display_name}
                      </span>
                      <span className="text-gray-500 text-sm">
                        {formatDate(comment.created_at)}
                      </span>
                    </div>
                    <p className="text-gray-700 whitespace-pre-wrap">
                      {comment.content}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="p-6 text-center text-gray-500">
              <MessageCircle className="h-12 w-12 mx-auto mb-2 text-gray-400" />
              <p>No comments yet. Be the first to share your thoughts!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}