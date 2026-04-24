import express from 'express';
import Profile from '../models/Profile.js';
import { authenticateToken, requireAdmin } from '../middleware/auth.js';
import { upload, uploadToCloudinary, deleteFromCloudinary, getResourceType } from '../utils/uploadImage.js';

const router = express.Router();

// Get profile (public)
router.get('/', async (req, res) => {
  try {
    let profile = await Profile.findOne();
    if (!profile) {
      // Create default profile if none exists
      profile = new Profile({
        name: 'Atul Anand',
        title: 'Software Developer',
        bio: 'Passionate software developer with expertise in MERN stack and strong problem-solving skills.',
        socialLinks: {},
        skills: [],
        experience: [],
        education: []
      });
      await profile.save();
    }
    res.json(profile);
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update profile (admin only)
router.put('/', authenticateToken, requireAdmin, upload.fields([
  { name: 'profileImage', maxCount: 1 },
  { name: 'resume', maxCount: 1 }
]), async (req, res) => {
  try {
    let profile = await Profile.findOne();
    if (!profile) {
      profile = new Profile({});
    }

    const {
      name,
      title,
      bio,
      socialLinks,
      skills,
      experience,
      education
    } = req.body;

    // Update text fields
    if (name) profile.name = name;
    if (title) profile.title = title;
    if (bio) profile.bio = bio;
    if (socialLinks) profile.socialLinks = JSON.parse(socialLinks);
    if (skills) profile.skills = JSON.parse(skills);
    if (experience) profile.experience = JSON.parse(experience);
    if (education) profile.education = JSON.parse(education);

    // Handle profile image upload
    if (req.files?.profileImage) {
      try {
        // Delete old image
        if (profile.profileImage?.public_id) {
          await deleteFromCloudinary(profile.profileImage.public_id, 'image');
        }
        
        const file = req.files.profileImage[0];
        const resourceType = getResourceType(file.mimetype);
        
        const imageData = await uploadToCloudinary(
          file.buffer,
          'portfolio/profile',
          resourceType
        );
        profile.profileImage = imageData;
        console.log('Profile image uploaded successfully:', imageData);
      } catch (uploadError) {
        console.error('Profile image upload error:', uploadError);
        return res.status(400).json({ message: 'Failed to upload profile image' });
      }
    }

    // Handle resume upload
    if (req.files?.resume) {
      try {
        // Delete old resume
        if (profile.resume?.public_id) {
          await deleteFromCloudinary(profile.resume.public_id, 'raw');
        }
        
        const file = req.files.resume[0];
        const resourceType = getResourceType(file.mimetype);
        
        const resumeData = await uploadToCloudinary(
          file.buffer,
          'portfolio/resume',
          resourceType
        );
        profile.resume = resumeData;
        console.log('Resume uploaded successfully:', resumeData);
      } catch (uploadError) {
        console.error('Resume upload error:', uploadError);
        return res.status(400).json({ message: 'Failed to upload resume' });
      }
    }

    await profile.save();
    res.json(profile);
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
