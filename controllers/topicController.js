// controllers/topicController.js
import Topic from '../models/Topic.js';

// Get all topics
export const getTopics = async (req, res) => {
  try {
    const topics = await Topic.find();
    res.json(topics);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new topic
export const createTopic = async (req, res) => {
  const topic = new Topic(req.body);
  try {
    const newTopic = await topic.save();
    res.status(201).json(newTopic);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get a single topic by ID
export const getTopicById = async (req, res) => {
  try {
    const topic = await Topic.findById(req.params.id);
    if (!topic) return res.status(404).json({ message: 'Topic not found' });
    res.json(topic);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a topic
export const updateTopic = async (req, res) => {
  try {
    const topic = await Topic.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!topic) return res.status(404).json({ message: 'Topic not found' });
    res.json(topic);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a topic
export const deleteTopic = async (req, res) => {
  try {
    const topic = await Topic.findByIdAndDelete(req.params.id);
    if (!topic) return res.status(404).json({ message: 'Topic not found' });
    res.json({ message: 'Topic deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Upvote a topic
export const upvoteTopic = async (req, res) => {
  try {
    const topic = await Topic.findById(req.params.id);
    if (!topic) return res.status(404).json({ message: 'Topic not found' });
    topic.upvotes += 1;
    await topic.save();
    res.json(topic);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add a reply to a topic
export const addReply = async (req, res) => {
  try {
    const topic = await Topic.findById(req.params.id);
    if (!topic) return res.status(404).json({ message: 'Topic not found' });

    const reply = req.body;
    topic.replies.push(reply);
    await topic.save();
    res.status(201).json(topic);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Upvote a reply
export const upvoteReply = async (req, res) => {
  try {
    const topic = await Topic.findById(req.params.topicId);
    if (!topic) return res.status(404).json({ message: 'Topic not found' });

    const reply = topic.replies.id(req.params.replyId);
    if (!reply) return res.status(404).json({ message: 'Reply not found' });

    reply.upvotes += 1;
    await topic.save();
    res.json(topic);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Increment view count
export const incrementView = async (req, res) => {
  try {
    const topic = await Topic.findById(req.params.id);
    if (!topic) return res.status(404).json({ message: 'Topic not found' });
    topic.views += 1;
    await topic.save();
    res.json(topic);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};