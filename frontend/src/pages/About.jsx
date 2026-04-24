import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Download, MapPin, Calendar, Award } from 'lucide-react';
import api from '../utils/api';
import LoadingSpinner from '../components/UI/LoadingSpinner';

const About = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get('/profile');
        setProfile(response.data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="xl" />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-primary-50 to-purple-50 dark:from-dark-900 dark:to-dark-800">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-gray-100 mb-6">
              About <span className="gradient-text">Me</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Get to know more about my journey, skills, and passion for development
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Profile Image */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex justify-center"
            >
              <div className="relative">
                <div className="w-96 h-96 rounded-2xl overflow-hidden shadow-2xl">
                  <img
                    src={profile?.profileImage?.url || '/placeholder.svg?height=384&width=384&query=professional portrait'}
                    alt={profile?.name || 'Profile'}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </motion.div>

            {/* Bio Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-6"
            >
              <div className="space-y-4">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                  {profile?.name || 'Your Name'}
                </h2>
                <h3 className="text-xl text-primary-600 font-medium">
                  {profile?.title || 'MERN Stack Developer'}
                </h3>
                <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                  {profile?.bio || 'Passionate full-stack developer with expertise in MERN stack and strong problem-solving skills.'}
                </p>
              </div>

              {profile?.resume?.url && (
                <div className="pt-4">
                  <a
                    href={profile.resume.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary inline-flex items-center"
                  >
                    <Download size={20} className="mr-2" />
                    Download Resume
                  </a>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      {profile?.skills && profile.skills.length > 0 && (
        <section className="section-padding">
          <div className="container-max">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                Skills & Technologies
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Here are the technologies and tools I work with
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {profile.skills.map((skillCategory, index) => (
                <motion.div
                  key={skillCategory.category}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="card"
                >
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                    {skillCategory.category}
                  </h3>
                  <div className="space-y-3">
                    {skillCategory.items.map((skill) => (
                      <div
                        key={skill}
                        className="flex items-center justify-between p-3 bg-gray-50 dark:bg-dark-700 rounded-lg"
                      >
                        <span className="text-gray-700 dark:text-gray-300">{skill}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Experience Section */}
      {profile?.experience && profile.experience.length > 0 && (
        <section className="section-padding bg-gray-50 dark:bg-dark-800">
          <div className="container-max">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                Work Experience
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                My professional journey and key achievements
              </p>
            </motion.div>

            <div className="space-y-8">
              {profile.experience.map((exp, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="card"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                        {exp.position}
                      </h3>
                      <p className="text-yellow-400 font-medium">{exp.company}</p>
                    </div>
                    <div className="flex items-center text-gray-600 dark:text-gray-400 mt-2 md:mt-0">
                      <Calendar size={16} className="mr-2" />
                      {exp.duration}
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {exp.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Education Section */}
      {profile?.education && profile.education.length > 0 && (
        <section className="section-padding">
          <div className="container-max">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                Education
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                My academic background and qualifications
              </p>
            </motion.div>

            <div className="space-y-8">
              {profile.education.map((edu, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="card"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                        {edu.degree}
                      </h3>
                      <p className="text-yellow-400 font-medium">{edu.institution}</p>
                    </div>
                    <div className="flex items-center text-gray-600 dark:text-gray-400 mt-2 md:mt-0">
                      <Calendar size={16} className="mr-2" />
                      {edu.duration}
                    </div>
                  </div>
                  {edu.description && (
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      {edu.description}
                    </p>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default About;
