import User from '../models/User.js';
import Resume from '../models/Resume.js';
import AppState from '../models/AppState.js';
import { generateToken } from '../utils/generateToken.js';
import { createPasswordHash, sanitizeUser, verifyPassword } from '../utils/helpers.js';
import { validateLogin, validateRegister } from '../validations/userValidation.js';
import { seedCoverLetter, seedResumes } from './userController.js';
import { sendWelcomeEmail } from '../services/emailService.js';

function authResponse(user) {
  return {
    user: sanitizeUser(user),
    token: generateToken({ id: user._id.toString(), role: user.role }),
  };
}

async function seedUserWorkspace(user) {
  const count = await Resume.countDocuments({ user: user._id });
  if (count === 0) {
    await Resume.insertMany(seedResumes.map((resume) => ({ ...resume, user: user._id })));
  }

  await AppState.findOneAndUpdate(
    { user: user._id },
    { $setOnInsert: { user: user._id, activeResumeId: seedResumes[0].id, coverLetter: seedCoverLetter } },
    { upsert: true, new: true }
  );
}

export async function register(req, res, next) {
  try {
    const errors = validateRegister(req.body);
    if (errors.length) return res.status(400).json({ message: errors.join(' ') });

    const email = req.body.email.toLowerCase().trim();
    const exists = await User.findOne({ email });
    if (exists) return res.status(409).json({ message: 'An account with this email already exists.' });

    const user = await User.create({
      name: req.body.name.trim(),
      email,
      password: createPasswordHash(req.body.password),
    });

    await seedUserWorkspace(user);
    await sendWelcomeEmail(user);

    res.status(201).json(authResponse(user));
  } catch (error) {
    next(error);
  }
}

export async function login(req, res, next) {
  try {
    const errors = validateLogin(req.body);
    if (errors.length) return res.status(400).json({ message: errors.join(' ') });

    const user = await User.findOne({ email: req.body.email.toLowerCase().trim() });
    if (!user || !verifyPassword(req.body.password, user.password)) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    await seedUserWorkspace(user);
    res.json(authResponse(user));
  } catch (error) {
    next(error);
  }
}

export async function me(req, res) {
  res.json({ user: sanitizeUser(req.user) });
}

