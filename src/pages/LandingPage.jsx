import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="bg-background text-on-surface overflow-x-hidden font-sans">
      <main>
        {/* Hero Section */}
        <section className="relative min-h-[921px] flex items-center overflow-hidden pt-16">
          <div className="container mx-auto px-margin-desktop max-w-container-max relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8 text-left">
                <div className="inline-flex items-center gap-2 bg-primary/5 border border-primary/20 px-4 py-2 rounded-full">
                  <span className="material-symbols-outlined text-primary text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
                  <span className="text-primary font-label-sm text-label-sm uppercase tracking-wider">AI-Powered Optimization</span>
                </div>
                <h1 className="font-headline text-5xl font-bold text-on-surface leading-tight">
                  Land Your Dream Job with <span className="text-primary">AI-Powered</span> Precision
                </h1>
                <p className="text-lg text-on-surface-variant max-w-xl">
                  Our intelligent platform analyzes job descriptions in real-time, optimizing your resume with the precise keywords and structure needed to bypass ATS filters.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={() => navigate('/templates')}
                    className="bg-primary text-on-primary px-8 py-4 rounded-xl font-medium text-lg hover:shadow-xl hover:-translate-y-1 transition-all flex items-center justify-center gap-2 group"
                  >
                    Build My Resume
                    <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
                  </button>
                  <button
                    onClick={() => navigate('/dashboard')}
                    className="bg-surface-container border border-outline-variant text-on-surface px-8 py-4 rounded-xl font-medium text-lg hover:bg-surface-variant/50 transition-all flex items-center justify-center gap-2"
                  >
                    <span className="material-symbols-outlined">play_circle</span>
                    See How it Works
                  </button>
                </div>
                <div className="flex items-center gap-4 pt-4">
                  <div className="flex -space-x-3">
                    <img className="w-10 h-10 rounded-full border-2 border-surface object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAgQq-8ZrGT54M74JcaLv3HRx2QCwv1StBjC0LeerWqYDsXnH5X6miQ52fOwfXtEHzSPkQxUR9Gw8uYOKYF5MQjWM8aRN-AGmJpm_IUqk9Gv7c-97dzTlO1XVBOqoINLINFxVTBKjihnPJyxPyxSks_PcJJKzdMBddXqKLXpNT81kCS_Z3G7nhwUfl50arAPggjVCWm8uWS9bTNGNZ61H_lGo1qrdhQgSGUpu0MuYL8ECKXv6TLF1l2q3FH6dUYOyloqGtqsAYjZ0tx" alt="User" />
                    <img className="w-10 h-10 rounded-full border-2 border-surface object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCXy1PYWhWPXDwU8FljYyojkigupUWFp5Z6CPkTRaFxvFzFSUzSLatKDcOvhxgYFM3N7rdQeoYx7qMBNrdirFJB4yFe6Gl4acyKFtjaPgOeai-pYguQVeGT2nfLST7VWFm9IgR2erazR4fqI-NJkTy3foRJvqt4FcyzvUd4CXpBuGekIP5Ipk_bKRAmQcugKfRblxEHHL5cZBM7vQOL53zB-7MWkjGod5WAGXQBXzZghJTsWw9M_TsmQ-l2txdh42wpAn7QcWYRsr4s" alt="User" />
                    <img className="w-10 h-10 rounded-full border-2 border-surface object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCDWCQYwI-qye0RJ57Hj3fHgiyaHx6UEyohBImQaaDX32sxfevVh7y0T-9Zku8bbnY_BmxR2MOF1ANv2jV_fKcsNrG_3x6yqkiVfqd21-n20XeTpg05EjwEpV9n5NtwY-K2BODSTjie9k8CTyfr6U-jgGUaFlgJcMFnt55Xl_VQC0Pa5bEsW77pDnIIt8NFqkRPjrPN00CqRuJGMdKwDjg5Q5-LaDs2qrtxf7JfgPVZRF5YEyczGJAAFRb8Qm-PlvSbNmkdhekDsnMn" alt="User" />
                  </div>
                  <p className="text-sm text-on-surface-variant"><span className="font-bold text-on-surface">50,000+</span> professionals optimized their careers this month</p>
                </div>
              </div>
                <div className="relative lg:h-[600px] flex items-center justify-center">
                  {/* Floating Document Mockup */}
                <div className="relative z-20 w-full max-w-[440px] bg-white rounded-lg document-shadow p-8 animate-float">
                  <div className="flex justify-between items-start mb-6">
                    <div className="space-y-2 w-2/3">
                      <div className="h-6 w-full bg-surface-container rounded-sm"></div>
                      <div className="h-3 w-1/2 bg-surface-container-high rounded-sm"></div>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>account_circle</span>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="h-3 w-1/4 bg-primary/20 rounded-sm"></div>
                    <div className="space-y-2">
                      <div className="h-2 w-full bg-surface-container rounded-sm"></div>
                      <div className="h-2 w-full bg-surface-container rounded-sm"></div>
                      <div className="h-2 w-3/4 bg-surface-container rounded-sm"></div>
                    </div>
                    <div className="h-3 w-1/4 bg-primary/20 rounded-sm pt-4"></div>
                    <div className="flex gap-2">
                      <div className="h-6 w-16 bg-primary-container/20 rounded-full border border-primary/20"></div>
                      <div className="h-6 w-20 bg-primary-container/20 rounded-full border border-primary/20"></div>
                      <div className="h-6 w-14 bg-primary-container/20 rounded-full border border-primary/20"></div>
                    </div>
                  </div>
                  {/* AI Sparkle Overlay */}
                  <div className="absolute -right-8 top-1/4 glass-panel border border-primary/30 p-4 rounded-xl shadow-xl max-w-[180px] text-left scale-90 md:scale-100">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="material-symbols-outlined text-primary text-lg">auto_awesome</span>
                      <span className="text-xs font-bold text-primary">AI Suggestion</span>
                    </div>
                    <p className="text-[10px] leading-tight text-on-surface-variant italic">"Quantify your impact at Google by adding: 'Reduced latency by 40% using Rust'..."</p>
                    <button onClick={() => navigate('/editor')} className="mt-3 w-full py-1.5 bg-primary text-white text-[10px] rounded-lg">Apply Optimization</button>
                  </div>
                </div>
                {/* Background Glows */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-primary/20 blur-[100px] rounded-full"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Social Proof Bar */}
        <section className="py-12 bg-surface-container-low border-y border-outline-variant/30">
          <div className="container mx-auto px-margin-desktop max-w-container-max">
            <p className="text-center font-bold text-xs text-on-surface-variant/60 uppercase tracking-[0.2em] mb-8">Trusted by Professionals from</p>
            <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
              <span className="font-bold text-lg text-on-surface tracking-tighter">TECHGIANT</span>
              <span className="font-bold text-lg text-on-surface tracking-tighter">NEXUS_CORP</span>
              <span className="font-bold text-lg text-on-surface tracking-tighter">GLOBAL_LOGIC</span>
              <span className="font-bold text-lg text-on-surface tracking-tighter">STREAMLINE</span>
              <span className="font-bold text-lg text-on-surface tracking-tighter">DATA_FLOW</span>
            </div>
          </div>
        </section>

        {/* AI Features Section (Bento Grid) */}
        <section className="py-20 bg-surface">
          <div className="container mx-auto px-margin-desktop max-w-container-max">
            <div className="text-center mb-16 max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold mb-4 text-on-surface">Precision Features for Your Next Move</h2>
              <p className="text-lg text-on-surface-variant">Our AI isn't just about text generation. It's a strategic partner that understands the nuances of modern hiring.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              {/* Feature 1: Keyword Optimization */}
              <div className="md:col-span-2 group relative overflow-hidden bg-white p-8 rounded-3xl border border-outline-variant/50 hover:shadow-2xl transition-all duration-500">
                <div className="flex flex-col h-full justify-between gap-8 relative z-10">
                  <div>
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                      <span className="material-symbols-outlined text-primary">key_visualizer</span>
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-on-surface">Dynamic Keyword Optimization</h3>
                    <p className="text-on-surface-variant max-w-lg">Our engine cross-references your experience against the exact ATS (Applicant Tracking System) criteria of target roles, ensuring your profile stays at the top of the pile.</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-primary/5 text-primary px-3 py-1.5 rounded-full text-xs border border-primary/10">Cloud Architecture</span>
                    <span className="bg-primary/5 text-primary px-3 py-1.5 rounded-full text-xs border border-primary/10">Scrum Master</span>
                    <span className="bg-primary/5 text-primary px-3 py-1.5 rounded-full text-xs border border-primary/10">Python</span>
                    <span className="bg-primary/5 text-primary px-3 py-1.5 rounded-full text-xs border border-primary/10">KPI Tracking</span>
                  </div>
                </div>
              </div>
              {/* Feature 2: Smart Formatting */}
              <div className="bg-primary p-8 rounded-3xl text-on-primary flex flex-col justify-between hover:shadow-2xl transition-all">
                <div>
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-6">
                    <span className="material-symbols-outlined">grid_view</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Smart Formatting</h3>
                  <p className="opacity-95">Design that breathes. Our layouts adapt automatically to your content volume, maintaining perfect white-space balance.</p>
                </div>
                <div className="pt-8">
                  <div className="bg-white/10 rounded-xl p-4 border border-white/20">
                    <div className="h-4 bg-white/20 w-3/4 rounded mb-2"></div>
                    <div className="h-2 bg-white/20 w-1/2 rounded"></div>
                  </div>
                </div>
              </div>
              {/* Feature 3: Auto-Summaries */}
              <div className="bg-surface-container-highest p-8 rounded-3xl flex flex-col justify-between hover:shadow-xl transition-all border border-outline-variant/30">
                <div>
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                    <span className="material-symbols-outlined text-primary">article</span>
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-on-surface">Auto-Summaries</h3>
                  <p className="text-on-surface-variant">Don't struggle with your elevator pitch. ResumeIQ drafts compelling executive summaries based on your career trajectory.</p>
                </div>
                <div className="mt-8 p-4 bg-white/70 backdrop-blur-md rounded-xl border border-white">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                    <span className="text-[10px] uppercase font-bold text-primary tracking-widest">Generating...</span>
                  </div>
                  <div className="space-y-2">
                    <div className="h-1.5 w-full bg-outline-variant/30 rounded animate-pulse"></div>
                    <div className="h-1.5 w-5/6 bg-outline-variant/30 rounded animate-pulse"></div>
                  </div>
                </div>
              </div>
              {/* Feature 4: Performance Analytics */}
              <div className="md:col-span-2 group relative overflow-hidden bg-surface-container p-8 rounded-3xl border border-outline-variant/50 hover:shadow-2xl transition-all">
                <div className="flex flex-col md:flex-row gap-8 items-center h-full">
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-4 text-on-surface">Real-time Analysis</h3>
                    <p className="text-on-surface-variant mb-6">Get a "Resume Score" instantly. See where you excel and exactly where your profile needs more "weight" to attract recruiters.</p>
                    <div className="w-full bg-white/50 h-3 rounded-full overflow-hidden border border-outline-variant/20">
                      <div className="h-full bg-primary" style={{ width: '85%' }}></div>
                    </div>
                    <div className="flex justify-between mt-2">
                      <span className="text-xs font-bold text-primary">Score: 85/100</span>
                      <span className="text-xs font-bold text-on-surface-variant">Target: 90+</span>
                    </div>
                  </div>
                  <div className="flex-1 flex justify-center">
                    <div className="relative">
                      <div className="w-40 h-40 rounded-full border-[12px] border-primary-container/20 border-t-primary flex items-center justify-center">
                        <span className="text-3xl font-bold text-primary">A+</span>
                      </div>
                      <div className="absolute -top-2 -right-2 bg-white p-2 rounded-lg shadow-lg border border-outline-variant/30">
                        <span className="material-symbols-outlined text-primary">trending_up</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Path section */}
        <section className="py-20 bg-surface-container-lowest overflow-hidden text-left">
          <div className="container mx-auto px-margin-desktop max-w-container-max">
            <div className="flex flex-col md:flex-row gap-16 items-center">
              <div className="w-full md:w-1/2">
                <h2 className="font-headline text-4xl font-bold mb-12 text-on-surface">Simple Path to Success</h2>
                <div className="space-y-12">
                  <div className="flex gap-6 items-start">
                    <div className="flex-shrink-0 w-12 h-12 bg-primary text-on-primary rounded-full flex items-center justify-center font-bold text-lg">1</div>
                    <div>
                      <h4 className="text-xl font-bold mb-2">Import Your History</h4>
                      <p className="text-on-surface-variant">Upload your old resume or connect your LinkedIn profile. Our parser extracts every detail with 99.9% accuracy.</p>
                    </div>
                  </div>
                  <div className="flex gap-6 items-start">
                    <div className="flex-shrink-0 w-12 h-12 bg-primary text-on-primary rounded-full flex items-center justify-center font-bold text-lg">2</div>
                    <div>
                      <h4 className="text-xl font-bold mb-2">AI Optimization</h4>
                      <p className="text-on-surface-variant">Define your target job. Our AI re-aligns your bullet points to emphasize the skills that matter most to that specific employer.</p>
                    </div>
                  </div>
                  <div className="flex gap-6 items-start">
                    <div className="flex-shrink-0 w-12 h-12 bg-primary text-on-primary rounded-full flex items-center justify-center font-bold text-lg">3</div>
                    <div>
                      <h4 className="text-xl font-bold mb-2">Download & Apply</h4>
                      <p className="text-on-surface-variant">Choose from professional, ATS-friendly templates and export in PDF or Word format instantly.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-1/2">
                <div className="bg-surface-container h-[400px] rounded-[40px] p-8 flex items-center justify-center shadow-inner relative overflow-hidden">
                  <div className="w-4/5 bg-white p-6 rounded-2xl shadow-2xl border border-outline-variant/30 text-left">
                    <div className="flex justify-between items-center mb-4">
                      <span className="font-bold text-primary">Resume Completed</span>
                      <span className="text-green-500 font-bold">100%</span>
                    </div>
                    <div className="h-2 bg-green-500 w-full rounded mb-6"></div>
                    <div className="space-y-3">
                      <div className="h-3 bg-surface-container w-full rounded"></div>
                      <div className="h-3 bg-surface-container w-5/6 rounded"></div>
                      <div className="h-3 bg-surface-container w-4/5 rounded"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="container mx-auto px-margin-desktop max-w-container-max">
            <div className="bg-inverse-surface rounded-[40px] p-12 md:p-24 text-center text-white">
              <h2 className="font-headline text-4xl font-bold mb-8">Ready to Level Up Your Career?</h2>
              <p className="text-lg text-white/70 max-w-2xl mx-auto mb-12">Join thousands of job seekers who secured interviews at top-tier companies using ResumeIQ's precision technology.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button onClick={() => navigate('/templates')} className="bg-primary text-on-primary px-10 py-5 rounded-xl font-bold text-lg hover:bg-primary-container transition-all">Start For Free</button>
                <button onClick={() => navigate('/dashboard')} className="bg-transparent border border-white/30 text-white px-10 py-5 rounded-xl font-bold text-lg hover:bg-white/10 transition-all">Go to Dashboard</button>
              </div>
              <p className="mt-8 text-white/50 text-xs">No credit card required. Free plan available.</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
