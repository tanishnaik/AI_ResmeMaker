import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { createNewResume } = useApp();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  const handleBuildResume = () => {
    createNewResume();
    navigate('/editor');
  };

  const navLinks = [
    { label: 'Dashboard', path: '/dashboard', icon: 'analytics' },
    { label: 'Templates', path: '/templates', icon: 'grid_view' },
    { label: 'Cover Letters', path: '/cover-letter', icon: 'description' },
  ];

  return (
    <nav className="bg-white/90 backdrop-blur-xl border-b border-outline-variant/30 shadow-sm z-50 sticky top-0 no-print">
      <div className="flex justify-between items-center w-full px-6 md:px-8 py-3 max-w-7xl mx-auto">
        {/* Left: Logo + Links */}
        <div className="flex items-center gap-8">
          <Link to="/" className="text-xl font-extrabold text-primary font-headline tracking-tight">
            ResumeIQ
          </Link>
          <div className="hidden md:flex gap-6">
            {navLinks.map(({ label, path }) => (
              <Link
                key={path}
                className={`${
                  isActive(path)
                    ? 'text-primary font-bold'
                    : 'text-on-surface-variant hover:text-primary'
                } transition-colors text-sm font-medium`}
                to={path}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 md:gap-3">
          {/* Notification Bell */}
          <div className="relative">
            <button
              onClick={() => setNotifOpen(!notifOpen)}
              className="hidden md:flex items-center justify-center w-10 h-10 rounded-full text-on-surface-variant hover:bg-surface-container hover:text-primary transition-all"
              title="Notifications"
            >
              <span className="material-symbols-outlined text-[22px]">notifications</span>
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full border-2 border-white"></span>
            </button>
            {notifOpen && (
              <div className="absolute right-0 top-12 w-80 bg-white border border-outline-variant/40 rounded-2xl shadow-2xl p-4 z-50">
                <p className="text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-3">Notifications</p>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 rounded-xl hover:bg-surface-container-low cursor-pointer">
                    <span className="material-symbols-outlined text-primary text-[20px] mt-0.5">auto_awesome</span>
                    <div>
                      <p className="text-sm font-semibold text-on-surface">AI enhancement complete</p>
                      <p className="text-xs text-on-surface-variant">Your resume score improved to 98/100</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 rounded-xl hover:bg-surface-container-low cursor-pointer">
                    <span className="material-symbols-outlined text-amber-500 text-[20px] mt-0.5">trending_up</span>
                    <div>
                      <p className="text-sm font-semibold text-on-surface">New job match found</p>
                      <p className="text-xs text-on-surface-variant">Senior Designer at Google — 94% match</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Account */}
          <button
            className="hidden md:flex items-center justify-center w-10 h-10 rounded-full text-on-surface-variant hover:bg-surface-container hover:text-primary transition-all"
            onClick={() => navigate('/dashboard')}
            title="My Account"
          >
            <span className="material-symbols-outlined text-[22px]">account_circle</span>
          </button>

          {/* Build Resume CTA */}
          <button
            onClick={handleBuildResume}
            className="bg-primary text-on-primary px-5 py-2 rounded-full text-sm font-bold hover:shadow-lg active:scale-95 transition-all flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-[18px]">add</span>
            Build Resume
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-full text-on-surface-variant hover:bg-surface-container"
          >
            <span className="material-symbols-outlined">{mobileOpen ? 'close' : 'menu'}</span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-outline-variant/30 bg-white px-6 py-4 flex flex-col gap-2">
          {navLinks.map(({ label, path, icon }) => (
            <Link
              key={path}
              to={path}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl ${
                isActive(path) ? 'bg-primary-container text-on-primary-container font-bold' : 'text-on-surface-variant hover:bg-surface-container-low'
              } text-sm font-medium transition-all`}
            >
              <span className="material-symbols-outlined text-[20px]">{icon}</span>
              {label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
