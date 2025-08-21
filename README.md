# Recipe Forum Application

A modern, community-driven recipe sharing platform built with React, TypeScript, and Supabase. Share your favorite recipes, discover new dishes, and connect with fellow food enthusiasts from around the world.

## Features

- 🔐 **User Authentication** - Secure registration and login with custom display names
- 📝 **Recipe Sharing** - Post detailed recipes with ingredients, instructions, and tags
- 💬 **Interactive Comments** - Comment on recipes and engage with the community
- 🔍 **Advanced Search** - Search by title, ingredients, tags, or dietary preferences
- 📱 **Responsive Design** - Optimized for desktop, tablet, and mobile devices
- ⚡ **Real-time Updates** - Live comments and recipe updates using Supabase subscriptions
- 🌱 **Dietary Filters** - Filter recipes by vegetarian/non-vegetarian preferences
- 👥 **Community Features** - User profiles and activity tracking

## Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Backend**: Supabase (PostgreSQL database, Authentication, Real-time subscriptions)
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Deployment**: Ready for Vercel, Netlify, or any static hosting

## Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (version 16 or higher) - [Download here](https://nodejs.org/)
- **npm** or **yarn** package manager
- **Git** - [Download here](https://git-scm.com/)
- **Supabase Account** - [Sign up here](https://supabase.com/)

## Installation & Setup

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd recipe-forum-app
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Supabase Database

#### Create a Supabase Project
1. Go to [Supabase Dashboard](https://app.supabase.com/)
2. Click "New Project"
3. Fill in your project details
4. Wait for the project to be created (this may take a few minutes)

#### Get Your Supabase Credentials
1. In your Supabase dashboard, go to **Settings** → **API**
2. Copy your **Project URL** and **anon public key**

#### Set Up Environment Variables
1. Copy the example environment file:
   ```bash
   cp .env.example .env
   ```

2. Open `.env` and add your Supabase credentials:
   ```env
   VITE_SUPABASE_URL=your_supabase_project_url_here
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
   ```

### 4. Create Database Schema

#### Option 1: Using Supabase Dashboard (Recommended)
1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor**
3. Copy the entire content from `supabase/migrations/create_recipe_forum_schema.sql`
4. Paste it into the SQL Editor
5. Click **Run** to execute the migration

#### Option 2: Manual Table Creation
If you prefer to create tables manually, follow the instructions in `setup-database.md`

### 5. Configure Authentication (Optional)

By default, email confirmation is disabled. If you want to enable it:

1. Go to **Authentication** → **Settings** in your Supabase dashboard
2. Under **User Signups**, toggle "Enable email confirmations"
3. Configure your email templates if needed

### 6. Start the Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

