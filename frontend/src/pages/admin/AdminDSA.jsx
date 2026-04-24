import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Award, Plus, Trash2, Save, Calendar } from 'lucide-react';
import api from '../../utils/api';
import { showToast } from '../../utils/toast';
import Button from '../../components/UI/Button';
import Input from '../../components/UI/Input';
import Textarea from '../../components/UI/Textarea';
import LoadingSpinner from '../../components/UI/LoadingSpinner';

const AdminDSA = () => {
  const [dsaData, setDsaData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    leetcode: {
      username: '',
      solved: 0,
      ranking: 0,
      badges: []
    },
    codeforces: {
      username: '',
      rating: 0,
      maxRating: 0,
      rank: ''
    },
    codechef: {
      username: '',
      rating: 0,
      stars: 0,
      globalRank: 0
    },
    achievements: []
  });

  useEffect(() => {
    fetchDSAData();
  }, []);

  const fetchDSAData = async () => {
    try {
      const response = await api.get('/dsa');
      const data = response.data;
      setDsaData(data);
      setFormData({
        leetcode: data.leetcode || {
          username: '',
          solved: 0,
          ranking: 0,
          badges: []
        },
        codeforces: data.codeforces || {
          username: '',
          rating: 0,
          maxRating: 0,
          rank: ''
        },
        codechef: data.codechef || {
          username: '',
          rating: 0,
          stars: 0,
          globalRank: 0
        },
        achievements: data.achievements || []
      });
    } catch (error) {
      console.error('Error fetching DSA data:', error);
      showToast.error('Failed to fetch DSA data');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (platform, field, value) => {
    setFormData(prev => ({
      ...prev,
      [platform]: {
        ...prev[platform],
        [field]: field === 'badges' ? value.split(',').map(b => b.trim()).filter(b => b) : value
      }
    }));
  };

  const addAchievement = () => {
    setFormData(prev => ({
      ...prev,
      achievements: [...prev.achievements, {
        title: '',
        description: '',
        date: new Date().toISOString().split('T')[0],
        platform: ''
      }]
    }));
  };

  const updateAchievement = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      achievements: prev.achievements.map((achievement, i) => 
        i === index ? { ...achievement, [field]: value } : achievement
      )
    }));
  };

  const removeAchievement = (index) => {
    setFormData(prev => ({
      ...prev,
      achievements: prev.achievements.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      await api.put('/dsa', formData);
      showToast.success('DSA profile updated successfully!');
      fetchDSAData();
    } catch (error) {
      console.error('Error updating DSA data:', error);
      showToast.error('Failed to update DSA profile');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="xl" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-900">
      {/* Header */}
      <div className="bg-white dark:bg-dark-800 shadow-sm border-b border-gray-200 dark:border-dark-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                DSA & Competitive Programming
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Manage your coding platform profiles and achievements
              </p>
            </div>
            <Trophy className="text-yellow-500" size={32} />
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* LeetCode */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="card"
          >
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mr-4">
                <Trophy className="text-white" size={24} />
              </div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                LeetCode Profile
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Username"
                value={formData.leetcode.username}
                onChange={(e) => handleInputChange('leetcode', 'username', e.target.value)}
                placeholder="Your LeetCode username"
              />
              <Input
                label="Problems Solved"
                type="number"
                value={formData.leetcode.solved}
                onChange={(e) => handleInputChange('leetcode', 'solved', parseInt(e.target.value) || 0)}
              />
              <Input
                label="Ranking"
                type="number"
                value={formData.leetcode.ranking}
                onChange={(e) => handleInputChange('leetcode', 'ranking', parseInt(e.target.value) || 0)}
              />
              <Input
                label="Badges (comma-separated)"
                value={formData.leetcode.badges.join(', ')}
                onChange={(e) => handleInputChange('leetcode', 'badges', e.target.value)}
                placeholder="50 Days Badge, 100 Days Badge"
              />
            </div>
          </motion.div>

          {/* Codeforces */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="card"
          >
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mr-4">
                <Trophy className="text-white" size={24} />
              </div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                Codeforces Profile
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Username"
                value={formData.codeforces.username}
                onChange={(e) => handleInputChange('codeforces', 'username', e.target.value)}
                placeholder="Your Codeforces handle"
              />
              <Input
                label="Current Rating"
                type="number"
                value={formData.codeforces.rating}
                onChange={(e) => handleInputChange('codeforces', 'rating', parseInt(e.target.value) || 0)}
              />
              <Input
                label="Max Rating"
                type="number"
                value={formData.codeforces.maxRating}
                onChange={(e) => handleInputChange('codeforces', 'maxRating', parseInt(e.target.value) || 0)}
              />
              <Input
                label="Rank"
                value={formData.codeforces.rank}
                onChange={(e) => handleInputChange('codeforces', 'rank', e.target.value)}
                placeholder="e.g., Pupil, Specialist"
              />
            </div>
          </motion.div>

          {/* CodeChef */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="card"
          >
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-amber-600 rounded-full flex items-center justify-center mr-4">
                <Trophy className="text-white" size={24} />
              </div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                CodeChef Profile
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Username"
                value={formData.codechef.username}
                onChange={(e) => handleInputChange('codechef', 'username', e.target.value)}
                placeholder="Your CodeChef username"
              />
              <Input
                label="Rating"
                type="number"
                value={formData.codechef.rating}
                onChange={(e) => handleInputChange('codechef', 'rating', parseInt(e.target.value) || 0)}
              />
              <Input
                label="Stars"
                type="number"
                value={formData.codechef.stars}
                onChange={(e) => handleInputChange('codechef', 'stars', parseInt(e.target.value) || 0)}
              />
              <Input
                label="Global Rank"
                type="number"
                value={formData.codechef.globalRank}
                onChange={(e) => handleInputChange('codechef', 'globalRank', parseInt(e.target.value) || 0)}
              />
            </div>
          </motion.div>

          {/* Achievements */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="card"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <Award className="text-primary-600 mr-3" size={24} />
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                  Achievements
                </h2>
              </div>
              <Button type="button" onClick={addAchievement} size="sm">
                <Plus size={16} className="mr-1" />
                Add Achievement
              </Button>
            </div>

            <div className="space-y-6">
              {formData.achievements.map((achievement, index) => (
                <div key={index} className="border border-gray-200 dark:border-dark-700 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                      Achievement #{index + 1}
                    </h3>
                    <Button
                      type="button"
                      variant="danger"
                      size="sm"
                      onClick={() => removeAchievement(index)}
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <Input
                      placeholder="Achievement title"
                      value={achievement.title}
                      onChange={(e) => updateAchievement(index, 'title', e.target.value)}
                    />
                    <Input
                      placeholder="Platform"
                      value={achievement.platform}
                      onChange={(e) => updateAchievement(index, 'platform', e.target.value)}
                    />
                  </div>
                  
                  <Input
                    label="Date"
                    type="date"
                    value={achievement.date ? achievement.date.split('T')[0] : ''}
                    onChange={(e) => updateAchievement(index, 'date', e.target.value)}
                    className="mb-4"
                  />
                  
                  <Textarea
                    placeholder="Achievement description..."
                    value={achievement.description}
                    onChange={(e) => updateAchievement(index, 'description', e.target.value)}
                    rows={3}
                  />
                </div>
              ))}

              {formData.achievements.length === 0 && (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  No achievements added yet. Click "Add Achievement" to get started.
                </div>
              )}
            </div>
          </motion.div>

          {/* Save Button */}
          <div className="flex justify-end">
            <Button type="submit" loading={saving} size="lg">
              <Save size={20} className="mr-2" />
              Save DSA Profile
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminDSA;
