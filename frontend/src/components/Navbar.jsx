import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { createNewResume, isAuthenticated, logout, user } = useApp();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const isActive = (path) => location.pathname === path;
  const displayName = user?.name || 'ResumeIQ User';
  const displayEmail = user?.email || 'Signed in';
  const initials = displayName
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('') || 'RI';

  const handleBuildResume = () => {
    if (isAuthenticated) {
      createNewResume();
      navigate('/editor');
    } else {
      navigate('/register');
    }
  };

  const handleLogout = () => {
    setProfileOpen(false);
    setMobileOpen(false);
    logout();
    navigate('/');
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

          {isAuthenticated ? (
            <>
              <div className="relative hidden md:block">
                <button
                  className="flex items-center gap-2 rounded-full border border-outline-variant/40 bg-white px-2 py-1.5 text-left shadow-sm transition-all hover:border-primary/40 hover:bg-surface-container-low"
                  onClick={() => setProfileOpen((open) => !open)}
                  title="My Account"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-extrabold text-on-primary">
                    {initials}
                  </span>
                  <span className="min-w-0 max-w-[150px]">
                    <span className="block truncate text-xs font-bold text-on-surface">{displayName}</span>
                    <span className="block truncate text-[10px] text-on-surface-variant">{displayEmail}</span>
                  </span>
                  <span className="material-symbols-outlined text-[18px] text-on-surface-variant">expand_more</span>
                </button>

                {profileOpen && (
                  <div className="absolute right-0 top-12 z-50 w-80 rounded-2xl border border-outline-variant/40 bg-white p-4 text-left shadow-2xl">
                    <div className="flex items-center gap-3 border-b border-outline-variant/20 pb-4">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-extrabold text-on-primary">
                        {initials}
                      </span>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-bold text-on-surface">{displayName}</p>
                        <p className="truncate text-xs text-on-surface-variant">{displayEmail}</p>
                      </div>
                    </div>
                    <div className="mt-3 space-y-1">
                      <button
                        onClick={() => { setProfileOpen(false); navigate('/dashboard'); }}
                        className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-bold text-on-surface-variant transition-all hover:bg-surface-container-low hover:text-primary"
                      >
                        <span className="material-symbols-outlined text-[20px]">dashboard</span>
                        Dashboard
                      </button>
                      <button
                        onClick={handleLogout}
                        className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-bold text-on-surface-variant transition-all hover:bg-red-50 hover:text-red-600"
                      >
                        <span className="material-symbols-outlined text-[20px]">logout</span>
                        Log out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <button
              onClick={() => navigate('/login')}
              className="hidden md:flex items-center gap-1.5 px-4 py-2 border border-outline-variant text-on-surface-variant rounded-full text-sm font-bold hover:bg-surface-container hover:text-primary transition-all"
            >
              <span className="material-symbols-outlined text-[18px]">login</span>
              Log in
            </button>
          )}

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
          {isAuthenticated && (
            <div className="mb-2 flex items-center gap-3 rounded-2xl border border-outline-variant/30 bg-surface-container-low px-4 py-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-extrabold text-on-primary">
                {initials}
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-bold text-on-surface">{displayName}</p>
                <p className="truncate text-xs text-on-surface-variant">{displayEmail}</p>
              </div>
            </div>
          )}
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
          {isAuthenticated ? (
            <button
              onClick={() => { setMobileOpen(false); handleLogout(); }}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-on-surface-variant hover:bg-surface-container-low text-sm font-medium transition-all"
            >
              <span className="material-symbols-outlined text-[20px]">logout</span>
              Log out
            </button>
          ) : (
            <Link
              to="/login"
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-on-surface-variant hover:bg-surface-container-low text-sm font-medium transition-all"
            >
              <span className="material-symbols-outlined text-[20px]">login</span>
              Log in
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
