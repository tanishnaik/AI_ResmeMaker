import AppState from '../models/AppState.js';
import Resume from '../models/Resume.js';
import { sanitizeUser } from '../utils/helpers.js';

export const seedResumes = [
  {
    id: '1',
    title: 'Senior Product Designer (Google)',
    jobTitle: 'Senior Product Designer',
    name: 'Alex Rivera',
    email: 'alex.rivera@email.com',
    phone: '+1 (555) 0123 4567',
    location: 'New York, NY',
    summary: 'Results-driven Senior Product Designer with over 8 years of experience creating user-centric digital experiences. Proven track record of increasing engagement by 25% and leading cross-functional teams to deliver high-impact features.',
    experience: [
      {
        id: 'exp-1',
        title: 'Senior Product Designer',
        company: 'TechFlow Solutions',
        duration: '2021 - PRESENT',
        description: 'Led the redesign of the core user dashboard, resulting in a 25% increase in user engagement and streamlining onboarding for 50k+ monthly active users.',
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
    summary: 'Experienced marketing manager specializing in digital campaigns and brand positioning. Proven success growing brand awareness by 40% and managing multi-channel advertising budgets.',
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

export const seedCoverLetter = {
  companyName: 'Acme Digital Solutions',
  jobTitle: 'Senior UX Designer',
  tone: 'Professional',
  date: 'October 24, 2023',
  content: `I am writing to express my enthusiastic interest in the Senior UX Designer position at Acme Digital Solutions. With over seven years of experience creating human-centric digital experiences and a proven track record of increasing engagement by 40%, I am confident my strategic thinking and creative execution make me an ideal fit for your design team.

Throughout my career, I have focused on bridging complex business requirements and intuitive user interfaces. I led the redesign of a core SaaS platform, conducting user research, developing high-fidelity prototypes, and collaborating closely with engineering teams to ensure seamless implementation.

What draws me to Acme Digital Solutions is your commitment to accessibility and forward-thinking AI-driven interfaces. I am eager to bring my expertise in motion design and design systems to help Acme continue its trajectory of innovation.

Thank you for your time and consideration. I look forward to discussing how my skills and experiences align with your design team's needs.`,
};

function toClientResume(doc) {
  const resume = doc.toObject();
  delete resume._id;
  delete resume.__v;
  delete resume.user;
  return resume;
}

export async function getProfile(req, res) {
  res.json({ user: sanitizeUser(req.user) });
}

export async function getAppState(req, res, next) {
  try {
    const [resumes, state] = await Promise.all([
      Resume.find({ user: req.user._id }).sort({ updatedAt: -1 }),
      AppState.findOne({ user: req.user._id }),
    ]);

    res.json({
      resumes: resumes.map(toClientResume),
      activeResumeId: state?.activeResumeId || resumes[0]?.id || null,
      coverLetter: state?.coverLetter || seedCoverLetter,
    });
  } catch (error) {
    next(error);
  }
}

export async function saveAppState(req, res, next) {
  try {
    const allowed = {};
    if ('activeResumeId' in req.body) allowed.activeResumeId = req.body.activeResumeId;
    if ('coverLetter' in req.body) allowed.coverLetter = req.body.coverLetter;

    const state = await AppState.findOneAndUpdate(
      { user: req.user._id },
      { $set: allowed, $setOnInsert: { user: req.user._id } },
      { new: true, upsert: true }
    );
    res.json(state.toObject());
  } catch (error) {
    next(error);
  }
}

export async function createResume(req, res, next) {
  try {
    const resume = await Resume.create({ ...req.body, user: req.user._id });
    await AppState.findOneAndUpdate(
      { user: req.user._id },
      { activeResumeId: resume.id },
      { upsert: true }
    );
    res.status(201).json(toClientResume(resume));
  } catch (error) {
    next(error);
  }
}

export async function updateResume(req, res, next) {
  try {
    const resume = await Resume.findOneAndUpdate(
      { user: req.user._id, id: req.params.id },
      { ...req.body, user: req.user._id, lastUpdated: 'Just now' },
      { new: true, upsert: true, runValidators: true }
    );
    res.json(toClientResume(resume));
  } catch (error) {
    next(error);
  }
}

export async function deleteResume(req, res, next) {
  try {
    await Resume.deleteOne({ user: req.user._id, id: req.params.id });
    const fallback = await Resume.findOne({ user: req.user._id }).sort({ updatedAt: -1 });
    await AppState.findOneAndUpdate(
      { user: req.user._id },
      { activeResumeId: fallback?.id || null },
      { upsert: true }
    );
    res.status(204).end();
  } catch (error) {
    next(error);
  }
}

