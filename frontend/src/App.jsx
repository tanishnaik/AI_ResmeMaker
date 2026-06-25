import React from 'react';
import { BrowserRouter as Router, Navigate, Routes, Route } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LandingPage from './pages/LandingPage';
import UserDashboard from './pages/UserDashboard';
import TemplateGallery from './pages/TemplateGallery';
import AIResumeEditor from './pages/AIResumeEditor';
import PreviewExport from './pages/PreviewExport';
import CoverLetterGenerator from './pages/CoverLetterGenerator';
import AuthPage from './pages/AuthPage';
import './App.css';

function ProtectedRoute({ children }) {
  const { isAuthenticated, isLoading } = useApp();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center text-primary">
        <div className="flex items-center gap-2 text-sm font-bold">
          <span className="material-symbols-outlined animate-spin">sync</span>
          Loading workspace...
        </div>
      </div>
    );
  }

  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className="flex min-h-screen flex-col bg-surface">
            <Navbar />
            <main className="flex-grow">
              <LandingPage />
            </main>
            <Footer />
          </div>
        }
      />
      <Route path="/login" element={<AuthPage mode="login" />} />
      <Route path="/register" element={<AuthPage mode="register" />} />
      <Route path="/dashboard" element={<ProtectedRoute><UserDashboard /></ProtectedRoute>} />
      <Route path="/templates" element={<ProtectedRoute><TemplateGallery /></ProtectedRoute>} />
      <Route path="/editor" element={<ProtectedRoute><AIResumeEditor /></ProtectedRoute>} />
      <Route path="/preview" element={<ProtectedRoute><PreviewExport /></ProtectedRoute>} />
      <Route path="/cover-letter" element={<ProtectedRoute><CoverLetterGenerator /></ProtectedRoute>} />
    </Routes>
  );
}

function App() {
  return (
    <AppProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AppProvider>
  );
}

export default App;
