import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import { Layout } from './components/Layout';
import { HomePage } from './components/HomePage';
import { AuthForm } from './components/AuthForm';
import { RecipeForm } from './components/RecipeForm';
import { SearchPage } from './components/SearchPage';
import { RecipeDetailPage } from './components/RecipeDetailPage';

function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading RecipeForum...</p>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/recipe/:id" element={<RecipeDetailPage />} />
          <Route
            path="/login"
            element={
              user ? <Navigate to="/" replace /> : <AuthForm mode="login" />
            }
          />
          <Route
            path="/register"
            element={
              user ? <Navigate to="/" replace /> : <AuthForm mode="register" />
            }
          />
          <Route
            path="/create"
            element={
              user ? <RecipeForm /> : <Navigate to="/login" replace />
            }
          />
          <Route
            path="/profile"
            element={
              user ? (
                <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8">
                  <h1 className="text-3xl font-bold text-gray-900 mb-4">Profile</h1>
                  <p className="text-gray-600">Profile page coming soon!</p>
                </div>
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;