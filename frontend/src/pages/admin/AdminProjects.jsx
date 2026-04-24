import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Star, Github, ExternalLink } from 'lucide-react';
import api from '../../utils/api';
import { showToast } from '../../utils/toast';
import Button from '../../components/UI/Button';
import Input from '../../components/UI/Input';
import Textarea from '../../components/UI/Textarea';
import LoadingSpinner from '../../components/UI/LoadingSpinner';

const AdminProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    technologies: '',
    githubUrl: '',
    liveUrl: '',
    featured: false,
    order: 0
  });
  const [imageFile, setImageFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await api.get('/projects');
      setProjects(response.data);
    } catch (error) {
      console.error('Error fetching projects:', error);
      showToast.error('Failed to fetch projects');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const openModal = (project = null) => {
    if (project) {
      setEditingProject(project);
      setFormData({
        title: project.title,
        description: project.description,
        technologies: project.technologies.join(', '),
        githubUrl: project.githubUrl,
        liveUrl: project.liveUrl || '',
        featured: project.featured,
        order: project.order
      });
    } else {
      setEditingProject(null);
      setFormData({
        title: '',
        description: '',
        technologies: '',
        githubUrl: '',
        liveUrl: '',
        featured: false,
        order: 0
      });
    }
    setImageFile(null);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingProject(null);
    setImageFile(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const submitData = new FormData();
      submitData.append('title', formData.title);
      submitData.append('description', formData.description);
      
      // Handle technologies - convert comma-separated string to array
      const techArray = formData.technologies
        .split(',')
        .map(tech => tech.trim())
        .filter(tech => tech.length > 0);
      
      // Send as JSON string for FormData
      submitData.append('technologies', JSON.stringify(techArray));
      submitData.append('githubUrl', formData.githubUrl);
      submitData.append('liveUrl', formData.liveUrl);
      submitData.append('featured', formData.featured.toString());
      submitData.append('order', formData.order.toString());
      
      if (imageFile) {
        submitData.append('image', imageFile);
      }

      // Debug: Log what we're sending
      console.log('Submitting project data:', {
        title: formData.title,
        description: formData.description,
        technologies: techArray,
        githubUrl: formData.githubUrl,
        liveUrl: formData.liveUrl,
        featured: formData.featured,
        order: formData.order,
        hasImage: !!imageFile
      });

      if (editingProject) {
        await api.put(`/projects/${editingProject._id}`, submitData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        showToast.success('Project updated successfully!');
      } else {
        await api.post('/projects', submitData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        showToast.success('Project created successfully!');
      }

      fetchProjects();
      closeModal();
    } catch (error) {
      console.error('Error saving project:', error);
      const errorMessage = error.response?.data?.message || 
                          error.response?.data?.errors?.[0]?.msg || 
                          'Failed to save project';
      showToast.error(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (projectId) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await api.delete(`/projects/${projectId}`);
        showToast.success('Project deleted successfully!');
        fetchProjects();
      } catch (error) {
        console.error('Error deleting project:', error);
        showToast.error('Failed to delete project');
      }
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
                Manage Projects
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Add, edit, and organize your portfolio projects
              </p>
            </div>
            <Button onClick={() => openModal()}>
              <Plus size={20} className="mr-2" />
              Add Project
            </Button>
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {projects.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-4">
              No projects yet
            </p>
            <Button onClick={() => openModal()}>
              <Plus size={20} className="mr-2" />
              Add Your First Project
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <motion.div
                key={project._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card group"
              >
                {/* Project Image */}
                <div className="aspect-video rounded-lg overflow-hidden mb-4 relative">
                  <img
                    src={project.image?.url || '/placeholder.svg?height=200&width=300&query=project screenshot'}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                  {project.featured && (
                    <div className="absolute top-2 right-2">
                      <Star className="text-yellow-500 fill-current" size={20} />
                    </div>
                  )}
                </div>

                {/* Project Info */}
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 line-clamp-2">
                    {project.description}
                  </p>
                  
                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="px-2 py-1 bg-gray-100 dark:bg-dark-700 text-gray-600 dark:text-gray-400 rounded text-sm">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>

                  {/* Links */}
                  <div className="flex space-x-3">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 dark:text-gray-400 hover:text-primary-600 transition-colors"
                    >
                      <Github size={20} />
                    </a>
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 dark:text-gray-400 hover:text-primary-600 transition-colors"
                      >
                        <ExternalLink size={20} />
                      </a>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-2 pt-4 border-t border-gray-200 dark:border-dark-700">
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => openModal(project)}
                    >
                      <Edit size={16} className="mr-1" />
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDelete(project._id)}
                    >
                      <Trash2 size={16} className="mr-1" />
                      Delete
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-dark-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                {editingProject ? 'Edit Project' : 'Add New Project'}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <Input
                  label="Project Title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                />

                <Textarea
                  label="Description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  rows={4}
                />

                <Input
                  label="Technologies (comma-separated)"
                  name="technologies"
                  value={formData.technologies}
                  onChange={handleInputChange}
                  placeholder="React, Node.js, MongoDB"
                  required
                />

                <Input
                  label="GitHub URL"
                  name="githubUrl"
                  type="url"
                  value={formData.githubUrl}
                  onChange={handleInputChange}
                  required
                />

                <Input
                  label="Live Demo URL (optional)"
                  name="liveUrl"
                  type="url"
                  value={formData.liveUrl}
                  onChange={handleInputChange}
                />

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Project Image
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="input"
                  />
                </div>

                <div className="flex items-center space-x-4">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="featured"
                      checked={formData.featured}
                      onChange={handleInputChange}
                      className="mr-2"
                    />
                    <span className="text-gray-700 dark:text-gray-300">Featured Project</span>
                  </label>

                  <Input
                    label="Order"
                    name="order"
                    type="number"
                    value={formData.order}
                    onChange={handleInputChange}
                    className="w-24"
                  />
                </div>

                <div className="flex space-x-4 pt-6">
                  <Button type="submit" loading={submitting}>
                    {editingProject ? 'Update Project' : 'Create Project'}
                  </Button>
                  <Button type="button" variant="secondary" onClick={closeModal}>
                    Cancel
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProjects;
