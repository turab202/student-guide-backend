// models/Exam.js
import mongoose from 'mongoose';

const TaskSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  text: { type: String, required: true },
  completed: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

const ExamSchema = new mongoose.Schema({
  name: { type: String, required: true },
  date: { type: String, required: true }, // ISO date string
  subject: { type: String },
  priority: { type: String, enum: ['high', 'medium', 'low'], default: 'medium' },
  notes: { type: String },
  tasks: [TaskSchema]
});

export default mongoose.model('Exam', ExamSchema);