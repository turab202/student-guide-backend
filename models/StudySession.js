import mongoose from 'mongoose';
const studySessionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  date: String,
  subject: String,
  duration: Number,
});
export default mongoose.model('StudySession', studySessionSchema);
