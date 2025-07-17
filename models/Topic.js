// models/Topic.js
import mongoose from 'mongoose';

const ReplySchema = new mongoose.Schema({
  _id: { 
    type: Number, 
    required: true 
  },
  author: { type: String, required: true },
  authorAvatar: { type: String, required: true },
  date: { type: String, required: true },
  content: { type: String, required: true },
  upvotes: { type: Number, default: 0 }
});

const TopicSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  authorAvatar: { type: String, required: true },
  subject: { type: String, required: true },
  date: { type: String, required: true }, // ISO date string
  content: { type: String, required: true },
  replies: [ReplySchema],
  upvotes: { type: Number, default: 0 },
  views: { type: Number, default: 0 },
  tags: [String]
});

export default mongoose.model('Topic', TopicSchema);




