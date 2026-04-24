import express from 'express';
import DSA from '../models/DSA.js';
import { authenticateToken, requireAdmin } from '../middleware/auth.js';

const router = express.Router();

// Get DSA profile (public)
router.get('/', async (req, res) => {
  try {
    let dsa = await DSA.findOne();
    if (!dsa) {
      dsa = new DSA({
        leetcode: {},
        codeforces: {},
        codechef: {},
        achievements: []
      });
      await dsa.save();
    }
    res.json(dsa);
  } catch (error) {
    console.error('Get DSA error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update DSA profile (admin only)
router.put('/', authenticateToken, requireAdmin, async (req, res) => {
  try {
    let dsa = await DSA.findOne();
    if (!dsa) {
      dsa = new DSA({});
    }

    const { leetcode, codeforces, codechef, achievements } = req.body;

    if (leetcode) dsa.leetcode = leetcode;
    if (codeforces) dsa.codeforces = codeforces;
    if (codechef) dsa.codechef = codechef;
    if (achievements) dsa.achievements = achievements;

    await dsa.save();
    res.json(dsa);
  } catch (error) {
    console.error('Update DSA error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
