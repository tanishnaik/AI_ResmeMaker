import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const useApp = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [resumes, setResumes] = useState([
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
          duration: '2021 — PRESENT',
          description: 'Led the redesign of the core user dashboard, resulting in a 25% increase in user engagement and streamlining the onboarding process for 50k+ monthly active users.'
        },
        {
          id: 'exp-2',
          title: 'UX Designer',
          company: 'Creativ Studio',
          duration: '2018 — 2021',
          description: 'Worked on mobile app interfaces and conducted user research sessions to improve accessibility scores.'
        }
      ],
      education: [
        {
          degree: 'MFA in Interaction Design',
          school: 'School of Visual Arts (SVA), NY',
          note: 'Graduated with Honors'
        },
        {
          degree: 'BFA in Graphic Design',
          school: 'Rhode Island School of Design (RISD)'
        }
      ],
      skills: ['Product Design', 'User Research', 'Design Systems', 'Figma', 'Stakeholder Management'],
      template: 'The Innovator',
      primaryColor: '#451ebb',
      lastUpdated: '2 days ago',
      atsScore: 98,
      status: 'AI Optimized'
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
          duration: '2019 — 2023',
          description: 'Managed a team of 4 coordinators, executing multi-channel campaigns with $200k annual budgets. Increased lead generation by 35% through data-driven content strategy.'
        }
      ],
      education: [
        {
          degree: 'B.S. in Business Administration',
          school: 'Boston University',
          note: 'Marketing Concentration'
        }
      ],
      skills: ['Digital Marketing', 'SEO', 'Public Relations', 'Analytics', 'Content Strategy'],
      template: 'Executive Elite',
      primaryColor: '#2d3436',
      lastUpdated: 'Oct 14, 2024',
      atsScore: 85,
      status: 'Classic Template'
    }
  ]);

  const [activeResumeId, setActiveResumeId] = useState('1');
  
  const [coverLetter, setCoverLetter] = useState({
    companyName: 'Acme Digital Solutions',
    jobTitle: 'Senior UX Designer',
    tone: 'Professional',
    date: 'October 24, 2023',
    content: `I am writing to express my enthusiastic interest in the Senior UX Designer position at Acme Digital Solutions, as advertised on your careers portal. With over seven years of experience in creating human-centric digital experiences and a proven track record of increasing user engagement by 40% in my previous role, I am confident that my blend of strategic thinking and creative execution makes me an ideal fit for your design team.

Throughout my career, I have focused on bridging the gap between complex business requirements and intuitive user interfaces. At my current organization, I led the redesign of our core SaaS platform, which involved conducting extensive user research, developing high-fidelity prototypes, and collaborating closely with engineering teams to ensure seamless implementation. This initiative not only improved the NPS score by 15 points but also significantly reduced customer support tickets related to navigation issues.

What particularly draws me to Acme Digital Solutions is your commitment to accessibility and your forward-thinking approach to AI-driven interfaces. I have long admired how your team balances aesthetic elegance with functional utility. I am eager to bring my expertise in motion design and design systems to help Acme continue its trajectory of innovation and user-first growth.

Thank you for your time and consideration. I have attached my resume and portfolio for your review and look forward to the possibility of discussing how my skills and experiences align with the needs of your design team.`
  });

  const activeResume = resumes.find(r => r.id === activeResumeId) || resumes[0];

  const updateResume = (updatedFields) => {
    setResumes(prev => prev.map(r => r.id === activeResumeId ? { ...r, ...updatedFields } : r));
  };

  const createNewResume = () => {
    const newId = String(Date.now());
    const newResume = {
      id: newId,
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
      status: 'Draft'
    };
    setResumes(prev => [...prev, newResume]);
    setActiveResumeId(newId);
    return newId;
  };

  const deleteResume = (id) => {
    setResumes(prev => {
      const filtered = prev.filter(r => r.id !== id);
      if (activeResumeId === id && filtered.length > 0) {
        setActiveResumeId(filtered[0].id);
      }
      return filtered;
    });
  };

  return (
    <AppContext.Provider value={{
      resumes,
      activeResume,
      setActiveResumeId,
      updateResume,
      createNewResume,
      deleteResume,
      coverLetter,
      setCoverLetter
    }}>
      {children}
    </AppContext.Provider>
  );
};
