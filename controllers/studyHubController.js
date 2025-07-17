import Note from '../models/Note.js';
import Resource from '../models/Resource.js';

// Notes Controllers
export const getNotes = async (req, res) => {
  try {
    const { search } = req.query;
    const query = { user: req.user._id };
    
    if (search) query.$text = { $search: search };

    const notes = await Note.find(query).sort('-createdAt');
    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch notes' });
  }
};

export const createNote = async (req, res) => {
  try {
    const { title, content, tags } = req.body;
    const tagsArray = typeof tags === 'string' 
      ? tags.split(',').map(tag => tag.trim()).filter(tag => tag)
      : Array.isArray(tags) ? tags : [];

    const note = await Note.create({
      title,
      content,
      tags: tagsArray,
      user: req.user._id
    });
    res.status(201).json(note);
  } catch (error) {
    res.status(400).json({ message: 'Invalid note data' });
  }
};

export const getNote = async (req, res) => {
  try {
    const note = await Note.findOne({ _id: req.params.id, user: req.user._id });
    if (!note) return res.status(404).json({ message: 'Note not found' });
    res.json(note);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch note' });
  }
};

export const deleteNote = async (req, res) => {
  try {
    const note = await Note.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!note) return res.status(404).json({ message: 'Note not found' });
    res.json({ message: 'Note deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete note' });
  }
};

// Resources Controllers
export const getResources = async (req, res) => {
  try {
    const { type, subject, bookmarked, search } = req.query;
    const query = { user: req.user._id };

    if (type && type !== 'all') query.type = type;
    if (subject && subject !== 'all') query.subject = subject;
    if (bookmarked === 'true') query.bookmarked = true;
    if (search) query.$text = { $search: search };

    const resources = await Resource.find(query).sort('-createdAt');
    res.json(resources);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch resources' });
  }
};

export const createResource = async (req, res) => {
  try {
    const resource = await Resource.create({
      ...req.body,
      user: req.user._id
    });
    res.status(201).json(resource);
  } catch (error) {
    res.status(400).json({ message: 'Invalid resource data' });
  }
};

export const toggleBookmark = async (req, res) => {
  try {
    const resource = await Resource.findOne({
      _id: req.params.id,
      user: req.user._id
    });
    if (!resource) return res.status(404).json({ message: 'Resource not found' });
    
    resource.bookmarked = !resource.bookmarked;
    await resource.save();
    res.json(resource);
  } catch (error) {
    res.status(400).json({ message: 'Bookmark update failed' });
  }
};

export const deleteResource = async (req, res) => {
  try {
    const resource = await Resource.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!resource) return res.status(404).json({ message: 'Resource not found' });
    res.json({ message: 'Resource deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete resource' });
  }
};