import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Award, Target, Calendar, ExternalLink } from 'lucide-react';
import api from '../utils/api';
import LoadingSpinner from '../components/UI/LoadingSpinner';

const DSA = () => {
  const [dsaData, setDsaData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDSAData = async () => {
      try {
        const response = await api.get('/dsa');
        setDsaData(response.data);
      } catch (error) {
        console.error('Error fetching DSA data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDSAData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="xl" />
      </div>
    );
  }

  const platforms = [
    {
      name: 'LeetCode',
      data: dsaData?.leetcode,
      color: 'bg-orange-500',
      url: dsaData?.leetcode?.username ? `https://leetcode.com/${dsaData.leetcode.username}` : null
    },
    {
      name: 'Codeforces',
      data: dsaData?.codeforces,
      color: 'bg-blue-500',
      url: dsaData?.codeforces?.username ? `https://codeforces.com/profile/${dsaData.codeforces.username}` : null
    },
    {
      name: 'CodeChef',
      data: dsaData?.codechef,
      color: 'bg-brown-500',
      url: dsaData?.codechef?.username ? `https://codechef.com/users/${dsaData.codechef.username}` : null
    }
  ];

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
              DSA & <span className="gradient-text">Competitive Programming</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              My journey in Data Structures, Algorithms, and Competitive Programming across various platforms
            </p>
          </motion.div>
        </div>
      </section>

      {/* Platform Stats */}
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
              Platform Statistics
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              My performance and achievements across different coding platforms
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {platforms.map((platform, index) => (
              <motion.div
                key={platform.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="card text-center"
              >
                <div className={`w-16 h-16 ${platform.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <Trophy className="text-white" size={32} />
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                  {platform.name}
                </h3>

                {platform.data && Object.keys(platform.data).length > 0 ? (
                  <div className="space-y-3">
                    {platform.name === 'LeetCode' && (
                      <>
                        {platform.data.username && (
                          <p className="text-gray-600 dark:text-gray-400">
                            <strong>Username:</strong> {platform.data.username}
                          </p>
                        )}
                        {platform.data.solved && (
                          <p className="text-gray-600 dark:text-gray-400">
                            <strong>Problems Solved:</strong> {platform.data.solved}
                          </p>
                        )}
                        {platform.data.ranking && (
                          <p className="text-gray-600 dark:text-gray-400">
                            <strong>Ranking:</strong> {platform.data.ranking}
                          </p>
                        )}
                        {platform.data.badges && platform.data.badges.length > 0 && (
                          <div>
                            <p className="text-gray-600 dark:text-gray-400 mb-2">
                              <strong>Badges:</strong>
                            </p>
                            <div className="flex flex-wrap justify-center gap-2">
                              {platform.data.badges.map((badge, idx) => (
                                <span
                                  key={idx}
                                  className="px-2 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 rounded-full text-sm"
                                >
                                  {badge}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </>
                    )}

                    {platform.name === 'Codeforces' && (
                      <>
                        {platform.data.username && (
                          <p className="text-gray-600 dark:text-gray-400">
                            <strong>Username:</strong> {platform.data.username}
                          </p>
                        )}
                        {platform.data.rating && (
                          <p className="text-gray-600 dark:text-gray-400">
                            <strong>Current Rating:</strong> {platform.data.rating}
                          </p>
                        )}
                        {platform.data.maxRating && (
                          <p className="text-gray-600 dark:text-gray-400">
                            <strong>Max Rating:</strong> {platform.data.maxRating}
                          </p>
                        )}
                        {platform.data.rank && (
                          <p className="text-gray-600 dark:text-gray-400">
                            <strong>Rank:</strong> {platform.data.rank}
                          </p>
                        )}
                      </>
                    )}

                    {platform.name === 'CodeChef' && (
                      <>
                        {platform.data.username && (
                          <p className="text-gray-600 dark:text-gray-400">
                            <strong>Username:</strong> {platform.data.username}
                          </p>
                        )}
                        {platform.data.rating && (
                          <p className="text-gray-600 dark:text-gray-400">
                            <strong>Rating:</strong> {platform.data.rating}
                          </p>
                        )}
                        {platform.data.stars && (
                          <p className="text-gray-600 dark:text-gray-400">
                            <strong>Stars:</strong> {platform.data.stars}⭐
                          </p>
                        )}
                        {platform.data.globalRank && (
                          <p className="text-gray-600 dark:text-gray-400">
                            <strong>Global Rank:</strong> {platform.data.globalRank}
                          </p>
                        )}
                      </>
                    )}

                    {platform.url && (
                      <div className="pt-4">
                        <a
                          href={platform.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-outline inline-flex items-center"
                        >
                          <ExternalLink size={16} className="mr-2" />
                          View Profile
                        </a>
                      </div>
                    )}
                  </div>
                ) : (
                  <p className="text-gray-500 dark:text-gray-400">
                    Profile not configured yet
                  </p>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      {dsaData?.achievements && dsaData.achievements.length > 0 && (
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
                Achievements & Milestones
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Notable achievements and milestones in my competitive programming journey
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {dsaData.achievements.map((achievement, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="card"
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center">
                        <Award className="text-white" size={24} />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                        {achievement.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-3">
                        {achievement.description}
                      </p>
                      <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                        <span className="flex items-center">
                          <Target size={16} className="mr-1" />
                          {achievement.platform}
                        </span>
                        <span className="flex items-center">
                          <Calendar size={16} className="mr-1" />
                          {new Date(achievement.date).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Problem Solving Approach */}
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
              Problem Solving Approach
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              My methodology for tackling complex algorithmic problems
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: '01',
                title: 'Understand',
                description: 'Carefully read and understand the problem statement, identify constraints and edge cases.'
              },
              {
                step: '02',
                title: 'Plan',
                description: 'Think about different approaches, analyze time and space complexity before coding.'
              },
              {
                step: '03',
                title: 'Implement',
                description: 'Write clean, efficient code with proper variable names and comments.'
              },
              {
                step: '04',
                title: 'Test',
                description: 'Test with sample inputs, edge cases, and optimize if necessary.'
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default DSA;
