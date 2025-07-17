// routes/examRoutes.js
import express from 'express';
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

// CRUD for Exams
router.get('/', getExams);
router.post('/', createExam);
router.put('/:id', updateExam);
router.delete('/:id', deleteExam);

// Task routes
router.post('/:id/tasks', addTask);
router.put('/:examId/tasks/:taskId', updateTask);
router.delete('/:examId/tasks/:taskId', deleteTask);

export default router;