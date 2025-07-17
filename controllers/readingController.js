import ReadingPassage from '../models/ReadingPassage.js';
import ReadingStat    from '../models/ReadingStat.js';

/* ---------- GET /api/reading/passages ------------- */
export const getPassages = async (req, res) => {
  /* global passages + those created by the signed‑in user */
  const passages = await ReadingPassage.find({
    $or: [{ userId: null }, { userId: req.user?._id }]
  }).sort({ createdAt: 1 });

  res.json(passages);
};

/* ---------- POST /api/reading/passages ------------- */
export const createPassage = async (req, res) => {
  const passage = await ReadingPassage.create({ ...req.body, userId: req.user._id });
  res.status(201).json(passage);
};

/* ---------- POST /api/reading/stats ------------- */
export const saveStat = async (req, res) => {
  const { passageId, score } = req.body;
  const stat = await ReadingStat.create({ userId: req.user._id, passageId, score });
  res.status(201).json(stat);
};

/* ---------- GET /api/reading/stats/me ------------- */
export const getMyStats = async (req, res) => {
  const stats = await ReadingStat.find({ userId: req.user._id });
  res.json(stats);
};
