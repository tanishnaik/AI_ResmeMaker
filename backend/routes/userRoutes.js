import express from 'express';
import {
  createResume,
  deleteResume,
  getAppState,
  getProfile,
  saveAppState,
  updateResume,
} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect);
router.get('/profile', getProfile);
router.get('/app-state', getAppState);
router.put('/app-state', saveAppState);
router.post('/resumes', createResume);
router.put('/resumes/:id', updateResume);
router.delete('/resumes/:id', deleteResume);

export default router;

