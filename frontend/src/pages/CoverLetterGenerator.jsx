import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export default function CoverLetterGenerator() {
  const navigate = useNavigate();
  const { coverLetter, setCoverLetter } = useApp();
  const [company, setCompany] = useState(coverLetter.companyName);
  const [title, setTitle] = useState(coverLetter.jobTitle);
  const [desc, setDesc] = useState('');
  const [tone, setTone] = useState(coverLetter.tone);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  const toneIcons = {
    Professional: 'business_center',
    Enthusiastic: 'sentiment_very_satisfied',
    Creative: 'palette',
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const openings = {
        Professional: `I am writing to formally express my interest in the ${title || 'role'} position at ${company || 'your company'}.`,
        Enthusiastic: `I'm thrilled to apply for the ${title || 'role'} position at ${company || 'your company'} — an opportunity that perfectly aligns with my passions and expertise!`,
        Creative: `Every great product starts with a bold vision. That's why I'm excited to bring my creative energy to the ${title || 'role'} position at ${company || 'your company'}.`,
      };

      const generatedText = `${openings[tone] || openings.Professional} With a proven track record of delivering user-centric digital experiences and driving team success, I am confident that my strategic thinking and design leadership make me an ideal fit for your organization.

In my previous roles, I have consistently focused on bridging user needs with business goals. Whether designing complex dashboard workflows or leading design systems from scratch, my work ensures both brand consistency and top-tier user performance. I've driven measurable results including a 40% increase in user engagement, 15-point NPS improvements, and 50% faster design-to-engineering handoffs.

I am particularly drawn to ${company || 'your company'} because of your innovative approach and dedication to quality. Your commitment to building human-centered products resonates deeply with my own design philosophy.

Thank you for your time and consideration. I look forward to the possibility of discussing how my background aligns with your team's needs. I've attached my portfolio and resume for your review.`;

      setCoverLetter({
        companyName: company,
        jobTitle: title,
        tone: tone,
        date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
        content: generatedText
      });
      setIsGenerating(false);
    }, 2000);
  };

  const handleCopy = () => {
    if (coverLetter.content) {
      navigator.clipboard.writeText(coverLetter.content).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-background text-on-surface overflow-hidden h-screen flex text-left font-sans">
      {/* ── Sidebar ── */}
      <aside className="flex flex-col h-full w-60 py-6 px-4 border-r border-outline-variant bg-surface-container-lowest shadow-sm hidden md:flex">
        <div className="mb-8 px-2">
          <h3 className="text-base font-bold text-primary font-headline">AI Cover Letter</h3>
          <p className="text-on-surface-variant text-xs mt-0.5">Personalized in seconds</p>
        </div>
        <nav className="flex-1 space-y-1">
          <button
            onClick={() => navigate('/editor')}
            className="text-on-surface-variant flex items-center px-4 py-3 hover:bg-surface-container-high rounded-xl transition-all w-full text-left"
          >
            <span className="material-symbols-outlined mr-3 text-[20px]">edit_note</span>
            <span className="text-sm font-medium">Resume Editor</span>
          </button>
          <button
            onClick={() => navigate('/templates')}
            className="text-on-surface-variant flex items-center px-4 py-3 hover:bg-surface-container-high rounded-xl transition-all w-full text-left"
          >
            <span className="material-symbols-outlined mr-3 text-[20px]">grid_view</span>
            <span className="text-sm font-medium">Templates</span>
          </button>
          <button
            onClick={() => navigate('/cover-letter')}
            className="bg-primary-container text-on-primary-container rounded-xl flex items-center px-4 py-3 w-full text-left"
          >
            <span className="material-symbols-outlined mr-3 text-[20px]">description</span>
            <span className="text-sm font-bold">Cover Letter</span>
          </button>
        </nav>

        {/* Tips */}
        <div className="mt-4 p-4 bg-primary/5 border border-primary/10 rounded-2xl">
          <p className="text-xs font-bold text-primary mb-2 flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">lightbulb</span>
            Pro Tip
          </p>
          <p className="text-xs text-on-surface-variant leading-relaxed">Paste the job description for a more targeted letter. Include keywords from the posting.</p>
        </div>

        <button
          onClick={() => navigate('/preview')}
          className="mt-4 bg-primary text-white py-3 px-6 rounded-full text-sm font-bold hover:shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2"
        >
          <span className="material-symbols-outlined text-[18px]">visibility</span>
          Go to Preview
        </button>
      </aside>

      {/* ── Main Content ── */}
      <main className="flex-1 flex flex-col md:flex-row h-full overflow-hidden">
        {/* Left Pane: Input Form */}
        <section className="w-full md:w-[400px] bg-surface flex flex-col border-r border-outline-variant overflow-y-auto p-6 lg:p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-1 font-headline flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">description</span>
              Create Cover Letter
            </h2>
            <p className="text-on-surface-variant text-sm">Fill in the details and our AI will craft a personalized letter.</p>
          </div>

          <div className="space-y-5">
            <div>
              <label className="block text-[10px] font-bold text-on-surface-variant mb-2 uppercase tracking-wider flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">apartment</span>
                Target Company
              </label>
              <input
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="w-full bg-transparent border-b-2 border-outline-variant py-2 px-1 focus:outline-none focus:border-primary text-sm transition-all"
                placeholder="e.g. Google, Acme Corp"
                type="text"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-on-surface-variant mb-2 uppercase tracking-wider flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">work</span>
                Job Title
              </label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-transparent border-b-2 border-outline-variant py-2 px-1 focus:outline-none focus:border-primary text-sm transition-all"
                placeholder="e.g. Senior UX Designer"
                type="text"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-on-surface-variant mb-2 uppercase tracking-wider flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">assignment</span>
                Job Description (Optional)
              </label>
              <textarea
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                className="w-full bg-white/50 border border-outline-variant/30 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm transition-all resize-none"
                placeholder="Paste job requirements here for a more targeted letter..."
                rows="4"
              ></textarea>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-on-surface-variant mb-3 uppercase tracking-wider flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">tune</span>
                Letter Tone
              </label>
              <div className="flex gap-2">
                {['Professional', 'Enthusiastic', 'Creative'].map((t) => (
                  <button
                    key={t}
                    onClick={() => setTone(t)}
                    className={`flex-1 py-2 px-2 rounded-xl border text-xs font-bold transition-all flex flex-col items-center gap-1 ${
                      tone === t
                        ? 'border-primary bg-primary text-white shadow-md'
                        : 'border-outline-variant text-on-surface-variant hover:bg-surface-container-low hover:border-primary/40'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[16px]">{toneIcons[t]}</span>
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={handleGenerate}
                disabled={isGenerating}
                className="w-full bg-primary text-on-primary py-4 rounded-xl flex items-center justify-center gap-2 hover:shadow-xl active:scale-95 transition-all font-bold disabled:opacity-60"
              >
                <span className={`material-symbols-outlined ${isGenerating ? 'animate-spin' : ''}`} style={isGenerating ? {} : { fontVariationSettings: "'FILL' 1" }}>
                  {isGenerating ? 'sync' : 'auto_awesome'}
                </span>
                {isGenerating ? 'Generating...' : 'Generate Cover Letter'}
              </button>
            </div>
          </div>
        </section>

        {/* Right Pane: Preview */}
        <section className="flex-1 bg-surface-container-low overflow-y-auto p-6 lg:p-10 relative">
          {/* Sticky Toolbar */}
          <div className="max-w-[760px] mx-auto mb-4 flex justify-end gap-2 sticky top-0 z-10 bg-surface-container-low/90 backdrop-blur-sm p-2 rounded-xl">
            <button
              onClick={handleCopy}
              className={`flex items-center gap-1.5 px-4 py-2 text-sm font-bold rounded-lg transition-all ${
                copied ? 'bg-emerald-500 text-white' : 'bg-white border border-outline-variant text-on-surface-variant hover:text-primary hover:border-primary'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">{copied ? 'check_circle' : 'content_copy'}</span>
              {copied ? 'Copied!' : 'Copy'}
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-4 py-2 bg-primary text-on-primary rounded-lg hover:shadow-md text-sm font-bold transition-all active:scale-95"
            >
              <span className="material-symbols-outlined text-[18px]">print</span>
              Print / PDF
            </button>
          </div>

          {/* Letter Document */}
          <div className="max-w-[760px] mx-auto bg-white p-10 lg:p-14 shadow-2xl min-h-[900px] text-slate-800 relative border border-outline-variant/10">
            {/* Accent strip */}
            <div className="absolute top-0 left-0 w-full h-1 bg-primary"></div>

            {isGenerating ? (
              <div className="flex flex-col items-center justify-center h-[600px] gap-5">
                <div className="relative">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="material-symbols-outlined text-4xl text-primary animate-spin">auto_awesome</span>
                  </div>
                </div>
                <p className="text-sm font-bold text-primary animate-pulse uppercase tracking-widest">AI is crafting your letter...</p>
                <p className="text-xs text-on-surface-variant">Analyzing job requirements and tailoring your experience</p>
              </div>
            ) : (
              <>
                <div className="mb-10">
                  <p className="font-bold text-lg mb-0.5">Alex Carter</p>
                  <p className="text-slate-500 text-sm">San Francisco, CA • alex.carter@email.com • (555) 012-3456</p>
                </div>
                <div className="mb-6">
                  <p className="text-sm text-slate-600">{coverLetter.date}</p>
                </div>
                <div className="mb-8 text-sm">
                  <p className="font-bold">Hiring Manager</p>
                  <p className="text-slate-600">{coverLetter.companyName || 'Target Company'}</p>
                  <p className="text-slate-500">San Francisco, CA 94105</p>
                </div>
                <div className="mb-5 text-sm">
                  <p>Dear Hiring Manager,</p>
                </div>
                <div className="space-y-5 text-sm leading-relaxed text-slate-700 whitespace-pre-wrap">
                  {coverLetter.content}
                </div>
                <div className="mt-10 text-sm">
                  <p>Sincerely,</p>
                  <p className="mt-8 font-bold">Alex Carter</p>
                </div>
              </>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
