// routes/topicRoutes.js
import express from 'express';
import {
  getTopics,
  createTopic,
  getTopicById,
  updateTopic,
  deleteTopic,
  upvoteTopic,
  addReply,
  upvoteReply,
  incrementView
} from '../controllers/topicController.js';

const router = express.Router();

// Topics
router.get('/', getTopics);
router.post('/', createTopic);
router.get('/:id', getTopicById);
router.put('/:id', updateTopic);
router.delete('/:id', deleteTopic);

// Votes & Views
router.post('/:id/upvote', upvoteTopic);
router.post('/:id/view', incrementView);

// Replies
router.post('/:id/reply', addReply);
router.post('/:topicId/reply/:replyId/upvote', upvoteReply);

export default router;