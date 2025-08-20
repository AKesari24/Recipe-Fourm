import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          display_name: string;
          avatar_url: string | null;
          created_at: string;
        };
        Insert: {
          id: string;
          display_name: string;
          avatar_url?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          display_name?: string;
          avatar_url?: string | null;
          created_at?: string;
        };
      };
      recipes: {
        Row: {
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
        };
        Insert: {
          id?: string;
          title: string;
          description: string;
          ingredients: string[];
          instructions: string;
          tags: string[];
          is_vegetarian?: boolean;
          main_ingredient: string;
          author_id: string;
          created_at?: string;
          updated_at?: string;
          comment_count?: number;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string;
          ingredients?: string[];
          instructions?: string;
          tags?: string[];
          is_vegetarian?: boolean;
          main_ingredient?: string;
          author_id?: string;
          created_at?: string;
          updated_at?: string;
          comment_count?: number;
        };
      };
      comments: {
        Row: {
          id: string;
          recipe_id: string;
          author_id: string;
          content: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          recipe_id: string;
          author_id: string;
          content: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          recipe_id?: string;
          author_id?: string;
          content?: string;
          created_at?: string;
        };
      };
    };
  };
};