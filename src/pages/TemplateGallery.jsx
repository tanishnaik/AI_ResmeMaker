import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const TEMPLATES = [
  {
    name: 'The Innovator',
    category: 'Modern',
    industries: ['Tech', 'Product', 'Creative'],
    levels: ['Mid', 'Senior'],
    desc: 'Best for Tech, Product, and Creative roles requiring a bold, distinctive identity.',
    ats: '98/100',
    color: '#451ebb',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDEuynwjx3zZnPFEQXbvSrEcBa2OpIrcoyrsweOFWr4iMugC_vBzocHzN-5BvInZfmJ1HQaeDRU1Mb_h7D8pBu06JucSGqx44VeijrKeUKf0n5oMFsqsWZQ1J-_LT9vnhxbZH1aUJNoyX89Y3IZtPv5pp27B6fXqXEc6WRox4ay5Y_P5FyOx2PWMXr7g_b_ws1II68qfShAh8LgeLQIoGXRJH_paJi_-ctF8acv1BejyWP_oaAyHng4qJdt8pLYHHyQJIbq4wurGjTj'
  },
  {
    name: 'Executive Elite',
    category: 'Professional',
    industries: ['Finance', 'Legal', 'Corporate'],
    levels: ['Senior', 'Executive'],
    desc: 'A high-trust layout for Finance, Legal, and Corporate Management roles.',
    ats: '100/100',
    color: '#2d3436',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCl56ezUCPanYQH-uxIqfdGkeXsIJdg-nFD740rwSChhuWaNRFlhqP-hLChmfK0T6SKnxXV-tBu1juLREK_c_KO8hG-wXNUnmSsDk_t2JSOhJIl00otVvs7CbU6TM_Ds9wSE5vQmbB8InqB6Neicrct3xvFD2aBOPbSlUOSxnUQChjY1_WHv51HqbCED9SQB2AWeZe49-csuOXbN2_8yeA6pSrc4BolgPMMJEIHX1272qReEoAgotdXmFOP-iOt1FX6gcvusP66Q3Ch'
  },
  {
    name: 'The Visionary',
    category: 'Creative',
    industries: ['Design', 'Marketing', 'Media'],
    levels: ['Junior', 'Mid'],
    desc: 'Showcase your portfolio and personality with this asymmetric, eye-catching design.',
    ats: '85/100',
    color: '#059669',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBD6Qdf3bqHDXexuz65AlZzzK25oWIAFwmUBJOkAzz9vbH7EXQtnI4Ar4xZgydvfEgBCwOdSYN0LLnaIe52vo85PitSov1LHH7DJkZB2LexfnLmxlTp8J1K5D1BfyjOrQXS50YGeHqV2WSa91Cxgg9XPQebXlUTU3hDRONPK_7QCZTDQmpU1f-5B1Yg2Hcs5wpxY_E9t4-S05rxwtpSUg8CrqnaWMzVcl4_mgjGofsbwqFbjU5Yslsulhx1ejwAyRadv9DqnfNguaUL'
  },
  {
    name: 'Minimalist Zen',
    category: 'Minimalist',
    industries: ['Research', 'Academic', 'Science'],
    levels: ['Junior', 'Mid', 'Senior'],
    desc: 'Focus purely on content. Clean whitespace and perfect typography let your words shine.',
    ats: '95/100',
    color: '#64748b',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBuRQ97peufbs8CBX77wDDvB-v6t6qOZEndT_mTGtpRCmRLPQtnSnkQjXlXG3l0gFVrWbzJjyetscZF5uhPZUCcygyvCXgqtsYEhYMWobluifVgkxzuhH-obERXm1HkBSV-w8m8SXzJjjSQN1JUwnM8vLErKGvQPxpKajFkW8saBIVD6LlefhYHbf8K2e-gBNUcyJy2D5i2uiGE5vKNnCWiFrNkE82SOjsczdbcir8X9X3mzKJ45oaNMmqR8k90EZkGVa0LTCfYqKbt'
  }
];

const INDUSTRIES = ['All', 'Tech', 'Finance', 'Design', 'Marketing', 'Legal', 'Research'];
const LEVELS = ['All', 'Junior', 'Mid', 'Senior', 'Executive'];

export default function TemplateGallery() {
  const navigate = useNavigate();
  const { activeResume, updateResume } = useApp();
  const [industryFilter, setIndustryFilter] = useState('All');
  const [levelFilter, setLevelFilter] = useState('All');
  const [showIndustryMenu, setShowIndustryMenu] = useState(false);
  const [showLevelMenu, setShowLevelMenu] = useState(false);

  const selectTemplate = (name, color) => {
    updateResume({ template: name, primaryColor: color });
  };

  const filteredTemplates = TEMPLATES.filter(t => {
    const industryOk = industryFilter === 'All' || t.industries.includes(industryFilter);
    const levelOk = levelFilter === 'All' || t.levels.includes(levelFilter);
    return industryOk && levelOk;
  });

  const categoryIconMap = {
    Modern: 'auto_fix_high',
    Professional: 'business_center',
    Creative: 'palette',
    Minimalist: 'crop_square',
  };

  return (
    <div className="flex min-h-screen text-left font-sans bg-surface">
      {/* ── Sidebar ── */}
      <aside className="hidden lg:flex flex-col h-screen w-60 fixed left-0 top-0 bg-surface-container-lowest border-r border-outline-variant/20 p-4 gap-2 z-40">
        {/* Logo */}
        <div className="flex items-center gap-3 px-2 py-4 mb-2">
          <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center text-on-primary">
            <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
          </div>
          <div>
            <p className="text-base font-extrabold text-primary font-headline leading-none">ResumeIQ</p>
            <p className="text-[10px] text-on-surface-variant">AI-Powered Drafting</p>
          </div>
        </div>

        <nav className="flex flex-col gap-1">
          <button onClick={() => navigate('/editor')} className="flex items-center gap-3 px-3 py-2.5 text-on-surface-variant hover:bg-surface-container-low rounded-xl transition-all font-medium text-sm text-left w-full">
            <span className="material-symbols-outlined text-[20px]">edit_note</span> Editor
          </button>
          <button onClick={() => navigate('/cover-letter')} className="flex items-center gap-3 px-3 py-2.5 text-on-surface-variant hover:bg-surface-container-low rounded-xl transition-all font-medium text-sm text-left w-full">
            <span className="material-symbols-outlined text-[20px]">description</span> AI Assistant
          </button>
          <button onClick={() => navigate('/templates')} className="flex items-center gap-3 px-3 py-2.5 bg-primary-container text-on-primary-container rounded-xl font-bold font-medium text-sm text-left w-full">
            <span className="material-symbols-outlined text-[20px]">grid_view</span> Templates
          </button>
          <button onClick={() => navigate('/dashboard')} className="flex items-center gap-3 px-3 py-2.5 text-on-surface-variant hover:bg-surface-container-low rounded-xl transition-all font-medium text-sm text-left w-full">
            <span className="material-symbols-outlined text-[20px]">dashboard</span> Dashboard
          </button>
        </nav>

        {/* Currently selected */}
        {activeResume.template && (
          <div className="mt-4 p-4 bg-primary/5 rounded-2xl border border-primary/10">
            <p className="text-[10px] font-bold text-primary uppercase tracking-wider mb-2 flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">check_circle</span>
              Active Template
            </p>
            <p className="text-sm font-bold text-on-surface">{activeResume.template}</p>
            <button
              onClick={() => navigate('/editor')}
              className="mt-3 w-full py-2 bg-primary text-on-primary rounded-xl text-xs font-bold hover:shadow-md transition-all active:scale-95 flex items-center justify-center gap-1"
            >
              <span className="material-symbols-outlined text-[14px]">edit</span>
              Open in Editor
            </button>
          </div>
        )}

        <div className="mt-auto p-4 bg-surface-container rounded-2xl">
          <p className="text-xs font-bold text-on-surface mb-1 flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px] text-primary">workspace_premium</span>
            PRO PLAN ACTIVE
          </p>
          <p className="text-xs text-on-surface-variant">Access all premium templates.</p>
        </div>
      </aside>

      {/* ── Main Content ── */}
      <main className="flex-1 lg:ml-60 p-6 md:p-8 bg-surface pb-16">
        {/* Header */}
        <header className="max-w-7xl mx-auto mb-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-5">
            <div>
              <h1 className="font-headline text-3xl md:text-4xl font-bold text-on-surface mb-2 flex items-center gap-3">
                <span className="material-symbols-outlined text-primary text-[36px]">grid_view</span>
                Template Gallery
              </h1>
              <p className="text-on-surface-variant max-w-2xl">Expertly crafted, ATS-friendly templates designed to bypass algorithms and impress hiring managers. Choose your foundation.</p>
            </div>

            {/* Filter buttons */}
            <div className="flex gap-3 flex-shrink-0 relative">
              {/* Industry filter */}
              <div className="relative">
                <button
                  onClick={() => { setShowIndustryMenu(!showIndustryMenu); setShowLevelMenu(false); }}
                  className={`flex items-center gap-2 px-4 py-2 border rounded-full text-sm font-medium transition-all ${
                    industryFilter !== 'All' ? 'border-primary bg-primary/5 text-primary' : 'border-outline-variant hover:bg-surface-container-low text-on-surface-variant'
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px]">filter_list</span>
                  Industry{industryFilter !== 'All' ? `: ${industryFilter}` : ''}
                  <span className="material-symbols-outlined text-[16px]">{showIndustryMenu ? 'expand_less' : 'expand_more'}</span>
                </button>
                {showIndustryMenu && (
                  <div className="absolute right-0 top-12 bg-white border border-outline-variant/30 rounded-2xl shadow-xl p-2 z-50 w-44">
                    {INDUSTRIES.map(ind => (
                      <button
                        key={ind}
                        onClick={() => { setIndustryFilter(ind); setShowIndustryMenu(false); }}
                        className={`w-full text-left px-3 py-2 rounded-xl text-sm transition-all flex items-center gap-2 ${
                          industryFilter === ind ? 'bg-primary-container text-on-primary-container font-bold' : 'hover:bg-surface-container-low text-on-surface-variant'
                        }`}
                      >
                        {industryFilter === ind && <span className="material-symbols-outlined text-[14px]">check</span>}
                        {ind}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Level filter */}
              <div className="relative">
                <button
                  onClick={() => { setShowLevelMenu(!showLevelMenu); setShowIndustryMenu(false); }}
                  className={`flex items-center gap-2 px-4 py-2 border rounded-full text-sm font-medium transition-all ${
                    levelFilter !== 'All' ? 'border-primary bg-primary/5 text-primary' : 'border-outline-variant hover:bg-surface-container-low text-on-surface-variant'
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px]">trending_up</span>
                  Level{levelFilter !== 'All' ? `: ${levelFilter}` : ''}
                  <span className="material-symbols-outlined text-[16px]">{showLevelMenu ? 'expand_less' : 'expand_more'}</span>
                </button>
                {showLevelMenu && (
                  <div className="absolute right-0 top-12 bg-white border border-outline-variant/30 rounded-2xl shadow-xl p-2 z-50 w-44">
                    {LEVELS.map(level => (
                      <button
                        key={level}
                        onClick={() => { setLevelFilter(level); setShowLevelMenu(false); }}
                        className={`w-full text-left px-3 py-2 rounded-xl text-sm transition-all flex items-center gap-2 ${
                          levelFilter === level ? 'bg-primary-container text-on-primary-container font-bold' : 'hover:bg-surface-container-low text-on-surface-variant'
                        }`}
                      >
                        {levelFilter === level && <span className="material-symbols-outlined text-[14px]">check</span>}
                        {level}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Active filters */}
          {(industryFilter !== 'All' || levelFilter !== 'All') && (
            <div className="flex items-center gap-2 mt-4">
              <span className="text-xs text-on-surface-variant">Active filters:</span>
              {industryFilter !== 'All' && (
                <span className="flex items-center gap-1 bg-primary/10 text-primary text-xs font-bold px-3 py-1 rounded-full">
                  {industryFilter}
                  <button onClick={() => setIndustryFilter('All')}>
                    <span className="material-symbols-outlined text-[12px]">close</span>
                  </button>
                </span>
              )}
              {levelFilter !== 'All' && (
                <span className="flex items-center gap-1 bg-primary/10 text-primary text-xs font-bold px-3 py-1 rounded-full">
                  {levelFilter}
                  <button onClick={() => setLevelFilter('All')}>
                    <span className="material-symbols-outlined text-[12px]">close</span>
                  </button>
                </span>
              )}
              <button onClick={() => { setIndustryFilter('All'); setLevelFilter('All'); }} className="text-xs text-on-surface-variant hover:text-red-500 transition-colors">
                Clear all
              </button>
            </div>
          )}
        </header>

        {/* Template Grid */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredTemplates.map((tpl) => {
            const isSelected = activeResume.template === tpl.name;
            return (
              <div
                key={tpl.name}
                onClick={() => selectTemplate(tpl.name, tpl.color)}
                className={`relative group flex flex-col bg-white rounded-3xl overflow-hidden border transition-all duration-300 cursor-pointer hover:shadow-2xl hover:-translate-y-1 ${
                  isSelected
                    ? 'border-primary ring-2 ring-primary/20 shadow-xl shadow-primary/10'
                    : 'border-outline-variant/30'
                }`}
              >
                {/* Selected badge */}
                {isSelected && (
                  <div className="absolute top-4 right-4 z-10">
                    <div className="bg-primary text-white text-[10px] font-bold px-3 py-1.5 rounded-full flex items-center gap-1 shadow-lg">
                      <span className="material-symbols-outlined text-[12px]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                      SELECTED
                    </div>
                  </div>
                )}

                {/* Template Image */}
                <div className="aspect-[3/4] overflow-hidden bg-slate-100 relative">
                  <img
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    src={tpl.image}
                    alt={tpl.name}
                    loading="lazy"
                  />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        selectTemplate(tpl.name, tpl.color);
                        navigate('/editor');
                      }}
                      className="bg-white text-primary px-6 py-3 rounded-full font-bold shadow-xl flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300"
                    >
                      <span className="material-symbols-outlined text-[18px]">edit</span>
                      Customize Template
                    </button>
                  </div>
                </div>

                {/* Card Details */}
                <div className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold text-on-surface">{tpl.name}</h3>
                    <span className="flex items-center gap-1 bg-primary/8 text-primary text-[10px] px-2 py-0.5 rounded-lg font-bold uppercase">
                      <span className="material-symbols-outlined text-[11px]">{categoryIconMap[tpl.category] || 'style'}</span>
                      {tpl.category}
                    </span>
                  </div>
                  <p className="text-xs text-on-surface-variant mb-4 leading-relaxed">{tpl.desc}</p>

                  {/* Industries */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {tpl.industries.map(ind => (
                      <span key={ind} className="text-[10px] bg-surface-container text-on-surface-variant px-2 py-0.5 rounded-md">
                        {ind}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                      <span className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wide">
                        ATS Score: {tpl.ats}
                      </span>
                    </div>
                    <div
                      className="w-5 h-5 rounded-full border-2 border-white shadow-sm"
                      style={{ backgroundColor: tpl.color }}
                      title="Accent color"
                    ></div>
                  </div>
                </div>
              </div>
            );
          })}

          {/* No results */}
          {filteredTemplates.length === 0 && (
            <div className="col-span-full flex flex-col items-center justify-center py-20 text-center">
              <span className="material-symbols-outlined text-5xl text-on-surface-variant/30 mb-4">search_off</span>
              <p className="font-bold text-on-surface-variant mb-2">No templates match your filters</p>
              <button
                onClick={() => { setIndustryFilter('All'); setLevelFilter('All'); }}
                className="text-primary font-bold text-sm hover:underline"
              >
                Clear filters
              </button>
            </div>
          )}

          {/* Custom AI Layout Card */}
          <div
            onClick={() => navigate('/editor')}
            className="flex flex-col items-center justify-center bg-surface-container/40 rounded-3xl border-2 border-dashed border-outline-variant/40 p-12 text-center group cursor-pointer hover:border-primary/50 hover:bg-primary/3 transition-all duration-300"
          >
            <div className="w-16 h-16 rounded-2xl bg-primary/8 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-primary/15 transition-all duration-300">
              <span className="material-symbols-outlined text-primary text-[32px]" style={{ fontVariationSettings: "'FILL' 1" }}>auto_fix_high</span>
            </div>
            <h3 className="text-lg font-bold text-on-surface mb-2">Custom AI Layout</h3>
            <p className="text-xs text-on-surface-variant max-w-[200px] mb-5">Let ResumeIQ generate a unique layout tailored to your specific job description.</p>
            <button className="px-6 py-2.5 bg-primary text-on-primary rounded-full text-xs font-bold hover:shadow-lg transition-all active:scale-95 flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px]">auto_awesome</span>
              Generate Layout
            </button>
          </div>
        </div>
      </main>

      {/* Floating AI Suggestion */}
      <div className="fixed bottom-8 right-8 z-40">
        <div className="bg-white p-4 rounded-2xl shadow-2xl border border-primary/20 max-w-xs flex items-start gap-3 hover:shadow-3xl transition-shadow cursor-pointer group">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary group-hover:bg-primary/20 transition-colors">
            <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
          </div>
          <div>
            <p className="text-[10px] font-bold text-primary mb-0.5 uppercase tracking-wider flex items-center gap-1">
              <span className="material-symbols-outlined text-[12px]">tips_and_updates</span>
              AI Suggestion
            </p>
            <p className="text-sm text-on-surface font-medium leading-tight">"The Innovator" template matches your experience best.</p>
            <button
              onClick={() => { selectTemplate('The Innovator', '#451ebb'); navigate('/editor'); }}
              className="mt-2 text-primary text-xs font-bold hover:underline flex items-center gap-1"
            >
              Apply now <span className="material-symbols-outlined text-[12px]">arrow_forward</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
