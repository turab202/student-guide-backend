// backend/routes/quizRoutes.js
import express from 'express';
import Quiz from '../models/Quiz.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// ✅ Get quizzes (global + user-owned)
router.get('/', protect, async (req, res) => {
  try {
    const quizzes = await Quiz.find({
      $or: [
        { userId: null }, // global
        { userId: req.user._id }, // personal
      ],
    });
    res.json(quizzes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ Create a new quiz for the logged-in user
router.post('/', protect, async (req, res) => {
  try {
    const { title, questions } = req.body;
    const quiz = new Quiz({
      title,
      questions,
      userId: req.user._id,
    });
    await quiz.save();
    res.status(201).json(quiz);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// ✅ Update only quizzes owned by the user
router.put('/:id', protect, async (req, res) => {
  try {
    const quiz = await Quiz.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      req.body,
      { new: true }
    );
    if (!quiz) return res.status(404).json({ message: 'Quiz not found or unauthorized' });
    res.json(quiz);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// ✅ Delete only quizzes owned by the user
router.delete('/:id', protect, async (req, res) => {
  try {
    const quiz = await Quiz.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id,
    });
    if (!quiz) return res.status(404).json({ message: 'Quiz not found or unauthorized' });
    res.json({ message: 'Quiz deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
