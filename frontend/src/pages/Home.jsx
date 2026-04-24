import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Download, Github, Linkedin, Mail, Sparkles, Zap, Code, Rocket, Star, ChevronDown, Play } from 'lucide-react';
import { motion } from 'framer-motion';
import api from '../utils/api';
import LoadingSpinner from '../components/UI/LoadingSpinner';

const Home = () => {
  const [profile, setProfile] = useState(null);
  const [featuredProjects, setFeaturedProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profileRes, projectsRes] = await Promise.all([
          api.get('/profile'),
          api.get('/projects/featured')
        ]);
        
        setProfile(profileRes.data);
        setFeaturedProjects(projectsRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center hero-bg">
        <div className="text-center">
          <LoadingSpinner size="xl" />
          <p className="mt-6 text-white text-lg">Loading amazing content...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Clean Background with Floating Elements */}
      <div className="absolute inset-0 hero-bg"></div>
      <div className="absolute inset-0 grid-overlay"></div>
      
      {/* Modern Floating Orbs */}
      <div className="floating-orb floating-orb-1"></div>
      <div className="floating-orb floating-orb-2"></div>
      <div className="floating-orb floating-orb-3"></div>

      {/* Hero Section */}
      <section className="section-padding min-h-screen flex items-center relative">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="space-y-8 z-10"
            >
              {/* Modern Greeting Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="inline-flex items-center space-x-3 px-6 py-3 rounded-full bg-white/10 backdrop-blur-xl border border-white/20"
              >
                <div className="w-2 h-2 bg-mikado-yellow rounded-full animate-pulse"></div>
                <span className="text-white font-medium">Available for opportunities</span>
              </motion.div>

              <div className="space-y-6">
                <motion.h1 
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 1 }}
                  className="hero-text"
                >
                  <span className="block text-white/90">Hi, I'm</span>
                  <span className="block gradient-text">
                    {profile?.name || 'Your Name'}
                  </span>
                </motion.h1>
                
                <motion.h2 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                  className="text-2xl md:text-4xl text-white/80 font-display font-semibold"
                >
                  {profile?.title || 'Software Developer'}
                </motion.h2>
                
                <motion.p 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.8 }}
                  className="text-xl text-white/70 leading-relaxed max-w-2xl"
                >
                  {profile?.bio || 'Passionate full-stack developer with expertise in MERN stack and strong problem-solving skills.'}
                </motion.p>
              </div>

              {/* Modern CTA Buttons */}
              <motion.div 
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.8 }}
                className="flex flex-col sm:flex-row gap-6"
              >
                <Link
                  to="/projects"
                  className="btn-primary group flex items-center justify-center"
                >
                  <Play className="mr-3 group-hover:scale-110 transition-transform" size={20} />
                  <span>View My Work</span>
                  <ArrowRight size={20} className="ml-3 group-hover:translate-x-2 transition-transform" />
                </Link>
                
                <Link
                  to="/contact"
                  className="btn-secondary group flex items-center justify-center"
                >
                  <Mail className="mr-3 group-hover:scale-110 transition-transform" size={20} />
                  <span>Get In Touch</span>
                </Link>
                
                {profile?.resume?.url && (
                  <a
                    href={profile.resume.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline group flex items-center justify-center"
                  >
                    <Download size={20} className="mr-3 group-hover:animate-bounce" />
                    <span>Resume</span>
                  </a>
                )}
              </motion.div>

              {/* Clean Social Links */}
              <motion.div 
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.8 }}
                className="flex space-x-4 pt-8"
              >
                {profile?.socialLinks?.github && (
                  <a
                    href={profile.socialLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-icon group"
                  >
                    <Github size={20} />
                  </a>
                )}
                {profile?.socialLinks?.linkedin && (
                  <a
                    href={profile.socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-icon group"
                  >
                    <Linkedin size={20} />
                  </a>
                )}
                <Link
                  to="/contact"
                  className="social-icon group"
                >
                  <Mail size={20} />
                </Link>
              </motion.div>
            </motion.div>

            {/* Modern Profile Image */}
            <motion.div
              initial={{ opacity: 0, x: 100, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="flex justify-center lg:justify-end relative"
            >
              <div className="relative group">
                {/* Clean Profile Container */}
                <div className="relative w-96 h-96 rounded-3xl overflow-hidden bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl group-hover:shadow-[0_0_50px_rgba(255,195,0,0.3)] transition-all duration-700">
                  <img
                    src={profile?.profileImage?.url || '/placeholder.svg?height=384&width=384&query=professional developer portrait'}
                    alt={profile?.name || 'Profile'}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  
                  {/* Subtle Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-rich-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
                
                {/* Modern Floating Badges */}
                <div className="absolute -top-6 -right-6 px-4 py-2 bg-mikado-yellow text-rich-black rounded-2xl font-bold text-sm shadow-lg animate-float">
                  <Code size={16} className="inline mr-2" />
                  Developer
                </div>
                <div className="absolute -bottom-6 -left-6 px-4 py-2 bg-white/10 backdrop-blur-xl text-white rounded-2xl font-medium text-sm border border-white/20 animate-float" style={{ animationDelay: '2s' }}>
                  <Star size={16} className="inline mr-2 text-mikado-yellow" />
                  Available
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Modern Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="flex flex-col items-center space-y-2 text-white/60">
            <span className="text-sm font-medium">Explore More</span>
            <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-mikado-yellow rounded-full mt-2 animate-bounce"></div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Featured Projects Section */}
      {featuredProjects.length > 0 && (
        <section className="section-padding relative">
          {/* Section Divider */}
          <div className="accent-line mb-20"></div>
          
          <div className="container-max">
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <div className="inline-flex items-center space-x-3 px-6 py-3 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 mb-8">
                <Rocket className="w-5 h-5 text-mikado-yellow" />
                <span className="text-white font-medium">Featured Work</span>
              </div>
              
              <h2 className="text-5xl md:text-7xl font-display font-black text-white mb-6">
                Selected <span className="gradient-text">Projects</span>
              </h2>
              <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
                A showcase of my recent work and creative solutions
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {featuredProjects.slice(0, 3).map((project, index) => (
                <motion.div
                  key={project._id}
                  initial={{ opacity: 0, y: 100 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="project-card group"
                >
                  <div className="relative">
                    <img
                      src={project.image?.url || '/placeholder.svg?height=300&width=400&query=modern project interface'}
                      alt={project.title}
                      className="project-image rounded-t-3xl"
                    />
                    <div className="project-overlay rounded-t-3xl"></div>
                    
                    {/* Featured Badge */}
                    <div className="absolute top-4 right-4">
                      <div className="status-featured">
                        <Star size={12} className="mr-1" />
                        Featured
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-8 space-y-6">
                    <h3 className="text-2xl font-display font-bold text-white group-hover:text-mikado-yellow transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="text-white/70 leading-relaxed">
                      {project.description}
                    </p>
                    
                    {/* Technologies */}
                    <div className="flex flex-wrap gap-3">
                      {project.technologies.slice(0, 3).map((tech) => (
                        <span key={tech} className="skill-tag">
                          {tech}
                        </span>
                      ))}
                    </div>
                    
                    {/* Project Links */}
                    <div className="flex space-x-4 pt-4">
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 text-white/80 hover:text-mikado-yellow transition-colors duration-300 group"
                      >
                        <Github size={20} />
                        <span>Code</span>
                      </a>
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center space-x-2 text-white/80 hover:text-mikado-yellow transition-colors duration-300 group"
                        >
                          <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                          <span>Live Demo</span>
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
              className="text-center mt-16"
            >
              <Link
                to="/projects"
                className="btn-outline group inline-flex items-center"
              >
                <span>View All Projects</span>
                <ArrowRight size={20} className="ml-3 group-hover:translate-x-2 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </section>
      )}

      {/* Skills Preview Section */}
      {profile?.skills && profile.skills.length > 0 && (
        <section className="section-padding relative">
          {/* Section Divider */}
          <div className="accent-line mb-20"></div>
          
          <div className="container-max">
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <div className="inline-flex items-center space-x-3 px-6 py-3 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 mb-8">
                <Code className="w-5 h-5 text-mikado-yellow" />
                <span className="text-white font-medium">Tech Stack</span>
              </div>
              
              <h2 className="text-5xl md:text-7xl font-display font-black text-white mb-6">
                Skills & <span className="gradient-text">Expertise</span>
              </h2>
              <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
                Technologies and tools I use to build amazing experiences
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {profile.skills.map((skillCategory, index) => (
                <motion.div
                  key={skillCategory.category}
                  initial={{ opacity: 0, y: 100 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="card text-center group"
                >
                  <div className="mb-8">
                    <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-mikado-yellow to-gold flex items-center justify-center shadow-lg">
                      <Code className="w-8 h-8 text-rich-black" />
                    </div>
                    <h3 className="text-2xl font-display font-bold text-white mb-6 group-hover:text-mikado-yellow transition-colors duration-300">
                      {skillCategory.category}
                    </h3>
                  </div>
                  
                  <div className="flex flex-wrap justify-center gap-3">
                    {skillCategory.items.map((skill) => (
                      <span key={skill} className="skill-tag">
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
              className="text-center mt-16"
            >
              <Link
                to="/about"
                className="btn-primary group inline-flex items-center"
              >
                <Sparkles className="mr-3 group-hover:animate-spin" size={20} />
                <span>Learn More About Me</span>
                <ArrowRight size={20} className="ml-3 group-hover:translate-x-2 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Home;
