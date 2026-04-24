import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Upload, Save, Plus, Trash2 } from 'lucide-react';
import api from '../../utils/api';
import { showToast } from '../../utils/toast';
import Button from '../../components/UI/Button';
import Input from '../../components/UI/Input';
import Textarea from '../../components/UI/Textarea';
import LoadingSpinner from '../../components/UI/LoadingSpinner';

const AdminProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    bio: '',
    socialLinks: {
      github: '',
      linkedin: '',
      twitter: '',
      instagram: ''
    },
    skills: [],
    experience: [],
    education: []
  });
  const [profileImage, setProfileImage] = useState(null);
  const [resumeFile, setResumeFile] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await api.get('/profile');
      const profileData = response.data;
      setProfile(profileData);
      setFormData({
        name: profileData.name || '',
        title: profileData.title || '',
        bio: profileData.bio || '',
        socialLinks: profileData.socialLinks || {
          github: '',
          linkedin: '',
          twitter: '',
          instagram: ''
        },
        skills: profileData.skills || [],
        experience: profileData.experience || [],
        education: profileData.education || []
      });
    } catch (error) {
      console.error('Error fetching profile:', error);
      showToast.error('Failed to fetch profile');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleImageChange = (e) => {
    setProfileImage(e.target.files[0]);
  };

  const handleResumeChange = (e) => {
    setResumeFile(e.target.files[0]);
  };

  const addSkillCategory = () => {
    setFormData(prev => ({
      ...prev,
      skills: [...prev.skills, { category: '', items: [''] }]
    }));
  };

  const updateSkillCategory = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.map((skill, i) => 
        i === index ? { ...skill, [field]: value } : skill
      )
    }));
  };

  const addSkillItem = (categoryIndex) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.map((skill, i) => 
        i === categoryIndex 
          ? { ...skill, items: [...skill.items, ''] }
          : skill
      )
    }));
  };

  const updateSkillItem = (categoryIndex, itemIndex, value) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.map((skill, i) => 
        i === categoryIndex 
          ? {
              ...skill,
              items: skill.items.map((item, j) => j === itemIndex ? value : item)
            }
          : skill
      )
    }));
  };

  const removeSkillCategory = (index) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index)
    }));
  };

  const removeSkillItem = (categoryIndex, itemIndex) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.map((skill, i) => 
        i === categoryIndex 
          ? {
              ...skill,
              items: skill.items.filter((_, j) => j !== itemIndex)
            }
          : skill
      )
    }));
  };

  const addExperience = () => {
    setFormData(prev => ({
      ...prev,
      experience: [...prev.experience, {
        company: '',
        position: '',
        duration: '',
        description: ''
      }]
    }));
  };

  const updateExperience = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      experience: prev.experience.map((exp, i) => 
        i === index ? { ...exp, [field]: value } : exp
      )
    }));
  };

  const removeExperience = (index) => {
    setFormData(prev => ({
      ...prev,
      experience: prev.experience.filter((_, i) => i !== index)
    }));
  };

  const addEducation = () => {
    setFormData(prev => ({
      ...prev,
      education: [...prev.education, {
        institution: '',
        degree: '',
        duration: '',
        description: ''
      }]
    }));
  };

  const updateEducation = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      education: prev.education.map((edu, i) => 
        i === index ? { ...edu, [field]: value } : edu
      )
    }));
  };

  const removeEducation = (index) => {
    setFormData(prev => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const submitData = new FormData();
      submitData.append('name', formData.name);
      submitData.append('title', formData.title);
      submitData.append('bio', formData.bio);
      submitData.append('socialLinks', JSON.stringify(formData.socialLinks));
      submitData.append('skills', JSON.stringify(formData.skills));
      submitData.append('experience', JSON.stringify(formData.experience));
      submitData.append('education', JSON.stringify(formData.education));

      if (profileImage) {
        submitData.append('profileImage', profileImage);
      }
      if (resumeFile) {
        submitData.append('resume', resumeFile);
      }

      await api.put('/profile', submitData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      showToast.success('Profile updated successfully!');
      fetchProfile();
    } catch (error) {
      console.error('Error updating profile:', error);
      showToast.error('Failed to update profile');
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
                Profile Settings
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Manage your personal information and portfolio details
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <User className="text-gray-400" size={24} />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="card"
          >
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
              Basic Information
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Full Name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
              <Input
                label="Professional Title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="e.g., MERN Stack Developer"
                required
              />
            </div>

            <div className="mt-6">
              <Textarea
                label="Bio"
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                rows={4}
                placeholder="Tell visitors about yourself..."
                required
              />
            </div>

            {/* Profile Image */}
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Profile Image
              </label>
              <div className="flex items-center space-x-4">
                {profile?.profileImage?.url && (
                  <img
                    src={profile.profileImage.url || "/placeholder.svg"}
                    alt="Current profile"
                    className="w-16 h-16 rounded-full object-cover"
                  />
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="input"
                />
              </div>
            </div>

            {/* Resume */}
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Resume (PDF)
              </label>
              <div className="flex items-center space-x-4">
                {profile?.resume?.url && (
                  <a
                    href={profile.resume.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-600 hover:text-primary-700"
                  >
                    View Current Resume
                  </a>
                )}
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleResumeChange}
                  className="input"
                />
              </div>
            </div>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="card"
          >
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
              Social Links
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="GitHub"
                name="socialLinks.github"
                value={formData.socialLinks.github}
                onChange={handleInputChange}
                placeholder="https://github.com/username"
              />
              <Input
                label="LinkedIn"
                name="socialLinks.linkedin"
                value={formData.socialLinks.linkedin}
                onChange={handleInputChange}
                placeholder="https://linkedin.com/in/username"
              />
              <Input
                label="Twitter"
                name="socialLinks.twitter"
                value={formData.socialLinks.twitter}
                onChange={handleInputChange}
                placeholder="https://twitter.com/username"
              />
              <Input
                label="Instagram"
                name="socialLinks.instagram"
                value={formData.socialLinks.instagram}
                onChange={handleInputChange}
                placeholder="https://instagram.com/username"
              />
            </div>
          </motion.div>

          {/* Skills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="card"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                Skills
              </h2>
              <Button type="button" onClick={() => addSkillCategory()} size="sm">
                <Plus size={16} className="mr-1" />
                Add Category
              </Button>
            </div>

            <div className="space-y-6">
              {formData.skills.map((skillCategory, categoryIndex) => (
                <div key={categoryIndex} className="border border-gray-200 dark:border-dark-700 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <Input
                      placeholder="Category name (e.g., Frontend)"
                      value={skillCategory.category}
                      onChange={(e) => updateSkillCategory(categoryIndex, 'category', e.target.value)}
                      className="flex-1 mr-4"
                    />
                    <Button
                      type="button"
                      variant="danger"
                      size="sm"
                      onClick={() => removeSkillCategory(categoryIndex)}
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                  
                  <div className="space-y-2">
                    {skillCategory.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="flex items-center space-x-2">
                        <Input
                          placeholder="Skill name"
                          value={item}
                          onChange={(e) => updateSkillItem(categoryIndex, itemIndex, e.target.value)}
                          className="flex-1"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeSkillItem(categoryIndex, itemIndex)}
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    ))}
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => addSkillItem(categoryIndex)}
                    >
                      <Plus size={16} className="mr-1" />
                      Add Skill
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Experience */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="card"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                Work Experience
              </h2>
              <Button type="button" onClick={() => addExperience()} size="sm">
                <Plus size={16} className="mr-1" />
                Add Experience
              </Button>
            </div>

            <div className="space-y-6">
              {formData.experience.map((exp, index) => (
                <div key={index} className="border border-gray-200 dark:border-dark-700 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                      Experience #{index + 1}
                    </h3>
                    <Button
                      type="button"
                      variant="danger"
                      size="sm"
                      onClick={() => removeExperience(index)}
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <Input
                      placeholder="Company name"
                      value={exp.company}
                      onChange={(e) => updateExperience(index, 'company', e.target.value)}
                    />
                    <Input
                      placeholder="Position"
                      value={exp.position}
                      onChange={(e) => updateExperience(index, 'position', e.target.value)}
                    />
                  </div>
                  
                  <Input
                    placeholder="Duration (e.g., Jan 2023 - Present)"
                    value={exp.duration}
                    onChange={(e) => updateExperience(index, 'duration', e.target.value)}
                    className="mb-4"
                  />
                  
                  <Textarea
                    placeholder="Job description..."
                    value={exp.description}
                    onChange={(e) => updateExperience(index, 'description', e.target.value)}
                    rows={3}
                  />
                </div>
              ))}
            </div>
          </motion.div>

          {/* Education */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="card"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                Education
              </h2>
              <Button type="button" onClick={() => addEducation()} size="sm">
                <Plus size={16} className="mr-1" />
                Add Education
              </Button>
            </div>

            <div className="space-y-6">
              {formData.education.map((edu, index) => (
                <div key={index} className="border border-gray-200 dark:border-dark-700 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                      Education #{index + 1}
                    </h3>
                    <Button
                      type="button"
                      variant="danger"
                      size="sm"
                      onClick={() => removeEducation(index)}
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <Input
                      placeholder="Institution name"
                      value={edu.institution}
                      onChange={(e) => updateEducation(index, 'institution', e.target.value)}
                    />
                    <Input
                      placeholder="Degree"
                      value={edu.degree}
                      onChange={(e) => updateEducation(index, 'degree', e.target.value)}
                    />
                  </div>
                  
                  <Input
                    placeholder="Duration (e.g., 2019 - 2023)"
                    value={edu.duration}
                    onChange={(e) => updateEducation(index, 'duration', e.target.value)}
                    className="mb-4"
                  />
                  
                  <Textarea
                    placeholder="Description (optional)..."
                    value={edu.description}
                    onChange={(e) => updateEducation(index, 'description', e.target.value)}
                    rows={2}
                  />
                </div>
              ))}
            </div>
          </motion.div>

          {/* Save Button */}
          <div className="flex justify-end">
            <Button type="submit" loading={saving} size="lg">
              <Save size={20} className="mr-2" />
              Save Profile
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminProfile;
