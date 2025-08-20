# Database Setup Instructions

The error you're seeing indicates that the database tables haven't been created yet. Here's how to fix it:

## Option 1: Using Supabase Dashboard (Recommended)

1. Go to your Supabase project dashboard
2. Navigate to the "SQL Editor" tab
3. Copy and paste the SQL from `supabase/migrations/create_recipe_forum_schema.sql`
4. Click "Run" to execute the migration

## Option 2: Manual Table Creation

If you prefer to create tables manually, go to your Supabase dashboard > Table Editor and create the following tables:

### 1. profiles table
- id (uuid, primary key)
- display_name (text, required)
- avatar_url (text, optional)
- created_at (timestamptz, default now())

### 2. recipes table
- id (uuid, primary key, default gen_random_uuid())
- title (text, required)
- description (text, required)
- ingredients (text[], default empty array)
- instructions (text, required)
- tags (text[], default empty array)
- is_vegetarian (boolean, default false)
- main_ingredient (text, required)
- author_id (uuid, foreign key to profiles.id)
- created_at (timestamptz, default now())
- updated_at (timestamptz, default now())
- comment_count (integer, default 0)

### 3. comments table
- id (uuid, primary key, default gen_random_uuid())
- recipe_id (uuid, foreign key to recipes.id)
- author_id (uuid, foreign key to profiles.id)
- content (text, required)
- created_at (timestamptz, default now())

## After Creating Tables

1. Enable Row Level Security (RLS) for all tables
2. Set up the policies as defined in the migration file
3. Refresh your browser to test the application

The application should work properly once the database schema is in place.