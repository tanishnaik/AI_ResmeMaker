import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export default function PreviewExport() {
  const navigate = useNavigate();
  const { activeResume, updateResume } = useApp();
  const [font, setFont] = useState('Inter');
  const [lineSpacing, setLineSpacing] = useState('Normal');
  const [showToolbar, setShowToolbar] = useState(true);
  const [downloadMsg, setDownloadMsg] = useState('');

  const colors = [
    { name: 'Indigo', hex: '#451ebb' },
    { name: 'Charcoal', hex: '#2d3436' },
    { name: 'Slate', hex: '#64748b' },
    { name: 'Forest', hex: '#059669' },
    { name: 'Crimson', hex: '#dc2626' },
  ];

  const handlePrint = () => {
    setDownloadMsg('Preparing PDF...');
    setTimeout(() => {
      window.print();
      setDownloadMsg('');
    }, 300);
  };

  const getFontClass = () => {
    if (font.includes('Mono') || font.includes('Geist')) return 'font-mono';
    if (font.includes('Merriweather') || font.includes('Serif')) return 'font-serif';
    return 'font-sans';
  };

  const getSpacingClass = () => {
    if (lineSpacing === 'Tight') return 'leading-tight space-y-3';
    if (lineSpacing === 'Loose') return 'leading-loose space-y-8';
    return 'leading-relaxed space-y-6';
  };

  /* ATS Score */
  const calcScore = () => {
    let s = 40;
    if (activeResume.summary?.length > 80) s += 15;
    if (activeResume.experience?.length >= 2) s += 20;
    if (activeResume.skills?.length >= 4) s += 15;
    if (activeResume.education?.length >= 1) s += 10;
    return Math.min(s, 100);
  };
  const atsScore = calcScore();

  return (
    <div className="bg-surface text-on-surface font-sans min-h-screen relative pb-20 text-left">
      {/* Top Bar */}
      <header className="bg-white border-b border-outline-variant/30 px-6 md:px-8 py-3.5 flex justify-between items-center shadow-sm no-print sticky top-0 z-40">
        <div className="flex items-center gap-6">
          <span
            onClick={() => navigate('/')}
            className="text-xl font-extrabold text-primary font-headline cursor-pointer"
          >
            ResumeIQ
          </span>
          <nav className="hidden md:flex gap-4">
            <button
              onClick={() => navigate('/editor')}
              className="flex items-center gap-1.5 text-on-surface-variant hover:text-primary font-medium text-sm transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">edit_note</span>
              Editor
            </button>
            <button
              onClick={() => navigate('/dashboard')}
              className="flex items-center gap-1.5 text-on-surface-variant hover:text-primary font-medium text-sm transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">analytics</span>
              Dashboard
            </button>
            <button
              onClick={() => navigate('/templates')}
              className="flex items-center gap-1.5 text-on-surface-variant hover:text-primary font-medium text-sm transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">grid_view</span>
              Templates
            </button>
          </nav>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/editor')}
            className="hidden md:flex items-center gap-1.5 px-4 py-2 border border-outline-variant text-on-surface-variant rounded-full text-sm font-medium hover:bg-surface-container transition-all"
          >
            <span className="material-symbols-outlined text-[18px]">edit</span>
            Edit Resume
          </button>
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 bg-primary text-on-primary px-5 py-2.5 rounded-full text-sm font-bold hover:shadow-lg transition-transform active:scale-95"
          >
            <span className="material-symbols-outlined text-[20px]">download</span>
            {downloadMsg || 'Download PDF'}
          </button>
        </div>
      </header>

      <main className="container mx-auto px-4 md:px-8 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-7xl">
        {/* Document Preview */}
        <div className={`${showToolbar ? 'lg:col-span-8' : 'lg:col-span-12'} flex justify-center transition-all`}>
          <div className="w-full max-w-[800px]">
            {/* Status bar */}
            <div className="mb-4 flex justify-between items-center no-print">
              <div className="flex items-center gap-3">
                <span className="bg-secondary-container text-on-secondary-container px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">visibility</span>
                  Review Mode
                </span>
                <span className="text-xs text-on-surface-variant">Template: {activeResume.template}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${atsScore >= 80 ? 'bg-emerald-500' : 'bg-amber-400'}`}></div>
                <span className="text-xs font-bold text-on-surface-variant">ATS Score: {atsScore}/100</span>
              </div>
            </div>

            {/* Resume Sheet */}
            <div
              id="resume-canvas"
              className={`bg-white shadow-2xl p-12 md:p-16 border border-outline-variant/10 rounded-sm min-h-[1050px] text-slate-800 transition-all ${getFontClass()} relative`}
            >
              {/* Accent strip */}
              <div className="h-2 w-full absolute top-0 left-0 rounded-t-sm" style={{ backgroundColor: activeResume.primaryColor || '#451ebb' }}></div>

              <header className="mb-8 pb-6 border-b-2 mt-2" style={{ borderColor: activeResume.primaryColor || '#451ebb' }}>
                <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight leading-none mb-1">
                  {activeResume.name?.toUpperCase() || 'YOUR NAME'}
                </h1>
                {activeResume.jobTitle && (
                  <p className="font-bold text-sm tracking-wide uppercase mb-3" style={{ color: activeResume.primaryColor || '#451ebb' }}>
                    {activeResume.jobTitle}
                  </p>
                )}
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-slate-500 text-xs font-medium">
                  {activeResume.email && <span>{activeResume.email}</span>}
                  {activeResume.phone && <><span>•</span><span>{activeResume.phone}</span></>}
                  {activeResume.location && <><span>•</span><span>{activeResume.location}</span></>}
                </div>
              </header>

              <div className={getSpacingClass()}>
                <section>
                  <h2 className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: activeResume.primaryColor || '#451ebb' }}>
                    Professional Summary
                  </h2>
                  <p className="text-sm leading-relaxed text-slate-600 italic border-l-4 pl-4 border-slate-100">
                    {activeResume.summary}
                  </p>
                </section>

                {activeResume.experience?.length > 0 && (
                  <section>
                    <h2 className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: activeResume.primaryColor || '#451ebb' }}>
                      Experience
                    </h2>
                    <div className="space-y-6">
                      {activeResume.experience.map((exp) => (
                        <div key={exp.id} className="relative pl-4 border-l-2 border-slate-100">
                          <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full" style={{ backgroundColor: activeResume.primaryColor || '#451ebb' }}></div>
                          <div className="flex justify-between items-baseline mb-1">
                            <h3 className="font-bold text-base text-slate-900">{exp.title}</h3>
                            <span className="text-[11px] font-semibold text-slate-400 ml-4 flex-shrink-0">{exp.duration}</span>
                          </div>
                          <p className="text-xs font-bold text-slate-500 mb-2">{exp.company}</p>
                          <p className="text-sm leading-relaxed text-slate-600">{exp.description}</p>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                <div className="grid grid-cols-2 gap-8 pt-2">
                  {activeResume.education?.length > 0 && (
                    <section>
                      <h2 className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: activeResume.primaryColor || '#451ebb' }}>
                        Education
                      </h2>
                      <div className="space-y-3">
                        {activeResume.education.map((edu, idx) => (
                          <div key={idx}>
                            <h4 className="font-bold text-sm text-slate-800">{edu.degree}</h4>
                            <p className="text-xs text-slate-500">{edu.school}</p>
                            {edu.note && <p className="text-xs text-slate-400 italic">{edu.note}</p>}
                          </div>
                        ))}
                      </div>
                    </section>
                  )}

                  {activeResume.skills?.length > 0 && (
                    <section>
                      <h2 className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: activeResume.primaryColor || '#451ebb' }}>
                        Core Skills
                      </h2>
                      <div className="flex flex-wrap gap-1.5">
                        {activeResume.skills.map((skill) => (
                          <span key={skill} className="px-2 py-1 bg-slate-100 text-slate-600 rounded text-xs">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </section>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Toolbar */}
        {showToolbar && (
          <aside className="lg:col-span-4 space-y-4 no-print">
            {/* Appearance */}
            <div className="bg-white border border-outline-variant/30 rounded-2xl p-6 shadow-md">
              <h3 className="text-sm font-bold text-primary mb-4 flex items-center gap-2 font-headline">
                <span className="material-symbols-outlined text-[18px]">palette</span>
                Appearance
              </h3>

              {/* Font */}
              <div className="space-y-2 mb-5">
                <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">font_download</span>
                  Font Family
                </label>
                <select
                  value={font}
                  onChange={(e) => setFont(e.target.value)}
                  className="w-full bg-white border border-outline-variant rounded-xl px-3 py-2.5 text-sm focus:ring-2 focus:ring-primary/20 outline-none"
                >
                  <option>Inter (Sans Serif)</option>
                  <option>Geist (Modern Mono)</option>
                  <option>Merriweather (Serif)</option>
                </select>
              </div>

              {/* Color */}
              <div className="space-y-2 mb-5">
                <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">color_lens</span>
                  Accent Color
                </label>
                <div className="flex gap-2.5">
                  {colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => updateResume({ primaryColor: color.hex })}
                      style={{ backgroundColor: color.hex }}
                      className={`w-8 h-8 rounded-full transition-transform hover:scale-110 ${
                        activeResume.primaryColor === color.hex
                          ? 'ring-2 ring-offset-2 ring-primary shadow-md'
                          : ''
                      }`}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>

              {/* Line Spacing */}
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">format_line_spacing</span>
                  Line Spacing
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {['Tight', 'Normal', 'Loose'].map((s) => (
                    <button
                      key={s}
                      onClick={() => setLineSpacing(s)}
                      className={`p-2 border rounded-xl text-xs font-bold transition-all ${
                        lineSpacing === s
                          ? 'border-primary bg-primary-container text-on-primary-container'
                          : 'border-outline-variant text-on-surface-variant hover:border-primary/50'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* ATS Score */}
            <div className="bg-white border border-outline-variant/30 rounded-2xl p-6 shadow-md">
              <h3 className="text-sm font-bold text-on-surface mb-4 flex items-center gap-2 font-headline">
                <span className="material-symbols-outlined text-[18px] text-primary">analytics</span>
                ATS Analysis
              </h3>
              <div className="flex items-center gap-4 mb-4">
                <div className="relative w-16 h-16">
                  <svg className="w-16 h-16 -rotate-90" viewBox="0 0 64 64">
                    <circle cx="32" cy="32" r="26" fill="none" stroke="#e2e8f0" strokeWidth="8" />
                    <circle
                      cx="32" cy="32" r="26" fill="none"
                      stroke={atsScore >= 80 ? '#10b981' : atsScore >= 60 ? '#f59e0b' : '#6366f1'}
                      strokeWidth="8"
                      strokeLinecap="round"
                      strokeDasharray={`${(atsScore / 100) * 163} 163`}
                    />
                  </svg>
                  <span className="absolute inset-0 flex items-center justify-center text-sm font-bold text-on-surface">{atsScore}</span>
                </div>
                <div>
                  <p className={`font-bold text-sm ${atsScore >= 80 ? 'text-emerald-600' : atsScore >= 60 ? 'text-amber-500' : 'text-red-500'}`}>
                    {atsScore >= 80 ? 'Excellent' : atsScore >= 60 ? 'Good' : 'Needs Work'}
                  </p>
                  <p className="text-xs text-on-surface-variant">out of 100</p>
                </div>
              </div>
              <div className="space-y-2">
                {[
                  { label: 'Summary', done: (activeResume.summary?.length || 0) > 80, icon: 'article' },
                  { label: 'Experience', done: (activeResume.experience?.length || 0) >= 2, icon: 'work' },
                  { label: 'Skills (4+)', done: (activeResume.skills?.length || 0) >= 4, icon: 'psychology' },
                  { label: 'Education', done: (activeResume.education?.length || 0) >= 1, icon: 'school' },
                ].map(({ label, done, icon }) => (
                  <div key={label} className="flex items-center gap-2 text-xs">
                    <span className={`material-symbols-outlined text-[16px] ${done ? 'text-emerald-500' : 'text-on-surface-variant/40'}`}>
                      {done ? 'check_circle' : 'radio_button_unchecked'}
                    </span>
                    <span className="material-symbols-outlined text-[14px] text-on-surface-variant">{icon}</span>
                    <span className={done ? 'text-on-surface font-medium' : 'text-on-surface-variant'}>{label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Check */}
            <div className="bg-primary/5 border border-primary/20 rounded-2xl p-5">
              <div className="flex items-center gap-2 text-primary font-bold text-xs mb-2">
                <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
                AI Content Check
              </div>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                {atsScore >= 80
                  ? 'Your resume is well-optimized with strong action verbs and quantified results. Great work!'
                  : 'Add more experience entries and skills to boost your ATS score. Use specific metrics and action verbs.'}
              </p>
            </div>

            <button
              onClick={() => setShowToolbar(false)}
              className="w-full bg-surface-container-high hover:bg-surface-container-highest text-on-surface py-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-sm">visibility_off</span>
              Hide Panel
            </button>
          </aside>
        )}

        {/* Show toolbar button */}
        {!showToolbar && (
          <button
            onClick={() => setShowToolbar(true)}
            className="fixed bottom-8 right-8 bg-white border border-outline-variant rounded-full p-4 shadow-2xl text-primary hover:scale-110 transition-all z-50 no-print"
            title="Show settings"
          >
            <span className="material-symbols-outlined">tune</span>
          </button>
        )}
      </main>
    </div>
  );
}
