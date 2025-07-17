import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import {
  getDashboardData,
  createStudySession,
  createTask,
  toggleTask,
} from '../controllers/studyController.js';

const router = express.Router();

router.get('/dashboard', protect, getDashboardData);
router.post('/sessions', protect, createStudySession);
router.post('/tasks', protect, createTask);
router.patch('/tasks/:id/toggle', protect, toggleTask);

export default router;
