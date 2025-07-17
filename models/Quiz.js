import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
  text: { type: String, required: true },
  type: { type: String, enum: ['multiple_choice', 'true_false'], required: true },
  options: [String], // for multiple_choice only
  correctAnswer: mongoose.Schema.Types.Mixed, // number or boolean
});

const quizSchema = new mongoose.Schema({
  title: { type: String, required: true },
  questions: [questionSchema],
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null }, // null = global
});

const Quiz = mongoose.model('Quiz', quizSchema);

export default Quiz;
