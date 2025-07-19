import mongoose from 'mongoose';

const TaskSchema = new mongoose.Schema({
  text: { type: String, required: true },
  completed: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
  // Remove manual id, Mongoose creates _id automatically
});

const ExamSchema = new mongoose.Schema({
  name: { type: String, required: true },
  date: { type: String, required: true }, // ISO date string
  subject: { type: String },
  priority: { type: String, enum: ['high', 'medium', 'low'], default: 'medium' },
  notes: { type: String },
  tasks: [TaskSchema],
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }  // Add owner field
});

export default mongoose.model('Exam', ExamSchema);
