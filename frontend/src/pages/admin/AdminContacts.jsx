import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, Trash2, Eye, Calendar, User } from 'lucide-react';
import api from '../../utils/api';
import { showToast } from '../../utils/toast';
import Button from '../../components/UI/Button';
import LoadingSpinner from '../../components/UI/LoadingSpinner';

const AdminContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedContact, setSelectedContact] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await api.get('/contact');
      setContacts(response.data);
    } catch (error) {
      console.error('Error fetching contacts:', error);
      showToast.error('Failed to fetch contact messages');
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (contactId) => {
    try {
      await api.put(`/contact/${contactId}/read`);
      setContacts(prev => 
        prev.map(contact => 
          contact._id === contactId 
            ? { ...contact, isRead: true }
            : contact
        )
      );
      showToast.success('Message marked as read');
    } catch (error) {
      console.error('Error marking as read:', error);
      showToast.error('Failed to mark message as read');
    }
  };

  const deleteContact = async (contactId) => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      try {
        await api.delete(`/contact/${contactId}`);
        setContacts(prev => prev.filter(contact => contact._id !== contactId));
        showToast.success('Message deleted successfully');
        if (selectedContact && selectedContact._id === contactId) {
          setShowModal(false);
          setSelectedContact(null);
        }
      } catch (error) {
        console.error('Error deleting contact:', error);
        showToast.error('Failed to delete message');
      }
    }
  };

  const openModal = async (contact) => {
    setSelectedContact(contact);
    setShowModal(true);
    
    // Mark as read when opened
    if (!contact.isRead) {
      await markAsRead(contact._id);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedContact(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="xl" />
      </div>
    );
  }

  const unreadCount = contacts.filter(contact => !contact.isRead).length;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-900">
      {/* Header */}
      <div className="bg-white dark:bg-dark-800 shadow-sm border-b border-gray-200 dark:border-dark-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                Contact Messages
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Manage and respond to contact form submissions
                {unreadCount > 0 && (
                  <span className="ml-2 px-2 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-full text-sm">
                    {unreadCount} unread
                  </span>
                )}
              </p>
            </div>
            <Mail className="text-primary-600" size={32} />
          </div>
        </div>
      </div>

      {/* Messages List */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {contacts.length === 0 ? (
          <div className="text-center py-16">
            <Mail className="mx-auto text-gray-400 mb-4" size={64} />
            <p className="text-xl text-gray-600 dark:text-gray-400">
              No messages yet
            </p>
            <p className="text-gray-500 dark:text-gray-500 mt-2">
              Contact form submissions will appear here
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {contacts.map((contact, index) => (
              <motion.div
                key={contact._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`card cursor-pointer hover:shadow-lg transition-all duration-200 ${
                  !contact.isRead 
                    ? 'border-l-4 border-l-blue-500 bg-blue-50 dark:bg-blue-900/10' 
                    : ''
                }`}
                onClick={() => openModal(contact)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-medium">
                        {contact.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                          {contact.name}
                        </h3>
                        <div className="flex items-center space-x-2">
                          {!contact.isRead && (
                            <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
                          )}
                          <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                            <Calendar size={14} className="mr-1" />
                            {new Date(contact.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      
                      <p className="text-gray-600 dark:text-gray-400 mb-2">
                        {contact.email}
                      </p>
                      
                      <p className="text-gray-700 dark:text-gray-300 line-clamp-2">
                        {contact.message}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 ml-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        openModal(contact);
                      }}
                    >
                      <Eye size={16} />
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteContact(contact._id);
                      }}
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Message Detail Modal */}
      {showModal && selectedContact && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-dark-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  Message Details
                </h2>
                <Button variant="ghost" onClick={closeModal}>
                  ×
                </Button>
              </div>

              {/* Contact Info */}
              <div className="space-y-4 mb-6">
                <div className="flex items-center space-x-3">
                  <User className="text-gray-400" size={20} />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-gray-100">
                      {selectedContact.name}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Name
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Mail className="text-gray-400" size={20} />
                  <div>
                    <a
                      href={`mailto:${selectedContact.email}`}
                      className="font-medium text-primary-600 hover:text-primary-700"
                    >
                      {selectedContact.email}
                    </a>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Email
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Calendar className="text-gray-400" size={20} />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-gray-100">
                      {new Date(selectedContact.createdAt).toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Received
                    </p>
                  </div>
                </div>
              </div>

              {/* Message */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
                  Message
                </h3>
                <div className="bg-gray-50 dark:bg-dark-700 rounded-lg p-4">
                  <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                    {selectedContact.message}
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex space-x-4">
                <a
                  href={`mailto:${selectedContact.email}?subject=Re: Your message&body=Hi ${selectedContact.name},%0D%0A%0D%0AThank you for your message. `}
                  className="btn-primary inline-flex items-center"
                >
                  <Mail size={16} className="mr-2" />
                  Reply via Email
                </a>
                <Button
                  variant="danger"
                  onClick={() => deleteContact(selectedContact._id)}
                >
                  <Trash2 size={16} className="mr-2" />
                  Delete Message
                </Button>
                <Button variant="secondary" onClick={closeModal}>
                  Close
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminContacts;
