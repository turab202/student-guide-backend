import mongoose from 'mongoose';
import validator from 'validator';

const resourceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  type: {
    type: String,
    required: [true, 'Please provide a type'],
    enum: ['website', 'video', 'book', 'article', 'podcast', 'pdf'],
    default: 'website'
  },
  subject: {
    type: String,
    required: [true, 'Please provide a subject'],
    trim: true
  },
  url: {
    type: String,
    required: [true, 'Please provide a URL'],
    validate: [validator.isURL, 'Please provide a valid URL'],
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  bookmarked: {
    type: Boolean,
    default: false
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Text index for search functionality
resourceSchema.index({ title: 'text', subject: 'text', description: 'text' });

// Format the createdAt date
resourceSchema.virtual('formattedCreatedAt').get(function() {
  return this.createdAt.toLocaleString();
});

const Resource = mongoose.model('Resource', resourceSchema);
export default Resource;