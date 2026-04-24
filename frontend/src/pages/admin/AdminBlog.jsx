import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, ExternalLink, Calendar, Tag } from 'lucide-react';
import api from '../../utils/api';
import { showToast } from '../../utils/toast';
import Button from '../../components/UI/Button';
import Input from '../../components/UI/Input';
import Textarea from '../../components/UI/Textarea';
import LoadingSpinner from '../../components/UI/LoadingSpinner';

const AdminBlog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    externalUrl: '',
    platform: 'Medium',
    publishedDate: new Date().toISOString().split('T')[0],
    tags: '',
    featured: false
  });
  const [submitting, setSubmitting] = useState(false);

  const platforms = ['Medium', 'Dev.to', 'Hashnode', 'Personal', 'Other'];

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await api.get('/blog');
      setBlogs(response.data);
    } catch (error) {
      console.error('Error fetching blogs:', error);
      showToast.error('Failed to fetch blog posts');
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

  const openModal = (blog = null) => {
    if (blog) {
      setEditingBlog(blog);
      setFormData({
        title: blog.title,
        description: blog.description,
        externalUrl: blog.externalUrl,
        platform: blog.platform,
        publishedDate: blog.publishedDate.split('T')[0],
        tags: blog.tags.join(', '),
        featured: blog.featured
      });
    } else {
      setEditingBlog(null);
      setFormData({
        title: '',
        description: '',
        externalUrl: '',
        platform: 'Medium',
        publishedDate: new Date().toISOString().split('T')[0],
        tags: '',
        featured: false
      });
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingBlog(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const submitData = {
        ...formData,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
      };

      if (editingBlog) {
        await api.put(`/blog/${editingBlog._id}`, submitData);
        showToast.success('Blog post updated successfully!');
      } else {
        await api.post('/blog', submitData);
        showToast.success('Blog post created successfully!');
      }

      fetchBlogs();
      closeModal();
    } catch (error) {
      console.error('Error saving blog post:', error);
      showToast.error('Failed to save blog post');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (blogId) => {
    if (window.confirm('Are you sure you want to delete this blog post?')) {
      try {
        await api.delete(`/blog/${blogId}`);
        showToast.success('Blog post deleted successfully!');
        fetchBlogs();
      } catch (error) {
        console.error('Error deleting blog post:', error);
        showToast.error('Failed to delete blog post');
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
                Manage Blog Posts
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Add and manage links to your external blog posts
              </p>
            </div>
            <Button onClick={() => openModal()}>
              <Plus size={20} className="mr-2" />
              Add Blog Post
            </Button>
          </div>
        </div>
      </div>

      {/* Blog Posts */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {blogs.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-4">
              No blog posts yet
            </p>
            <Button onClick={() => openModal()}>
              <Plus size={20} className="mr-2" />
              Add Your First Blog Post
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((blog, index) => (
              <motion.div
                key={blog._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card group"
              >
                <div className="space-y-4">
                  {/* Header */}
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full text-sm font-medium">
                      {blog.platform}
                    </span>
                    {blog.featured && (
                      <span className="px-2 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 rounded-full text-xs font-medium">
                        Featured
                      </span>
                    )}
                  </div>

                  {/* Content */}
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                      {blog.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 line-clamp-3">
                      {blog.description}
                    </p>
                  </div>

                  {/* Tags */}
                  {blog.tags && blog.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {blog.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center px-2 py-1 bg-gray-100 dark:bg-dark-700 text-gray-700 dark:text-gray-300 rounded text-sm"
                        >
                          <Tag size={12} className="mr-1" />
                          {tag}
                        </span>
                      ))}
                      {blog.tags.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 dark:bg-dark-700 text-gray-600 dark:text-gray-400 rounded text-sm">
                          +{blog.tags.length - 3}
                        </span>
                      )}
                    </div>
                  )}

                  {/* Meta */}
                  <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center">
                      <Calendar size={16} className="mr-2" />
                      {new Date(blog.publishedDate).toLocaleDateString()}
                    </div>
                    <a
                      href={blog.externalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-primary-600 hover:text-primary-700 transition-colors"
                    >
                      <ExternalLink size={16} className="mr-1" />
                      View
                    </a>
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-2 pt-4 border-t border-gray-200 dark:border-dark-700">
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => openModal(blog)}
                    >
                      <Edit size={16} className="mr-1" />
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDelete(blog._id)}
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
                {editingBlog ? 'Edit Blog Post' : 'Add New Blog Post'}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <Input
                  label="Title"
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
                  label="External URL"
                  name="externalUrl"
                  type="url"
                  value={formData.externalUrl}
                  onChange={handleInputChange}
                  required
                  placeholder="https://medium.com/@username/article-title"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Platform
                    </label>
                    <select
                      name="platform"
                      value={formData.platform}
                      onChange={handleInputChange}
                      className="input"
                      required
                    >
                      {platforms.map(platform => (
                        <option key={platform} value={platform}>
                          {platform}
                        </option>
                      ))}
                    </select>
                  </div>

                  <Input
                    label="Published Date"
                    name="publishedDate"
                    type="date"
                    value={formData.publishedDate}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <Input
                  label="Tags (comma-separated)"
                  name="tags"
                  value={formData.tags}
                  onChange={handleInputChange}
                  placeholder="React, JavaScript, Web Development"
                />

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="featured"
                    id="featured"
                    checked={formData.featured}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  <label htmlFor="featured" className="text-gray-700 dark:text-gray-300">
                    Featured Post
                  </label>
                </div>

                <div className="flex space-x-4 pt-6">
                  <Button type="submit" loading={submitting}>
                    {editingBlog ? 'Update Post' : 'Create Post'}
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

export default AdminBlog;
