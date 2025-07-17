import StudySession from '../models/StudySession.js';
import Task from '../models/Task.js';

export const getDashboardData = async (req, res) => {
  const sessions = await StudySession.find({ user: req.user._id });
  const tasks = await Task.find({ user: req.user._id });
  res.json({ sessions, tasks });
};

export const createStudySession = async (req, res) => {
  const { date, subject, duration } = req.body;
  const session = await StudySession.create({ user: req.user._id, date, subject, duration });
  res.status(201).json(session);
};

export const createTask = async (req, res) => {
  const { text, subject, priority } = req.body;
  const task = await Task.create({ user: req.user._id, text, subject, priority });
  res.status(201).json(task);
};

export const toggleTask = async (req, res) => {
  const task = await Task.findOne({ _id: req.params.id, user: req.user._id });
  if (!task) return res.status(404).json({ message: 'Task not found' });
  task.completed = !task.completed;
  await task.save();
  res.json(task);
};
