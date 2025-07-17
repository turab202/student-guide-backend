import mongoose from 'mongoose';

const readingStatSchema = new mongoose.Schema(
  {
    userId:    { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    passageId: { type: mongoose.Schema.Types.ObjectId, ref: 'ReadingPassage', required: true },
    score:     { type: Number, required: true },          // 0‑100
  },
  { timestamps: true }
);

export default mongoose.model('ReadingStat', readingStatSchema);
