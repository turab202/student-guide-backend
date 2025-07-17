import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
  text:         { type: String, required: true },
  options:      { type: [String], required: true },
  correctAnswer:{ type: Number, required: true },
  explanation:  { type: String, required: true }
});

const readingPassageSchema = new mongoose.Schema(
  {
    /* null ⇒ global passage visible to every user */
    userId:      { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
    title:       { type: String, required: true },
    content:     { type: String, required: true },
    icon:        { type: String, default: '📚' },
    color:       { type: String, default: 'bg-blue-500' },
    readingTime: { type: Number, default: 2 }, // minutes
    questions:   { type: [questionSchema], default: [] }
  },
  { timestamps: true }
);

export default mongoose.model('ReadingPassage', readingPassageSchema);
