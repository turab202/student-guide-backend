import mongoose from 'mongoose';
const taskSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  text: String,
  subject: String,
  priority: { type: String, default: 'medium' },
  completed: { type: Boolean, default: false },
});
export default mongoose.model('Task', taskSchema);
