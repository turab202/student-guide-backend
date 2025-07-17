import express from 'express';
import {
  getNotes,
  createNote,
  getNote,
  deleteNote,
  getResources,
  createResource,
  toggleBookmark,
  deleteResource
} from '../controllers/studyHubController.js';
import { protect } from '../middleware/authMiddleware.js'; // ✅ Fix: named import

const router = express.Router();

// Apply auth middleware
router.use(protect);

// Notes routes
router.route('/notes')
  .get(getNotes)
  .post(createNote);

router.route('/notes/:id')
  .get(getNote)
  .delete(deleteNote);

// Resources routes
router.route('/resources')
  .get(getResources)
  .post(createResource);

router.route('/resources/:id')
  .delete(deleteResource);

router.patch('/resources/:id/bookmark', toggleBookmark);

export default router;
