import express from 'express';
import { protect }       from '../middleware/authMiddleware.js';
import {
  getPassages,
  createPassage,
  saveStat,
  getMyStats
} from '../controllers/readingController.js';

const router = express.Router();

router.get('/passages', protect, getPassages);       // list
router.post('/passages', protect, createPassage);    // (optional) authoring

router.post('/stats',   protect, saveStat);          // save score
router.get ('/stats/me',protect, getMyStats);        // my history

export default router;
