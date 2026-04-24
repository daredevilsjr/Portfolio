import express from 'express';
import { body, validationResult } from 'express-validator';
import Project from '../models/Project.js';
import { authenticateToken, requireAdmin } from '../middleware/auth.js';
import { upload, uploadToCloudinary, deleteFromCloudinary, getResourceType } from '../utils/uploadImage.js';

const router = express.Router();

// Get all projects (public)
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find().sort({ order: 1, createdAt: -1 });
    res.json(projects);
  } catch (error) {
    console.error('Get projects error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get featured projects (public)
router.get('/featured', async (req, res) => {
  try {
    const projects = await Project.find({ featured: true }).sort({ order: 1 });
    res.json(projects);
  } catch (error) {
    console.error('Get featured projects error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get single project (public)
router.get('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.json(project);
  } catch (error) {
    console.error('Get project error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create project (admin only) - Fixed validation
router.post('/', authenticateToken, requireAdmin, upload.single('image'), [
  body('title').notEmpty().trim().withMessage('Title is required'),
  body('description').notEmpty().withMessage('Description is required'),
  body('githubUrl').isURL().withMessage('Valid GitHub URL is required'),
  body('technologies').notEmpty().withMessage('Technologies are required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log('Validation errors:', errors.array());
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, description, githubUrl, liveUrl, technologies, featured, order } = req.body;

    // Parse technologies - handle both string and array formats
    let parsedTechnologies;
    try {
      if (typeof technologies === 'string') {
        // If it's a JSON string, parse it
        if (technologies.startsWith('[') && technologies.endsWith(']')) {
          parsedTechnologies = JSON.parse(technologies);
        } else {
          // If it's a comma-separated string, split it
          parsedTechnologies = technologies.split(',').map(tech => tech.trim()).filter(tech => tech);
        }
      } else if (Array.isArray(technologies)) {
        parsedTechnologies = technologies;
      } else {
        throw new Error('Invalid technologies format');
      }

      // Validate that we have at least one technology
      if (!parsedTechnologies || parsedTechnologies.length === 0) {
        return res.status(400).json({ message: 'At least one technology is required' });
      }
    } catch (parseError) {
      console.error('Technologies parsing error:', parseError);
      return res.status(400).json({ message: 'Invalid technologies format' });
    }

    let imageData = null;
    if (req.file) {
      try {
        const resourceType = getResourceType(req.file.mimetype);
        imageData = await uploadToCloudinary(req.file.buffer, 'portfolio/projects', resourceType);
        console.log('Project image uploaded successfully:', imageData);
      } catch (uploadError) {
        console.error('Project image upload error:', uploadError);
        return res.status(400).json({ message: 'Failed to upload project image' });
      }
    }

    const project = new Project({
      title,
      description,
      githubUrl,
      liveUrl: liveUrl || '',
      technologies: parsedTechnologies,
      featured: featured === 'true' || featured === true,
      order: parseInt(order) || 0,
      image: imageData
    });

    await project.save();
    console.log('Project created successfully:', project);
    res.status(201).json(project);
  } catch (error) {
    console.error('Create project error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update project (admin only) - Fixed validation
router.put('/:id', authenticateToken, requireAdmin, upload.single('image'), async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    const { title, description, githubUrl, liveUrl, technologies, featured, order } = req.body;

    // Update fields
    if (title) project.title = title;
    if (description) project.description = description;
    if (githubUrl) project.githubUrl = githubUrl;
    if (liveUrl !== undefined) project.liveUrl = liveUrl;
    
    // Handle technologies update
    if (technologies) {
      try {
        let parsedTechnologies;
        if (typeof technologies === 'string') {
          // If it's a JSON string, parse it
          if (technologies.startsWith('[') && technologies.endsWith(']')) {
            parsedTechnologies = JSON.parse(technologies);
          } else {
            // If it's a comma-separated string, split it
            parsedTechnologies = technologies.split(',').map(tech => tech.trim()).filter(tech => tech);
          }
        } else if (Array.isArray(technologies)) {
          parsedTechnologies = technologies;
        }
        
        if (parsedTechnologies && parsedTechnologies.length > 0) {
          project.technologies = parsedTechnologies;
        }
      } catch (parseError) {
        console.error('Technologies parsing error:', parseError);
        return res.status(400).json({ message: 'Invalid technologies format' });
      }
    }
    
    if (featured !== undefined) project.featured = featured === 'true' || featured === true;
    if (order !== undefined) project.order = parseInt(order);

    // Handle image update
    if (req.file) {
      try {
        // Delete old image if exists
        if (project.image?.public_id) {
          await deleteFromCloudinary(project.image.public_id, 'image');
        }
        
        // Upload new image
        const resourceType = getResourceType(req.file.mimetype);
        const imageData = await uploadToCloudinary(req.file.buffer, 'portfolio/projects', resourceType);
        project.image = imageData;
        console.log('Project image updated successfully:', imageData);
      } catch (uploadError) {
        console.error('Project image update error:', uploadError);
        return res.status(400).json({ message: 'Failed to update project image' });
      }
    }

    await project.save();
    console.log('Project updated successfully:', project);
    res.json(project);
  } catch (error) {
    console.error('Update project error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete project (admin only)
router.delete('/:id', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Delete image from Cloudinary
    if (project.image?.public_id) {
      await deleteFromCloudinary(project.image.public_id, 'image');
    }

    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error('Delete project error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
