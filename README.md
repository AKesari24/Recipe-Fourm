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

## Usage Guide

### Getting Started
1. **Register**: Create a new account with your email and display name
2. **Login**: Sign in with your credentials
3. **Explore**: Browse existing recipes on the homepage
4. **Search**: Use the search function to find specific recipes
5. **Create**: Share your own recipes with the community
6. **Engage**: Comment on recipes and interact with other users

### Creating a Recipe
1. Click **"Post Recipe"** in the navigation
2. Fill in the recipe details:
   - **Title**: Give your recipe a catchy name
   - **Description**: Brief overview of the dish
   - **Main Ingredient**: Primary ingredient (for categorization)
   - **Ingredients**: List all ingredients with measurements
   - **Instructions**: Step-by-step cooking instructions
   - **Tags**: Add relevant tags for discoverability
   - **Dietary Info**: Mark if vegetarian
3. Click **"Publish Recipe"** to share with the community

### Interacting with Recipes
- **View Details**: Click on any recipe card to see the full recipe
- **Comment**: Share your thoughts, tips, or variations
- **Search**: Find recipes by title, ingredients, or tags
- **Filter**: Use dietary filters to find suitable recipes

## Project Structure

```
recipe-forum-app/
├── public/                 # Static assets
├── src/
│   ├── components/        # React components
│   │   ├── AuthForm.tsx   # Login/Register forms
│   │   ├── HomePage.tsx   # Main recipe feed
│   │   ├── Layout.tsx     # App layout and navigation
│   │   ├── RecipeCard.tsx # Recipe preview cards
│   │   ├── RecipeDetailPage.tsx # Full recipe view
│   │   ├── RecipeForm.tsx # Recipe creation form
│   │   └── SearchPage.tsx # Search functionality
│   ├── hooks/
│   │   └── useAuth.ts     # Authentication hook
│   ├── lib/
│   │   └── supabase.ts    # Supabase client configuration
│   ├── App.tsx            # Main app component
│   ├── main.tsx          # App entry point
│   └── index.css         # Global styles
├── supabase/
│   └── migrations/       # Database schema
├── .env.example          # Environment variables template
├── package.json          # Dependencies and scripts
└── README.md            # This file
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Database Schema

The application uses the following main tables:

- **profiles** - User profiles with display names
- **recipes** - Recipe data with ingredients, instructions, and metadata
- **comments** - User comments on recipes

All tables have Row Level Security (RLS) enabled for data protection.

## Troubleshooting

### Common Issues

#### "Could not find table" Error
- **Cause**: Database schema hasn't been created
- **Solution**: Follow step 4 in the setup guide to create the database schema

#### "Invalid login credentials" Error
- **Cause**: User doesn't exist or wrong credentials
- **Solution**: Make sure to register first, or check your email/password

#### "Foreign key constraint violation" Error
- **Cause**: User profile wasn't created properly
- **Solution**: The app now handles this automatically, but you can manually create a profile in Supabase if needed

#### Environment Variables Not Loading
- **Cause**: `.env` file not configured properly
- **Solution**: Make sure your `.env` file is in the root directory and variables start with `VITE_`

### Getting Help

If you encounter issues:

1. Check the browser console for error messages
2. Verify your Supabase credentials in `.env`
3. Ensure the database schema has been created
4. Check that your Supabase project is active and accessible

## Deployment

### Deploy to Vercel
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Deploy to Netlify
1. Build the project: `npm run build`
2. Upload the `dist` folder to Netlify
3. Configure environment variables
4. Set up redirects for SPA routing

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes
4. Commit: `git commit -m 'Add some feature'`
5. Push: `git push origin feature-name`
6. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

If you find this project helpful, please consider giving it a star ⭐ on GitHub!

---

**Happy Cooking! 👨‍🍳👩‍🍳**

Built with ❤️ using React, TypeScript, and Supabase.