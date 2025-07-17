import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import studyRoutes from './routes/studyRoutes.js';
import authRoutes from './routes/authRoutes.js';
import quizRoutes from './routes/quizRoutes.js';
import readingRoutes from './routes/readingRoutes.js';
import examRoutes from './routes/examRoutes.js'
import topicRoutes from './routes/topicRoutes.js'
import studyHubRoutes from './routes/studyHubRoutes.js'

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/study', studyRoutes);
app.use('/api/quizzes', quizRoutes);
app.use('/api/reading', readingRoutes);
app.use('/api/exams', examRoutes);
app.use('/api/topics', topicRoutes); 
app.use('/api/studyhub', studyHubRoutes); 


// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT || 5000, () =>
      console.log(`Server running on port ${process.env.PORT || 5000}`)
    );
  })
  .catch((err) => console.error('MongoDB connection error:', err));
