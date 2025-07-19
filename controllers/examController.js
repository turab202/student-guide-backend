import Exam from '../models/Exam.js';

// Get all exams for logged-in user
export const getExams = async (req, res) => {
  try {
    const exams = await Exam.find({ owner: req.user._id });
    res.json(exams);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new exam with owner set
export const createExam = async (req, res) => {
  const exam = new Exam({ ...req.body, owner: req.user._id });
  try {
    const newExam = await exam.save();
    res.status(201).json(newExam);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update an exam owned by the user
export const updateExam = async (req, res) => {
  try {
    const exam = await Exam.findOneAndUpdate(
      { _id: req.params.id, owner: req.user._id },
      req.body,
      { new: true }
    );
    if (!exam) return res.status(404).json({ message: 'Exam not found' });
    res.json(exam);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete an exam owned by the user
export const deleteExam = async (req, res) => {
  try {
    const exam = await Exam.findOneAndDelete({ _id: req.params.id, owner: req.user._id });
    if (!exam) return res.status(404).json({ message: 'Exam not found' });
    res.json({ message: 'Exam deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add a task to an exam owned by the user
export const addTask = async (req, res) => {
  try {
    const exam = await Exam.findOne({ _id: req.params.id, owner: req.user._id });
    if (!exam) return res.status(404).json({ message: 'Exam not found' });

    const newTask = req.body;
    exam.tasks.push(newTask);
    await exam.save();
    res.status(201).json(exam);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update a task within an exam owned by the user
export const updateTask = async (req, res) => {
  try {
    const exam = await Exam.findOne({ _id: req.params.examId, owner: req.user._id });
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

// Delete a task within an exam owned by the user
export const deleteTask = async (req, res) => {
  try {
    const exam = await Exam.findOne({ _id: req.params.examId, owner: req.user._id });
    if (!exam) return res.status(404).json({ message: 'Exam not found' });

    exam.tasks.pull({ _id: req.params.taskId });
    await exam.save();
    res.json(exam);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
