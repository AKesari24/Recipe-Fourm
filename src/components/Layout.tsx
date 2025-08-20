import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Search, Plus, User, LogOut, ChefHat } from 'lucide-react';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { user, signOut } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
      <header className="bg-white border-b border-orange-200 sticky top-0 z-50 backdrop-blur-sm bg-white/95">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link
              to="/"
              className="flex items-center space-x-2 text-xl font-bold text-orange-600 hover:text-orange-700 transition-colors"
            >
              <ChefHat className="h-8 w-8" />
              <span>RecipeForum</span>
            </Link>

            <nav className="flex items-center space-x-4">
              {user ? (
                <>
                  <Link
                    to="/search"
                    className="flex items-center space-x-1 px-3 py-2 text-gray-600 hover:text-orange-600 rounded-lg hover:bg-orange-50 transition-all"
                  >
                    <Search className="h-4 w-4" />
                    <span className="hidden sm:inline">Search</span>
                  </Link>
                  <Link
                    to="/create"
                    className="flex items-center space-x-1 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-all shadow-sm hover:shadow-md"
                  >
                    <Plus className="h-4 w-4" />
                    <span className="hidden sm:inline">Post Recipe</span>
                  </Link>
                  <Link
                    to="/profile"
                    className="flex items-center space-x-1 px-3 py-2 text-gray-600 hover:text-orange-600 rounded-lg hover:bg-orange-50 transition-all"
                  >
                    <User className="h-4 w-4" />
                    <span className="hidden sm:inline">Profile</span>
                  </Link>
                  <button
                    onClick={signOut}
                    className="flex items-center space-x-1 px-3 py-2 text-gray-600 hover:text-red-600 rounded-lg hover:bg-red-50 transition-all"
                  >
                    <LogOut className="h-4 w-4" />
                    <span className="hidden sm:inline">Sign Out</span>
                  </button>
                </>
              ) : (
                <div className="flex items-center space-x-2">
                  <Link
                    to="/login"
                    className="px-4 py-2 text-gray-600 hover:text-orange-600 transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-all shadow-sm hover:shadow-md"
                  >
                    Register
                  </Link>
                </div>
              )}
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      <footer className="bg-orange-900 text-orange-100 mt-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p>&copy; 2025 RecipeForum. Share your culinary adventures with the world.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}