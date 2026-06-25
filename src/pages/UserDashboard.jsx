import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export default function UserDashboard() {
  const navigate = useNavigate();
  const { resumes, setActiveResumeId, createNewResume, updateResume } = useApp();
  const [deleteId, setDeleteId] = useState(null);
  const [sortBy, setSortBy] = useState('recent');

  const handleEditResume = (id) => {
    setActiveResumeId(id);
    navigate('/editor');
  };

  const handleCreateNew = () => {
    createNewResume();
    navigate('/editor');
  };

  const handleDeleteResume = (id) => {
    setDeleteId(null);
    // Note: for demo we just navigate away since delete is not in context
    // In a real app, you'd call deleteResume(id)
  };

  const sortedResumes = [...resumes].sort((a, b) => {
    if (sortBy === 'score') return b.atsScore - a.atsScore;
    return 0; // default: keep original order (recent)
  });

  const statusColors = {
    'AI Optimized': { dot: 'bg-emerald-500', badge: 'text-emerald-700 bg-emerald-50 border-emerald-200' },
    'Classic Template': { dot: 'bg-blue-500', badge: 'text-blue-700 bg-blue-50 border-blue-200' },
    'Draft': { dot: 'bg-amber-500', badge: 'text-amber-700 bg-amber-50 border-amber-200' },
  };

  const statsCards = [
    { label: 'Total Resumes', value: resumes.length, icon: 'description', color: 'text-primary bg-primary/10' },
    { label: 'Avg ATS Score', value: `${Math.round(resumes.reduce((s, r) => s + r.atsScore, 0) / resumes.length)}%`, icon: 'analytics', color: 'text-emerald-600 bg-emerald-50' },
    { label: 'Applications', value: '3', icon: 'send', color: 'text-amber-600 bg-amber-50' },
    { label: 'Interviews', value: '1', icon: 'groups', color: 'text-violet-600 bg-violet-50' },
  ];

  return (
    <div className="flex min-h-screen text-left font-sans bg-surface">
      {/* ── Sidebar ── */}
      <aside className="hidden md:flex h-screen w-60 fixed left-0 top-0 bg-surface-container-lowest border-r border-outline-variant/20 flex-col p-4 gap-2 shadow-sm z-30">
        {/* Logo */}
        <div className="flex items-center gap-3 px-2 py-4 mb-2">
          <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center text-on-primary">
            <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
          </div>
          <div>
            <h1 className="text-base font-extrabold text-primary font-headline leading-none">ResumeIQ</h1>
            <p className="text-[10px] text-on-surface-variant">AI-Powered Drafting</p>
          </div>
        </div>

        <nav className="flex flex-col gap-1">
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-3 px-3 py-2.5 bg-primary-container text-on-primary-container rounded-xl font-bold transition-all w-full text-left text-sm"
          >
            <span className="material-symbols-outlined text-[20px]">dashboard</span>
            Dashboard
          </button>
          <button
            onClick={() => navigate('/editor')}
            className="flex items-center gap-3 px-3 py-2.5 text-on-surface-variant hover:bg-surface-container-low rounded-xl transition-all w-full text-left text-sm font-medium"
          >
            <span className="material-symbols-outlined text-[20px]">edit_note</span>
            Editor
          </button>
          <button
            onClick={() => navigate('/templates')}
            className="flex items-center gap-3 px-3 py-2.5 text-on-surface-variant hover:bg-surface-container-low rounded-xl transition-all w-full text-left text-sm font-medium"
          >
            <span className="material-symbols-outlined text-[20px]">grid_view</span>
            Templates
          </button>
          <button
            onClick={() => navigate('/cover-letter')}
            className="flex items-center gap-3 px-3 py-2.5 text-on-surface-variant hover:bg-surface-container-low rounded-xl transition-all w-full text-left text-sm font-medium"
          >
            <span className="material-symbols-outlined text-[20px]">description</span>
            Cover Letters
          </button>
          <button
            onClick={() => navigate('/preview')}
            className="flex items-center gap-3 px-3 py-2.5 text-on-surface-variant hover:bg-surface-container-low rounded-xl transition-all w-full text-left text-sm font-medium"
          >
            <span className="material-symbols-outlined text-[20px]">visibility</span>
            Preview & Export
          </button>
        </nav>

        {/* Pro Banner */}
        <div className="mt-auto p-4 bg-primary/5 rounded-2xl border border-primary/10">
          <div className="flex items-center gap-2 mb-2">
            <span className="material-symbols-outlined text-primary text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>workspace_premium</span>
            <p className="text-xs font-bold text-primary">PRO PLAN</p>
          </div>
          <p className="text-[11px] text-on-surface-variant mb-3">Unlock unlimited AI rewrites and keyword tracking.</p>
          <button className="w-full py-2 bg-primary text-on-primary rounded-xl text-xs font-bold hover:shadow-lg transition-all active:scale-95 flex items-center justify-center gap-1">
            <span className="material-symbols-outlined text-[14px]">bolt</span>
            Upgrade to Pro
          </button>
        </div>

        {/* User */}
        <div className="flex items-center gap-3 px-2 pt-3 border-t border-outline-variant/20">
          <div className="w-8 h-8 rounded-full bg-primary-container overflow-hidden flex items-center justify-center">
            <span className="material-symbols-outlined text-primary text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>account_circle</span>
          </div>
          <div>
            <p className="text-sm font-bold text-on-surface leading-none">Alex Rivera</p>
            <p className="text-[10px] text-on-surface-variant">alex.rivera@email.com</p>
          </div>
        </div>
      </aside>

      {/* ── Main Content ── */}
      <main className="flex-1 ml-0 md:ml-60 flex flex-col min-h-screen">
        {/* Top Bar */}
        <header className="sticky top-0 z-20 backdrop-blur-xl bg-surface/90 border-b border-outline-variant/30 px-6 md:px-8 py-3.5 flex justify-between items-center shadow-sm">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-bold text-on-surface font-headline">Dashboard</h2>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/dashboard')}
              className="hidden lg:flex items-center gap-1.5 text-primary font-bold border-b-2 border-primary text-sm pb-0.5"
            >
              <span className="material-symbols-outlined text-[16px]">dashboard</span>
              Overview
            </button>
            <button
              onClick={() => navigate('/templates')}
              className="hidden lg:flex items-center gap-1.5 text-on-surface-variant/80 hover:text-primary transition-colors font-medium text-sm"
            >
              <span className="material-symbols-outlined text-[16px]">grid_view</span>
              Templates
            </button>
            <button className="p-2 text-on-surface-variant hover:text-primary transition-colors relative">
              <span className="material-symbols-outlined text-[22px]">notifications</span>
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full border-2 border-surface"></span>
            </button>
            <button
              onClick={handleCreateNew}
              className="bg-primary text-on-primary px-5 py-2 rounded-full font-bold text-sm hover:shadow-md active:scale-95 transition-all flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[18px]">add</span>
              New Resume
            </button>
          </div>
        </header>

        <div className="p-6 md:p-8 max-w-7xl mx-auto w-full flex flex-col gap-8 pb-16">
          {/* Stats Row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {statsCards.map(({ label, value, icon, color }) => (
              <div key={label} className="bg-white rounded-2xl border border-outline-variant/20 p-5 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow">
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${color}`}>
                  <span className="material-symbols-outlined text-[22px]" style={{ fontVariationSettings: "'FILL' 1" }}>{icon}</span>
                </div>
                <div>
                  <p className="text-2xl font-bold text-on-surface leading-none mb-0.5">{value}</p>
                  <p className="text-xs text-on-surface-variant">{label}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Resumes Section */}
            <section className="lg:col-span-8">
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-xl font-bold text-on-surface font-headline flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-[22px]">folder_open</span>
                  My Resumes
                </h3>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-on-surface-variant">Sort by:</span>
                  <button
                    onClick={() => setSortBy(sortBy === 'recent' ? 'score' : 'recent')}
                    className="flex items-center gap-1 px-3 py-1.5 border border-outline-variant rounded-xl text-xs font-medium hover:bg-surface-container-low transition-all text-on-surface-variant hover:text-primary"
                  >
                    <span className="material-symbols-outlined text-[16px]">swap_vert</span>
                    {sortBy === 'recent' ? 'Recent' : 'ATS Score'}
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {sortedResumes.map((resume) => {
                  const statusStyle = statusColors[resume.status] || statusColors['Draft'];
                  return (
                    <div
                      key={resume.id}
                      onClick={() => handleEditResume(resume.id)}
                      className="group relative bg-white rounded-2xl border border-outline-variant/20 p-5 shadow-sm hover:border-primary/40 hover:-translate-y-1 hover:shadow-xl transition-all cursor-pointer text-left"
                    >
                      {/* Menu button */}
                      <button
                        onClick={(e) => { e.stopPropagation(); }}
                        className="absolute top-4 right-4 p-1 text-on-surface-variant hover:text-primary transition-colors rounded-lg hover:bg-surface-container-low"
                      >
                        <span className="material-symbols-outlined text-[20px]">more_vert</span>
                      </button>

                      <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-primary/8 rounded-xl text-primary">
                          <span className="material-symbols-outlined text-[24px]" style={{ fontVariationSettings: "'FILL' 1" }}>description</span>
                        </div>
                      </div>

                      <h4 className="text-base font-bold text-on-surface mb-1 truncate pr-6">{resume.title}</h4>
                      <p className="text-xs text-on-surface-variant mb-4 flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px]">schedule</span>
                        Last updated {resume.lastUpdated}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-4">
                        <span className={`px-2.5 py-1 border rounded-full text-[11px] font-bold flex items-center gap-1 ${statusStyle.badge}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${statusStyle.dot}`}></span>
                          {resume.status}
                        </span>
                        <span className="px-2.5 py-1 bg-surface-container border border-outline-variant/20 rounded-full text-[11px] font-bold text-on-surface-variant flex items-center gap-1">
                          <span className="material-symbols-outlined text-[12px]">picture_as_pdf</span>
                          PDF · DOCX
                        </span>
                      </div>

                      {/* Score bar */}
                      <div className="mb-4">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">ATS Score</span>
                          <span className={`text-[11px] font-bold ${resume.atsScore >= 90 ? 'text-emerald-600' : 'text-amber-600'}`}>{resume.atsScore}%</span>
                        </div>
                        <div className="h-1.5 bg-surface-container-high rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-700 ${resume.atsScore >= 90 ? 'bg-emerald-500' : 'bg-amber-400'}`}
                            style={{ width: `${resume.atsScore}%` }}
                          ></div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t border-outline-variant/10">
                        <div className="flex items-center gap-1 text-xs text-on-surface-variant">
                          <span className="material-symbols-outlined text-[14px]">style</span>
                          {resume.template}
                        </div>
                        <button className="text-primary font-bold text-sm flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                          Edit
                          <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                        </button>
                      </div>
                    </div>
                  );
                })}

                {/* Create New Ghost Card */}
                <div
                  onClick={handleCreateNew}
                  className="flex flex-col items-center justify-center bg-transparent border-2 border-dashed border-outline-variant/40 rounded-2xl p-6 hover:border-primary/50 hover:bg-primary/3 transition-all cursor-pointer group min-h-[200px]"
                >
                  <div className="w-14 h-14 rounded-2xl border-2 border-dashed border-outline-variant flex items-center justify-center text-outline-variant group-hover:text-primary group-hover:border-primary transition-all mb-3">
                    <span className="material-symbols-outlined text-[28px]">add</span>
                  </div>
                  <p className="font-bold text-sm text-on-surface-variant group-hover:text-primary transition-colors">Create New Resume</p>
                  <p className="text-[11px] text-on-surface-variant/60 mt-1">Start from scratch or a template</p>
                </div>
              </div>
            </section>

            {/* AI Insights Sidebar */}
            <aside className="lg:col-span-4 flex flex-col gap-5">
              {/* Match Score Card */}
              <div className="bg-primary text-on-primary rounded-3xl p-6 shadow-xl relative overflow-hidden">
                <div className="absolute -right-6 -top-6 w-36 h-36 bg-white/10 rounded-full blur-3xl"></div>
                <div className="absolute -left-4 -bottom-4 w-24 h-24 bg-white/5 rounded-full blur-2xl"></div>
                <div className="flex items-center gap-2 mb-5 relative z-10">
                  <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
                  <h4 className="text-xs font-bold uppercase tracking-widest opacity-80">AI Job Match Score</h4>
                </div>
                <div className="flex items-end gap-2 mb-5 relative z-10">
                  <span className="text-5xl font-bold font-headline leading-none">94</span>
                  <span className="text-lg opacity-60 mb-1">/ 100</span>
                </div>
                <p className="text-sm mb-5 leading-snug opacity-90 relative z-10">
                  Your profile is a <span className="font-bold underline">strong match</span> for Senior UI/UX roles at top tech companies.
                </p>
                <div className="space-y-3 relative z-10">
                  {[
                    { label: 'Keyword Match', value: 98 },
                    { label: 'Experience Fit', value: 90 },
                    { label: 'Skills Alignment', value: 94 },
                  ].map(({ label, value }) => (
                    <div key={label}>
                      <div className="flex justify-between text-xs mb-1 opacity-80">
                        <span>{label}</span>
                        <span>{value}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-white/20 rounded-full overflow-hidden">
                        <div className="h-full bg-white rounded-full" style={{ width: `${value}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => navigate('/editor')}
                  className="w-full mt-6 py-3 bg-white text-primary font-bold rounded-2xl hover:bg-opacity-90 transition-all flex items-center justify-center gap-2 relative z-10"
                >
                  <span className="material-symbols-outlined text-[18px]">tips_and_updates</span>
                  View Recommendations
                </button>
              </div>

              {/* Application Tracking */}
              <div className="bg-white rounded-3xl p-5 border border-outline-variant/20 shadow-sm">
                <h4 className="text-base font-bold text-on-surface mb-4 flex items-center justify-between font-headline">
                  <span className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-[20px]">track_changes</span>
                    Applications
                  </span>
                  <span className="material-symbols-outlined text-on-surface-variant text-[20px] cursor-pointer hover:text-primary transition-colors">insights</span>
                </h4>
                <div className="space-y-4">
                  {[
                    { co: 'Google', role: 'Senior Designer', days: '3 days ago', status: 'Under Review', dot: 'bg-amber-500' },
                    { co: 'X Corp', role: 'UI Architect', days: '1 week ago', status: 'Interviewing', dot: 'bg-emerald-500' },
                    { co: 'Figma', role: 'Product Designer', days: '2 weeks ago', status: 'Applied', dot: 'bg-blue-500' },
                  ].map(({ co, role, days, status, dot }) => (
                    <div key={co} className="flex gap-3 p-3 rounded-xl hover:bg-surface-container-low transition-all cursor-pointer">
                      <div className="w-9 h-9 shrink-0 rounded-xl bg-surface-container border border-outline-variant/20 flex items-center justify-center font-bold text-xs text-primary">
                        {co[0]}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-on-surface truncate">{role} · {co}</p>
                        <p className="text-xs text-on-surface-variant flex items-center gap-1">
                          <span className="material-symbols-outlined text-[12px]">schedule</span>
                          {days}
                        </p>
                        <div className="mt-1.5 flex items-center gap-1.5">
                          <span className={`w-1.5 h-1.5 rounded-full ${dot}`}></span>
                          <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wide">{status}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="w-full mt-4 py-2.5 text-primary font-bold text-sm hover:bg-primary/5 rounded-xl transition-colors flex items-center justify-center gap-1">
                  <span className="material-symbols-outlined text-[16px]">open_in_new</span>
                  View All Activity
                </button>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-3xl p-5 border border-outline-variant/20 shadow-sm">
                <h4 className="text-base font-bold text-on-surface mb-4 font-headline flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-[20px]">bolt</span>
                  Quick Actions
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { label: 'Edit Resume', icon: 'edit_note', path: '/editor' },
                    { label: 'Templates', icon: 'grid_view', path: '/templates' },
                    { label: 'Cover Letter', icon: 'description', path: '/cover-letter' },
                    { label: 'Export PDF', icon: 'download', path: '/preview' },
                  ].map(({ label, icon, path }) => (
                    <button
                      key={label}
                      onClick={() => navigate(path)}
                      className="flex flex-col items-center gap-2 p-3 bg-surface-container-low hover:bg-primary/5 border border-outline-variant/20 hover:border-primary/30 rounded-2xl transition-all group"
                    >
                      <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary transition-colors text-[22px]">{icon}</span>
                      <span className="text-[11px] font-bold text-on-surface-variant group-hover:text-primary transition-colors text-center">{label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </div>
  );
}
