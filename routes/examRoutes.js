import express from 'express';
import { protect } from '../middleware/authMiddleware.js';  // Import protect middleware
import {
  getExams,
  createExam,
  updateExam,
  deleteExam,
  addTask,
  updateTask,
  deleteTask
} from '../controllers/examController.js';

const router = express.Router();

// CRUD for Exams - all protected routes
router.get('/', protect, getExams);
router.post('/', protect, createExam);
router.put('/:id', protect, updateExam);
router.delete('/:id', protect, deleteExam);

// Task routes - all protected
router.post('/:id/tasks', protect, addTask);
router.put('/:examId/tasks/:taskId', protect, updateTask);
router.delete('/:examId/tasks/:taskId', protect, deleteTask);

export default router;
