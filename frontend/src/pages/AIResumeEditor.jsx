import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const SECTIONS = ['Contact', 'Summary', 'Experience', 'Education', 'Skills'];

export default function AIResumeEditor() {
  const navigate = useNavigate();
  const { activeResume, updateResume } = useApp();
  const [aiInput, setAiInput] = useState('');
  const [isSyncing, setIsSyncing] = useState(false);
  const [activeSection, setActiveSection] = useState('Experience');
  const [newSkill, setNewSkill] = useState('');

  /* ── helpers ── */
  const triggerSync = () => {
    setIsSyncing(true);
    setTimeout(() => setIsSyncing(false), 1200);
  };

  const handleInputChange = (field, value) => {
    updateResume({ [field]: value });
    triggerSync();
  };

  /* ── Experience handlers ── */
  const handleExpChange = (id, field, value) => {
    const updated = activeResume.experience.map(e =>
      e.id === id ? { ...e, [field]: value } : e
    );
    updateResume({ experience: updated });
    triggerSync();
  };

  const handleAddExp = () => {
    const newExp = {
      id: `exp-${Date.now()}`,
      title: 'New Role',
      company: 'Company Name',
      duration: '2024 — Present',
      description: 'Describe your key achievements and impact here.'
    };
    updateResume({ experience: [...activeResume.experience, newExp] });
    triggerSync();
  };

  const handleRemoveExp = (id) => {
    updateResume({ experience: activeResume.experience.filter(e => e.id !== id) });
    triggerSync();
  };

  const handleEnhanceExp = (id) => {
    const exp = activeResume.experience.find(e => e.id === id);
    if (!exp) return;
    setIsSyncing(true);
    setTimeout(() => {
      const enhanced = `Spearheaded strategic UX initiatives at ${exp.company}, resulting in a 35% increase in user engagement and a 20% reduction in churn. Collaborated with cross-functional stakeholders to deliver high-impact product features on accelerated timelines.`;
      const updated = activeResume.experience.map(e =>
        e.id === id ? { ...e, description: enhanced } : e
      );
      updateResume({ experience: updated });
      setIsSyncing(false);
    }, 1200);
  };

  /* ── Education handlers ── */
  const handleEduChange = (idx, field, value) => {
    const updated = activeResume.education.map((e, i) =>
      i === idx ? { ...e, [field]: value } : e
    );
    updateResume({ education: updated });
    triggerSync();
  };

  const handleAddEdu = () => {
    const newEdu = { degree: 'Degree / Certification', school: 'Institution Name', note: '' };
    updateResume({ education: [...(activeResume.education || []), newEdu] });
    triggerSync();
  };

  const handleRemoveEdu = (idx) => {
    updateResume({ education: activeResume.education.filter((_, i) => i !== idx) });
    triggerSync();
  };

  /* ── Skills handlers ── */
  const handleAddSkill = (e) => {
    e.preventDefault();
    if (!newSkill.trim()) return;
    if (!activeResume.skills.includes(newSkill.trim())) {
      updateResume({ skills: [...activeResume.skills, newSkill.trim()] });
      triggerSync();
    }
    setNewSkill('');
  };

  const handleRemoveSkill = (skill) => {
    updateResume({ skills: activeResume.skills.filter(s => s !== skill) });
    triggerSync();
  };

  /* ── AI Command ── */
  const handleAiSubmit = (e) => {
    e.preventDefault();
    if (!aiInput.trim()) return;
    setIsSyncing(true);
    const cmd = aiInput.toLowerCase();
    setTimeout(() => {
      if (cmd.includes('leader')) {
        updateResume({
          summary: 'Accomplished design leader with over 8 years orchestrating high-performance teams, establishing scalable visual languages, and steering product strategy from concept to market-dominant execution.',
          experience: activeResume.experience.map(exp => ({
            ...exp,
            description: `Orchestrated design vision and spearheaded cross-functional delivery of core product features, scaling platform operations to support 100k+ active accounts.`
          }))
        });
      } else if (cmd.includes('technical') || cmd.includes('engineer')) {
        updateResume({
          summary: 'Technical product designer bridging design and engineering. Expert in design systems, developer handoff, and data-driven UX optimization that drives measurable business outcomes.'
        });
      } else if (cmd.includes('concise') || cmd.includes('shorten')) {
        updateResume({
          summary: activeResume.summary.split('.').slice(0, 2).join('.') + '.'
        });
      } else {
        updateResume({
          summary: 'Top-performing Design Architect with expertise in cognitive layout methodologies to reduce user friction. Recognized for delivering double-digit conversion improvements across B2B SaaS platforms.'
        });
      }
      setAiInput('');
      setIsSyncing(false);
    }, 1500);
  };

  /* ── Score calculation ── */
  const calcScore = () => {
    let score = 40;
    if (activeResume.summary?.length > 80) score += 15;
    if (activeResume.experience?.length >= 2) score += 20;
    if (activeResume.skills?.length >= 4) score += 15;
    if (activeResume.education?.length >= 1) score += 10;
    return Math.min(score, 100);
  };
  const score = calcScore();

  const sectionIcons = {
    Contact: 'person',
    Summary: 'article',
    Experience: 'work',
    Education: 'school',
    Skills: 'psychology',
  };

  return (
    <div className="bg-surface text-on-surface font-sans overflow-hidden h-[calc(100vh-64px)] flex text-left">
      {/* ── Sidebar ── */}
      <aside className="h-full w-60 bg-surface-container-lowest border-r border-outline-variant/20 flex flex-col p-4 gap-2 z-40 hidden md:flex">
        <div className="px-2 mb-3">
          <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">Sections</p>
        </div>

        <nav className="flex flex-col gap-1">
          {SECTIONS.map((sec) => (
            <button
              key={sec}
              onClick={() => setActiveSection(sec)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-sm transition-all w-full text-left ${
                activeSection === sec
                  ? 'bg-primary-container text-on-primary-container font-bold'
                  : 'text-on-surface-variant hover:bg-surface-variant/40'
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">{sectionIcons[sec]}</span>
              {sec}
            </button>
          ))}
        </nav>

        <div className="border-t border-outline-variant/20 mt-2 pt-4 flex flex-col gap-1">
          <button
            onClick={() => navigate('/templates')}
            className="flex items-center gap-3 px-3 py-2.5 text-on-surface-variant hover:bg-surface-variant/40 rounded-xl transition-all w-full text-left text-sm font-medium"
          >
            <span className="material-symbols-outlined text-[20px]">grid_view</span>
            Templates
          </button>
          <button
            onClick={() => navigate('/cover-letter')}
            className="flex items-center gap-3 px-3 py-2.5 text-on-surface-variant hover:bg-surface-variant/40 rounded-xl transition-all w-full text-left text-sm font-medium"
          >
            <span className="material-symbols-outlined text-[20px]">description</span>
            Cover Letter
          </button>
        </div>

        {/* Score + Preview */}
        <div className="mt-auto p-4 bg-surface-container rounded-2xl">
          <div className="flex justify-between items-center mb-2">
            <p className="text-xs font-bold text-on-surface">Resume Score</p>
            <span className={`text-xs font-bold ${score >= 80 ? 'text-emerald-600' : score >= 60 ? 'text-amber-500' : 'text-red-500'}`}>{score}/100</span>
          </div>
          <div className="w-full h-2 bg-outline-variant/30 rounded-full overflow-hidden mb-4">
            <div
              className={`h-full rounded-full transition-all duration-700 ${score >= 80 ? 'bg-emerald-500' : score >= 60 ? 'bg-amber-400' : 'bg-primary'}`}
              style={{ width: `${score}%` }}
            ></div>
          </div>
          <button
            onClick={() => navigate('/preview')}
            className="w-full py-2.5 bg-primary text-on-primary text-sm font-bold rounded-xl hover:shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined text-[18px]">visibility</span>
            Preview & Export
          </button>
        </div>
      </aside>

      {/* ── Main Content ── */}
      <main className="flex-1 flex flex-col h-full overflow-hidden">
        <div className="flex-1 flex overflow-hidden">
          {/* Left Panel: Editor Form */}
          <section className="w-full md:w-[46%] flex flex-col border-r border-outline-variant/30 bg-surface-container-lowest relative">
            <div className="flex-1 overflow-y-auto p-6 md:p-8 custom-scrollbar">
              <div className="max-w-xl mx-auto space-y-8">

                {/* ── CONTACT ── */}
                {(activeSection === 'Contact') && (
                  <div>
                    <h2 className="text-2xl font-bold text-on-surface mb-5 flex items-center gap-2 font-headline">
                      <span className="material-symbols-outlined text-primary">person</span>
                      Contact Information
                    </h2>
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        { field: 'name', label: 'Full Name', placeholder: 'Jane Doe' },
                        { field: 'jobTitle', label: 'Job Title', placeholder: 'Senior Designer' },
                        { field: 'email', label: 'Email', placeholder: 'you@example.com' },
                        { field: 'phone', label: 'Phone', placeholder: '+1 (555) 000-0000' },
                        { field: 'location', label: 'Location', placeholder: 'New York, NY' },
                      ].map(({ field, label, placeholder }) => (
                        <div key={field} className="space-y-1">
                          <label className="text-[10px] uppercase font-bold text-on-surface-variant">{label}</label>
                          <input
                            className="w-full bg-transparent border-b-2 border-outline-variant focus:border-primary px-1 py-1.5 text-sm outline-none transition-colors"
                            type="text"
                            value={activeResume[field] || ''}
                            onChange={(e) => handleInputChange(field, e.target.value)}
                            placeholder={placeholder}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* ── SUMMARY ── */}
                {(activeSection === 'Summary') && (
                  <div>
                    <h2 className="text-2xl font-bold text-on-surface mb-2 flex items-center gap-2 font-headline">
                      <span className="material-symbols-outlined text-primary">article</span>
                      Professional Summary
                    </h2>
                    <p className="text-xs text-on-surface-variant mb-4">Write a compelling 2–3 sentence summary of your career.</p>
                    <textarea
                      value={activeResume.summary}
                      onChange={(e) => handleInputChange('summary', e.target.value)}
                      className="w-full bg-white border border-outline-variant/30 rounded-xl p-4 text-sm focus:border-primary outline-none resize-none leading-relaxed"
                      rows="6"
                      placeholder="Describe your professional background and key strengths..."
                    />
                    <div className="mt-2 flex justify-between items-center">
                      <span className="text-xs text-on-surface-variant">{activeResume.summary?.length || 0} characters</span>
                      <button
                        onClick={() => {
                          setAiInput('improve my summary');
                          handleAiSubmit({ preventDefault: () => {} });
                        }}
                        className="flex items-center gap-1 text-xs text-primary font-bold hover:underline"
                      >
                        <span className="material-symbols-outlined text-[14px]">auto_awesome</span>
                        AI Improve
                      </button>
                    </div>
                  </div>
                )}

                {/* ── EXPERIENCE ── */}
                {(activeSection === 'Experience') && (
                  <div>
                    <h2 className="text-2xl font-bold text-on-surface mb-1 flex items-center gap-2 font-headline">
                      <span className="material-symbols-outlined text-primary">work</span>
                      Work Experience
                    </h2>
                    <p className="text-xs text-on-surface-variant mb-5">Detail your professional history to let our AI optimize your impact.</p>

                    <div className="space-y-5">
                      {activeResume.experience.map((exp) => (
                        <div key={exp.id} className="group relative p-5 bg-white border border-outline-variant/30 rounded-2xl hover:border-primary/40 transition-all">
                          <button
                            onClick={() => handleRemoveExp(exp.id)}
                            className="absolute top-4 right-4 text-on-surface-variant hover:text-red-500 transition-colors"
                            title="Remove experience"
                          >
                            <span className="material-symbols-outlined text-[20px]">delete</span>
                          </button>
                          <div className="space-y-3">
                            <div className="grid grid-cols-2 gap-3">
                              <div className="space-y-1">
                                <label className="text-[10px] uppercase font-bold text-on-surface-variant">Job Title</label>
                                <input
                                  className="w-full bg-transparent border-b-2 border-outline-variant focus:border-primary px-1 py-1 text-sm outline-none"
                                  type="text"
                                  value={exp.title}
                                  onChange={(e) => handleExpChange(exp.id, 'title', e.target.value)}
                                />
                              </div>
                              <div className="space-y-1">
                                <label className="text-[10px] uppercase font-bold text-on-surface-variant">Company</label>
                                <input
                                  className="w-full bg-transparent border-b-2 border-outline-variant focus:border-primary px-1 py-1 text-sm outline-none"
                                  type="text"
                                  value={exp.company}
                                  onChange={(e) => handleExpChange(exp.id, 'company', e.target.value)}
                                />
                              </div>
                            </div>
                            <div className="space-y-1">
                              <label className="text-[10px] uppercase font-bold text-on-surface-variant">Duration</label>
                              <input
                                className="w-full bg-transparent border-b-2 border-outline-variant focus:border-primary px-1 py-1 text-sm outline-none"
                                type="text"
                                value={exp.duration}
                                onChange={(e) => handleExpChange(exp.id, 'duration', e.target.value)}
                                placeholder="2021 — Present"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[10px] uppercase font-bold text-on-surface-variant">Description</label>
                              <textarea
                                className="w-full bg-transparent border border-outline-variant/30 rounded-xl focus:border-primary p-3 text-sm outline-none resize-none"
                                rows="3"
                                value={exp.description}
                                onChange={(e) => handleExpChange(exp.id, 'description', e.target.value)}
                              />
                            </div>
                            <div className="flex justify-end pt-1">
                              <button
                                onClick={() => handleEnhanceExp(exp.id)}
                                className="flex items-center gap-1.5 px-3 py-1.5 bg-primary/5 text-primary border border-primary/20 hover:bg-primary/10 rounded-full text-xs font-bold transition-all active:scale-95"
                              >
                                <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
                                AI Enhance
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <button
                      onClick={handleAddExp}
                      className="w-full py-4 mt-4 border-2 border-dashed border-outline-variant/50 rounded-2xl text-on-surface-variant hover:text-primary hover:border-primary/50 transition-all font-bold text-sm flex items-center justify-center gap-2"
                    >
                      <span className="material-symbols-outlined">add_circle</span>
                      Add Experience
                    </button>
                  </div>
                )}

                {/* ── EDUCATION ── */}
                {(activeSection === 'Education') && (
                  <div>
                    <h2 className="text-2xl font-bold text-on-surface mb-1 flex items-center gap-2 font-headline">
                      <span className="material-symbols-outlined text-primary">school</span>
                      Education
                    </h2>
                    <p className="text-xs text-on-surface-variant mb-5">Add your degrees, certifications, and training.</p>

                    <div className="space-y-5">
                      {(activeResume.education || []).map((edu, idx) => (
                        <div key={idx} className="relative p-5 bg-white border border-outline-variant/30 rounded-2xl hover:border-primary/40 transition-all">
                          <button
                            onClick={() => handleRemoveEdu(idx)}
                            className="absolute top-4 right-4 text-on-surface-variant hover:text-red-500 transition-colors"
                          >
                            <span className="material-symbols-outlined text-[20px]">delete</span>
                          </button>
                          <div className="space-y-3">
                            <div className="space-y-1">
                              <label className="text-[10px] uppercase font-bold text-on-surface-variant">Degree / Certification</label>
                              <input
                                className="w-full bg-transparent border-b-2 border-outline-variant focus:border-primary px-1 py-1 text-sm outline-none"
                                type="text"
                                value={edu.degree}
                                onChange={(e) => handleEduChange(idx, 'degree', e.target.value)}
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[10px] uppercase font-bold text-on-surface-variant">Institution</label>
                              <input
                                className="w-full bg-transparent border-b-2 border-outline-variant focus:border-primary px-1 py-1 text-sm outline-none"
                                type="text"
                                value={edu.school}
                                onChange={(e) => handleEduChange(idx, 'school', e.target.value)}
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[10px] uppercase font-bold text-on-surface-variant">Note (Optional)</label>
                              <input
                                className="w-full bg-transparent border-b-2 border-outline-variant focus:border-primary px-1 py-1 text-sm outline-none"
                                type="text"
                                value={edu.note || ''}
                                onChange={(e) => handleEduChange(idx, 'note', e.target.value)}
                                placeholder="e.g. Graduated with Honors"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <button
                      onClick={handleAddEdu}
                      className="w-full py-4 mt-4 border-2 border-dashed border-outline-variant/50 rounded-2xl text-on-surface-variant hover:text-primary hover:border-primary/50 transition-all font-bold text-sm flex items-center justify-center gap-2"
                    >
                      <span className="material-symbols-outlined">add_circle</span>
                      Add Education
                    </button>
                  </div>
                )}

                {/* ── SKILLS ── */}
                {(activeSection === 'Skills') && (
                  <div>
                    <h2 className="text-2xl font-bold text-on-surface mb-1 flex items-center gap-2 font-headline">
                      <span className="material-symbols-outlined text-primary">psychology</span>
                      Skills
                    </h2>
                    <p className="text-xs text-on-surface-variant mb-5">Add your key professional skills to boost ATS matching.</p>

                    <form onSubmit={handleAddSkill} className="flex gap-2 mb-6">
                      <input
                        value={newSkill}
                        onChange={(e) => setNewSkill(e.target.value)}
                        className="flex-1 bg-white border border-outline-variant/30 rounded-xl px-4 py-2.5 text-sm focus:border-primary outline-none"
                        placeholder="e.g. Figma, Python, Leadership..."
                      />
                      <button
                        type="submit"
                        className="bg-primary text-on-primary px-4 py-2.5 rounded-xl text-sm font-bold hover:shadow-md active:scale-95 transition-all flex items-center gap-1"
                      >
                        <span className="material-symbols-outlined text-[18px]">add</span>
                        Add
                      </button>
                    </form>

                    <div className="flex flex-wrap gap-2">
                      {activeResume.skills.map((skill) => (
                        <div
                          key={skill}
                          className="flex items-center gap-1.5 bg-primary/8 border border-primary/20 text-primary px-3 py-1.5 rounded-full text-sm font-medium group"
                        >
                          {skill}
                          <button
                            onClick={() => handleRemoveSkill(skill)}
                            className="text-primary/60 hover:text-red-500 transition-colors ml-1"
                          >
                            <span className="material-symbols-outlined text-[14px]">close</span>
                          </button>
                        </div>
                      ))}
                      {activeResume.skills.length === 0 && (
                        <p className="text-sm text-on-surface-variant italic">No skills added yet. Type a skill above and click Add.</p>
                      )}
                    </div>

                    {/* Suggested skills */}
                    <div className="mt-6">
                      <p className="text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-3 flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px] text-primary">auto_awesome</span>
                        AI Suggested Skills
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {['UX Research', 'Design Systems', 'Figma', 'Prototyping', 'Agile', 'Stakeholder Management', 'A/B Testing', 'SQL'].filter(s => !activeResume.skills.includes(s)).map(s => (
                          <button
                            key={s}
                            onClick={() => {
                              updateResume({ skills: [...activeResume.skills, s] });
                              triggerSync();
                            }}
                            className="flex items-center gap-1 px-3 py-1.5 bg-surface-container border border-outline-variant/30 text-on-surface-variant hover:border-primary hover:text-primary rounded-full text-xs font-medium transition-all"
                          >
                            <span className="material-symbols-outlined text-[12px]">add</span>
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

              </div>
            </div>

            {/* AI Command Box */}
            <div className="p-4 border-t border-outline-variant/30 bg-white/80 backdrop-blur-md">
              <form onSubmit={handleAiSubmit} className="max-w-xl mx-auto">
                <div className="relative">
                  <span
                    className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-primary text-[20px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    auto_awesome
                  </span>
                  <input
                    value={aiInput}
                    onChange={(e) => setAiInput(e.target.value)}
                    className="w-full py-3 pl-11 pr-12 bg-surface-container rounded-full border border-outline-variant/30 focus:outline-none focus:border-primary text-sm transition-all"
                    placeholder="Ask AI to edit... (e.g. Make it leadership-focused)"
                    type="text"
                  />
                  <button
                    type="submit"
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-primary text-on-primary rounded-full flex items-center justify-center hover:shadow-lg transition-all active:scale-95"
                    title="Submit"
                  >
                    <span className="material-symbols-outlined text-[16px]">arrow_upward</span>
                  </button>
                </div>
              </form>
            </div>
          </section>

          {/* Right Panel: Live Document Preview */}
          <section className="hidden md:flex flex-1 bg-surface-container-low overflow-y-auto p-8 justify-center items-start">
            <div className="w-[580px] bg-white shadow-xl min-h-[840px] p-10 text-left relative text-slate-800 text-xs border border-outline-variant/10 rounded-sm">
              {/* Color Strip */}
              <div className="absolute top-0 left-0 w-full h-1.5" style={{ backgroundColor: activeResume.primaryColor || '#451ebb' }}></div>

              <header className="mb-6 pb-4 border-b border-slate-100">
                <h2 className="text-2xl font-bold uppercase tracking-tight text-slate-900 leading-none mb-1">{activeResume.name}</h2>
                {activeResume.jobTitle && (
                  <p className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: activeResume.primaryColor || '#451ebb' }}>{activeResume.jobTitle}</p>
                )}
                <p className="text-slate-500 text-[11px]">{activeResume.email} • {activeResume.phone} • {activeResume.location}</p>
              </header>

              <div className="space-y-5">
                <section>
                  <h3 className="font-bold text-[9px] uppercase tracking-widest mb-2" style={{ color: activeResume.primaryColor || '#451ebb' }}>Professional Summary</h3>
                  <p className="leading-relaxed text-slate-600">{activeResume.summary}</p>
                </section>

                {activeResume.experience?.length > 0 && (
                  <section>
                    <h3 className="font-bold text-[9px] uppercase tracking-widest mb-3" style={{ color: activeResume.primaryColor || '#451ebb' }}>Experience</h3>
                    <div className="space-y-4">
                      {activeResume.experience.map((exp) => (
                        <div key={exp.id}>
                          <div className="flex justify-between items-baseline mb-0.5">
                            <h4 className="font-bold text-slate-900">{exp.title}</h4>
                            <span className="text-[9px] text-slate-400">{exp.duration}</span>
                          </div>
                          <p className="text-slate-500 font-medium mb-1">{exp.company}</p>
                          <p className="text-slate-600 leading-relaxed">{exp.description}</p>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {activeResume.education?.length > 0 && (
                  <section>
                    <h3 className="font-bold text-[9px] uppercase tracking-widest mb-3" style={{ color: activeResume.primaryColor || '#451ebb' }}>Education</h3>
                    <div className="space-y-2">
                      {activeResume.education.map((edu, idx) => (
                        <div key={idx}>
                          <h4 className="font-bold text-slate-900">{edu.degree}</h4>
                          <p className="text-slate-500">{edu.school}{edu.note ? ` — ${edu.note}` : ''}</p>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {activeResume.skills?.length > 0 && (
                  <section>
                    <h3 className="font-bold text-[9px] uppercase tracking-widest mb-2" style={{ color: activeResume.primaryColor || '#451ebb' }}>Skills</h3>
                    <div className="flex flex-wrap gap-1.5">
                      {activeResume.skills.map((skill) => (
                        <span key={skill} className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-[10px]">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </section>
                )}
              </div>
            </div>
          </section>
        </div>

        {/* Syncing Indicator */}
        {isSyncing && (
          <div className="fixed top-20 right-6 bg-white/95 backdrop-blur border border-primary/20 px-4 py-2.5 rounded-full shadow-lg z-50 flex items-center gap-2">
            <div className="w-2 h-2 bg-primary rounded-full animate-ping"></div>
            <span className="text-[11px] font-bold text-primary uppercase tracking-widest">AI Syncing...</span>
          </div>
        )}
      </main>
    </div>
  );
}
