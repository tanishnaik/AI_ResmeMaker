import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export default function AuthPage({ mode = 'login' }) {
  const navigate = useNavigate();
  const { login, register } = useApp();
  const isRegister = mode === 'register';
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      if (isRegister) {
        await register(form);
      } else {
        await login({ email: form.email, password: form.password });
      }
      navigate('/dashboard');
    } catch (submitError) {
      setError(submitError.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface flex text-left">
      <section className="hidden lg:flex w-[44%] bg-primary text-on-primary p-12 flex-col justify-between">
        <Link to="/" className="text-2xl font-extrabold font-headline">ResumeIQ</Link>
        <div>
          <div className="w-14 h-14 rounded-2xl bg-white/15 flex items-center justify-center mb-6">
            <span className="material-symbols-outlined text-[32px]" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
          </div>
          <h1 className="text-4xl font-bold font-headline mb-4 leading-tight">Build a sharper resume workspace.</h1>
          <p className="text-white/75 text-lg max-w-md">
            Save resumes, templates, cover letters, and AI edits to your own account.
          </p>
        </div>
        <div className="grid grid-cols-3 gap-3 text-xs">
          {['ATS scoring', 'AI rewrites', 'PDF export'].map((item) => (
            <div key={item} className="rounded-xl bg-white/10 border border-white/15 px-3 py-2 font-bold">
              {item}
            </div>
          ))}
        </div>
      </section>

      <main className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <Link to="/" className="lg:hidden inline-flex text-2xl font-extrabold text-primary font-headline mb-10">ResumeIQ</Link>
          <div className="bg-white border border-outline-variant/30 rounded-2xl p-8 shadow-xl">
            <div className="mb-6">
              <p className="text-xs font-bold text-primary uppercase tracking-widest mb-2">
                {isRegister ? 'Create account' : 'Welcome back'}
              </p>
              <h2 className="text-3xl font-bold text-on-surface font-headline">
                {isRegister ? 'Sign up' : 'Log in'}
              </h2>
              <p className="text-sm text-on-surface-variant mt-2">
                {isRegister ? 'Start with a ready-made sample workspace.' : 'Continue editing your saved resumes.'}
              </p>
            </div>

            {error && (
              <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {isRegister && (
                <div>
                  <label className="block text-[10px] font-bold text-on-surface-variant uppercase tracking-wider mb-2">Name</label>
                  <input
                    value={form.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    className="w-full rounded-xl border border-outline-variant/40 px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/15"
                    placeholder="Alex Rivera"
                    autoComplete="name"
                  />
                </div>
              )}

              <div>
                <label className="block text-[10px] font-bold text-on-surface-variant uppercase tracking-wider mb-2">Email</label>
                <input
                  value={form.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  className="w-full rounded-xl border border-outline-variant/40 px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/15"
                  placeholder="you@example.com"
                  autoComplete="email"
                  type="email"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-on-surface-variant uppercase tracking-wider mb-2">Password</label>
                <input
                  value={form.password}
                  onChange={(e) => handleChange('password', e.target.value)}
                  className="w-full rounded-xl border border-outline-variant/40 px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/15"
                  placeholder="Minimum 6 characters"
                  autoComplete={isRegister ? 'new-password' : 'current-password'}
                  type="password"
                />
              </div>

              <button
                disabled={isSubmitting}
                className="w-full bg-primary text-on-primary rounded-xl py-3.5 text-sm font-bold hover:shadow-lg active:scale-95 transition-all disabled:opacity-60 flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-[18px]">{isSubmitting ? 'sync' : isRegister ? 'person_add' : 'login'}</span>
                {isSubmitting ? 'Please wait...' : isRegister ? 'Create account' : 'Log in'}
              </button>
            </form>

            <div className="mt-6 text-sm text-on-surface-variant">
              {isRegister ? 'Already have an account?' : "Don't have an account?"}{' '}
              <Link className="font-bold text-primary hover:underline" to={isRegister ? '/login' : '/register'}>
                {isRegister ? 'Log in' : 'Sign up'}
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

