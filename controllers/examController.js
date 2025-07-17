// controllers/examController.js
import Exam from '../models/Exam.js';

// Get all exams
export const getExams = async (req, res) => {
  try {
    const exams = await Exam.find();
    res.json(exams);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new exam
export const createExam = async (req, res) => {
  const exam = new Exam(req.body);
  try {
    const newExam = await exam.save();
    res.status(201).json(newExam);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update an exam
export const updateExam = async (req, res) => {
  try {
    const exam = await Exam.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!exam) return res.status(404).json({ message: 'Exam not found' });
    res.json(exam);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete an exam
export const deleteExam = async (req, res) => {
  try {
    const exam = await Exam.findByIdAndDelete(req.params.id);
    if (!exam) return res.status(404).json({ message: 'Exam not found' });
    res.json({ message: 'Exam deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add a task to an exam
export const addTask = async (req, res) => {
  try {
    const exam = await Exam.findById(req.params.id);
    if (!exam) return res.status(404).json({ message: 'Exam not found' });

    const newTask = req.body;
    exam.tasks.push(newTask);
    await exam.save();
    res.status(201).json(exam);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update a task
export const updateTask = async (req, res) => {
  try {
    const exam = await Exam.findById(req.params.examId);
    if (!exam) return res.status(404).json({ message: 'Exam not found' });

    const task = exam.tasks.id(req.params.taskId);
    if (!task) return res.status(404).json({ message: 'Task not found' });

    Object.assign(task, req.body);
    await exam.save();
    res.json(exam);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a task
export const deleteTask = async (req, res) => {
  try {
    const exam = await Exam.findById(req.params.examId);
    if (!exam) return res.status(404).json({ message: 'Exam not found' });

    exam.tasks.pull({ _id: req.params.taskId });
    await exam.save();
    res.json(exam);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};