import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, FolderOpen, MessageSquare, Award, TrendingUp, Calendar, Eye, Star } from 'lucide-react';
import api from '../../utils/api';
import LoadingSpinner from '../../components/UI/LoadingSpinner';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    projects: 0,
    contacts: 0,
    featuredProjects: 0,
    unreadContacts: 0
  });
  const [recentContacts, setRecentContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [projectsRes, contactsRes] = await Promise.all([
          api.get('/projects'),
          api.get('/contact')
        ]);

        const projects = projectsRes.data;
        const contacts = contactsRes.data;

        setStats({
          projects: projects.length,
          contacts: contacts.length,
          featuredProjects: projects.filter(p => p.featured).length,
          unreadContacts: contacts.filter(c => !c.isRead).length
        });

        setRecentContacts(contacts.slice(0, 5));
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const statCards = [
    {
      title: 'Total Projects',
      value: stats.projects,
      icon: FolderOpen,
      color: 'bg-blue-500',
      change: '+2 this month'
    },
    {
      title: 'Contact Messages',
      value: stats.contacts,
      icon: MessageSquare,
      color: 'bg-green-500',
      change: `${stats.unreadContacts} unread`
    },
    {
      title: 'Featured Projects',
      value: stats.featuredProjects,
      icon: Star,
      color: 'bg-yellow-500',
      change: 'Highlighted work'
    },
    {
      title: 'Profile Views',
      value: '1.2k',
      icon: Eye,
      color: 'bg-purple-500',
      change: '+15% this week'
    }
  ];

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
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Admin Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Welcome back! Here's what's happening with your portfolio.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="card"
            >
              <div className="flex items-center">
                <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                  <stat.icon className="text-white" size={24} />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    {stat.value}
                  </p>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {stat.change}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Contacts */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="card"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                Recent Messages
              </h2>
              <MessageSquare className="text-gray-400" size={20} />
            </div>
            
            <div className="space-y-4">
              {recentContacts.length > 0 ? (
                recentContacts.map((contact) => (
                  <div
                    key={contact._id}
                    className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-dark-700 rounded-lg"
                  >
                    <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-medium">
                        {contact.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                          {contact.name}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {new Date(contact.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                        {contact.message}
                      </p>
                      {!contact.isRead && (
                        <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mt-1"></span>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 dark:text-gray-400 text-center py-4">
                  No messages yet
                </p>
              )}
            </div>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="card"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                Quick Actions
              </h2>
              <TrendingUp className="text-gray-400" size={20} />
            </div>
            
            <div className="space-y-3">
              <Link
                to="/admin/projects"
                className="block p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
              >
                <div className="flex items-center">
                  <FolderOpen className="text-blue-600" size={20} />
                  <span className="ml-3 text-gray-900 dark:text-gray-100 font-medium">
                    Manage Projects
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 ml-8">
                  Add, edit, or delete your projects
                </p>
              </Link>

              <Link
                to="/admin/profile"
                className="block p-4 bg-green-50 dark:bg-green-900/20 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors"
              >
                <div className="flex items-center">
                  <Users className="text-green-600" size={20} />
                  <span className="ml-3 text-gray-900 dark:text-gray-100 font-medium">
                    Update Profile
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 ml-8">
                  Edit your personal information
                </p>
              </Link>

              <Link
                to="/admin/contacts"
                className="block p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors"
              >
                <div className="flex items-center">
                  <MessageSquare className="text-purple-600" size={20} />
                  <span className="ml-3 text-gray-900 dark:text-gray-100 font-medium">
                    View Messages
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 ml-8">
                  Respond to contact inquiries
                </p>
              </Link>

              <Link
                to="/admin/dsa"
                className="block p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg hover:bg-yellow-100 dark:hover:bg-yellow-900/30 transition-colors"
              >
                <div className="flex items-center">
                  <Award className="text-yellow-600" size={20} />
                  <span className="ml-3 text-gray-900 dark:text-gray-100 font-medium">
                    DSA Profiles
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 ml-8">
                  Update coding platform stats
                </p>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
