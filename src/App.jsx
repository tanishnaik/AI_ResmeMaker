import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LandingPage from './pages/LandingPage';
import UserDashboard from './pages/UserDashboard';
import TemplateGallery from './pages/TemplateGallery';
import AIResumeEditor from './pages/AIResumeEditor';
import PreviewExport from './pages/PreviewExport';
import CoverLetterGenerator from './pages/CoverLetterGenerator';
import './App.css';

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
      <Route path="/dashboard" element={<UserDashboard />} />
      <Route path="/templates" element={<TemplateGallery />} />
      <Route path="/editor" element={<AIResumeEditor />} />
      <Route path="/preview" element={<PreviewExport />} />
      <Route path="/cover-letter" element={<CoverLetterGenerator />} />
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
