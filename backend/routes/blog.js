import express from 'express';
import { body, validationResult } from 'express-validator';
import Blog from '../models/Blog.js';
import { authenticateToken, requireAdmin } from '../middleware/auth.js';

const router = express.Router();

// Get all blog posts (public)
router.get('/', async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ publishedDate: -1 });
    res.json(blogs);
  } catch (error) {
    console.error('Get blogs error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get featured blog posts (public)
router.get('/featured', async (req, res) => {
  try {
    const blogs = await Blog.find({ featured: true }).sort({ publishedDate: -1 });
    res.json(blogs);
  } catch (error) {
    console.error('Get featured blogs error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create blog post (admin only)
router.post('/', authenticateToken, requireAdmin, [
  body('title').notEmpty().trim(),
  body('description').notEmpty(),
  body('externalUrl').isURL(),
  body('platform').isIn(['Medium', 'Dev.to', 'Hashnode', 'Personal', 'Other']),
  body('publishedDate').isISO8601()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const blog = new Blog(req.body);
    await blog.save();
    res.status(201).json(blog);
  } catch (error) {
    console.error('Create blog error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update blog post (admin only)
router.put('/:id', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!blog) {
      return res.status(404).json({ message: 'Blog post not found' });
    }
    res.json(blog);
  } catch (error) {
    console.error('Update blog error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete blog post (admin only)
router.delete('/:id', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog post not found' });
    }
    res.json({ message: 'Blog post deleted successfully' });
  } catch (error) {
    console.error('Delete blog error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
