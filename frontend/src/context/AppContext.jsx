import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { api, getToken, setToken } from '../lib/api';

const AppContext = createContext();

export const useApp = () => useContext(AppContext);

const defaultResumes = [
  {
    id: '1',
    title: 'Senior Product Designer (Google)',
    jobTitle: 'Senior Product Designer',
    name: 'Alex Rivera',
    email: 'alex.rivera@email.com',
    phone: '+1 (555) 0123 4567',
    location: 'New York, NY',
    summary: 'Results-driven Senior Product Designer with over 8 years of experience in creating user-centric digital experiences. Proven track record of increasing engagement by 25% and leading cross-functional teams to deliver high-impact features.',
    experience: [
      {
        id: 'exp-1',
        title: 'Senior Product Designer',
        company: 'TechFlow Solutions',
        duration: '2021 - PRESENT',
        description: 'Led the redesign of the core user dashboard, resulting in a 25% increase in user engagement and streamlining the onboarding process for 50k+ monthly active users.',
      },
      {
        id: 'exp-2',
        title: 'UX Designer',
        company: 'Creativ Studio',
        duration: '2018 - 2021',
        description: 'Worked on mobile app interfaces and conducted user research sessions to improve accessibility scores.',
      },
    ],
    education: [
      { degree: 'MFA in Interaction Design', school: 'School of Visual Arts (SVA), NY', note: 'Graduated with Honors' },
      { degree: 'BFA in Graphic Design', school: 'Rhode Island School of Design (RISD)' },
    ],
    skills: ['Product Design', 'User Research', 'Design Systems', 'Figma', 'Stakeholder Management'],
    template: 'The Innovator',
    primaryColor: '#451ebb',
    lastUpdated: '2 days ago',
    atsScore: 98,
    status: 'AI Optimized',
  },
  {
    id: '2',
    title: 'Marketing Manager Resume',
    jobTitle: 'Marketing Manager',
    name: 'Alex Rivera',
    email: 'alex.rivera@email.com',
    phone: '+1 (555) 0123 4567',
    location: 'New York, NY',
    summary: 'Experienced marketing manager specializing in digital campaigns and brand positioning. Proven success in growing brand awareness by 40% and managing multi-channel advertising budgets.',
    experience: [
      {
        id: 'exp-3',
        title: 'Marketing Manager',
        company: 'BrandScale Inc',
        duration: '2019 - 2023',
        description: 'Managed a team of 4 coordinators, executing multi-channel campaigns with $200k annual budgets. Increased lead generation by 35% through data-driven content strategy.',
      },
    ],
    education: [
      { degree: 'B.S. in Business Administration', school: 'Boston University', note: 'Marketing Concentration' },
    ],
    skills: ['Digital Marketing', 'SEO', 'Public Relations', 'Analytics', 'Content Strategy'],
    template: 'Executive Elite',
    primaryColor: '#2d3436',
    lastUpdated: 'Oct 14, 2024',
    atsScore: 85,
    status: 'Classic Template',
  },
];

const defaultCoverLetter = {
  companyName: 'Acme Digital Solutions',
  jobTitle: 'Senior UX Designer',
  tone: 'Professional',
  date: 'October 24, 2023',
  content: `I am writing to express my enthusiastic interest in the Senior UX Designer position at Acme Digital Solutions, as advertised on your careers portal. With over seven years of experience in creating human-centric digital experiences and a proven track record of increasing user engagement by 40% in my previous role, I am confident that my blend of strategic thinking and creative execution makes me an ideal fit for your design team.

Throughout my career, I have focused on bridging the gap between complex business requirements and intuitive user interfaces. At my current organization, I led the redesign of our core SaaS platform, which involved conducting extensive user research, developing high-fidelity prototypes, and collaborating closely with engineering teams to ensure seamless implementation. This initiative not only improved the NPS score by 15 points but also significantly reduced customer support tickets related to navigation issues.

What particularly draws me to Acme Digital Solutions is your commitment to accessibility and your forward-thinking approach to AI-driven interfaces. I have long admired how your team balances aesthetic elegance with functional utility. I am eager to bring my expertise in motion design and design systems to help Acme continue its trajectory of innovation and user-first growth.

Thank you for your time and consideration. I have attached my resume and portfolio for your review and look forward to the possibility of discussing how my skills and experiences align with the needs of your design team.`,
};

function createBlankResume(overrides = {}) {
  return {
    id: String(Date.now()),
    title: 'Untitled Resume',
    jobTitle: '',
    name: 'Your Name',
    email: 'your.email@email.com',
    phone: '(555) 000-0000',
    location: 'City, State',
    summary: 'Add a brief professional summary about yourself here.',
    experience: [],
    education: [],
    skills: [],
    template: 'The Innovator',
    primaryColor: '#451ebb',
    lastUpdated: 'Just now',
    atsScore: 50,
    status: 'Draft',
    ...overrides,
  };
}

function calculateAtsScore(resume) {
  let score = 40;
  if (resume.summary?.length > 80) score += 15;
  if (resume.experience?.length >= 2) score += 20;
  if (resume.skills?.length >= 4) score += 15;
  if (resume.education?.length >= 1) score += 10;
  return Math.min(score, 100);
}

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setAuthToken] = useState(getToken());
  const [resumes, setResumes] = useState(defaultResumes);
  const [activeResumeId, setActiveResumeIdState] = useState(defaultResumes[0].id);
  const [coverLetter, setCoverLetterState] = useState(defaultCoverLetter);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');
  const saveTimer = useRef(null);

  useEffect(() => {
    let ignore = false;

    if (!token) {
      setIsLoading(false);
      return () => {
        ignore = true;
        if (saveTimer.current) clearTimeout(saveTimer.current);
      };
    }

    setIsLoading(true);
    Promise.all([api.me(), api.getAppState()])
      .then(([profile, state]) => {
        if (ignore) return;
        setUser(profile.user);
        setResumes(state.resumes || []);
        if (state.activeResumeId) setActiveResumeIdState(state.activeResumeId);
        if (state.coverLetter) setCoverLetterState(state.coverLetter);
        setError('');
      })
      .catch((loadError) => {
        if (!ignore) setError(`Could not load workspace: ${loadError.message}`);
      })
      .finally(() => {
        if (!ignore) setIsLoading(false);
      });

    return () => {
      ignore = true;
      if (saveTimer.current) clearTimeout(saveTimer.current);
    };
  }, [token]);

  const login = useCallback(async (credentials) => {
    const result = await api.login(credentials);
    setToken(result.token);
    setAuthToken(result.token);
    setUser(result.user);
    setError('');
    return result;
  }, []);

  const register = useCallback(async (payload) => {
    const result = await api.register(payload);
    setToken(result.token);
    setAuthToken(result.token);
    setUser(result.user);
    setError('');
    return result;
  }, []);

  const logout = useCallback(() => {
    setToken('');
    setAuthToken(null);
    setUser(null);
    setResumes(defaultResumes);
    setActiveResumeIdState(defaultResumes[0].id);
    setCoverLetterState(defaultCoverLetter);
  }, []);

  const activeResume = useMemo(
    () => resumes.find((resume) => resume.id === activeResumeId) || resumes[0] || createBlankResume({ id: 'draft-local' }),
    [activeResumeId, resumes]
  );

  const saveResume = useCallback((id, resume) => {
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => {
      setIsSaving(true);
      api.updateResume(id, resume)
        .then(() => setError(''))
        .catch((saveError) => setError(`Could not save resume: ${saveError.message}`))
        .finally(() => setIsSaving(false));
    }, 450);
  }, []);

  const setActiveResumeId = useCallback((id) => {
    setActiveResumeIdState(id);
    api.saveAppState({ activeResumeId: id }).catch((saveError) => {
      setError(`Could not save active resume: ${saveError.message}`);
    });
  }, []);

  const updateResume = useCallback((updatedFields) => {
    if (!activeResume) return;

    const nextResume = {
      ...activeResume,
      ...updatedFields,
      lastUpdated: 'Just now',
    };
    nextResume.atsScore = calculateAtsScore(nextResume);
    nextResume.status = nextResume.atsScore >= 80 ? 'AI Optimized' : 'Draft';

    setResumes((prev) => prev.map((resume) => (resume.id === activeResume.id ? nextResume : resume)));
    saveResume(activeResume.id, nextResume);
  }, [activeResume, saveResume]);

  const createNewResume = useCallback(() => {
    const newId = String(Date.now());
    const newResume = createBlankResume({ id: newId });

    setResumes((prev) => [newResume, ...prev]);
    setActiveResumeIdState(newId);
    setIsSaving(true);
    api.createResume(newResume)
      .then(() => api.saveAppState({ activeResumeId: newId }))
      .then(() => setError(''))
      .catch((saveError) => setError(`Could not create resume: ${saveError.message}`))
      .finally(() => setIsSaving(false));

    return newId;
  }, []);

  const deleteResume = useCallback((id) => {
    const remaining = resumes.filter((resume) => resume.id !== id);
    const nextActiveId = activeResumeId === id ? remaining[0]?.id || null : activeResumeId;

    setResumes((prev) => prev.filter((resume) => resume.id !== id));
    if (activeResumeId === id) {
      if (nextActiveId) {
        setActiveResumeIdState(nextActiveId);
      } else {
        setActiveResumeIdState(null);
      }
    }

    api.deleteResume(id)
      .then(() => api.saveAppState({ activeResumeId: nextActiveId }))
      .then(() => setError(''))
      .catch((saveError) => setError(`Could not delete resume: ${saveError.message}`));
  }, [activeResumeId, resumes]);

  const setCoverLetter = useCallback((nextCoverLetter) => {
    setCoverLetterState(nextCoverLetter);
    setIsSaving(true);
    api.saveAppState({ coverLetter: nextCoverLetter })
      .then(() => setError(''))
      .catch((saveError) => setError(`Could not save cover letter: ${saveError.message}`))
      .finally(() => setIsSaving(false));
  }, []);

  return (
    <AppContext.Provider value={{
      user,
      token,
      isAuthenticated: Boolean(token),
      login,
      register,
      logout,
      resumes,
      activeResume,
      activeResumeId,
      setActiveResumeId,
      updateResume,
      createNewResume,
      deleteResume,
      coverLetter,
      setCoverLetter,
      isLoading,
      isSaving,
      error,
    }}>
      {children}
    </AppContext.Provider>
  );
};
