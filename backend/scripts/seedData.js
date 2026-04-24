import mongoose from 'mongoose';
import Profile from '../models/Profile.js';
import Project from '../models/Project.js';
import DSA from '../models/DSA.js';
import Blog from '../models/Blog.js';
import dotenv from 'dotenv';

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Seed Profile Data
    const existingProfile = await Profile.findOne();
    if (!existingProfile) {
      const profileData = {
        name: 'Your Name',
        title: 'MERN Stack Developer & Problem Solver',
        bio: 'Passionate full-stack developer with expertise in MERN stack and strong problem-solving skills. I love creating efficient, scalable web applications and solving complex algorithmic challenges.',
        socialLinks: {
          github: 'https://github.com/yourusername',
          linkedin: 'https://linkedin.com/in/yourusername',
          twitter: 'https://twitter.com/yourusername',
          instagram: 'https://instagram.com/yourusername'
        },
        skills: [
          {
            category: 'Frontend',
            items: ['React.js', 'JavaScript', 'TypeScript', 'HTML5', 'CSS3', 'Tailwind CSS', 'Next.js']
          },
          {
            category: 'Backend',
            items: ['Node.js', 'Express.js', 'MongoDB', 'PostgreSQL', 'REST APIs', 'GraphQL']
          },
          {
            category: 'Tools & Others',
            items: ['Git', 'Docker', 'AWS', 'Vercel', 'Postman', 'VS Code']
          }
        ],
        experience: [
          {
            company: 'Tech Company',
            position: 'Full Stack Developer',
            duration: '2023 - Present',
            description: 'Developing and maintaining web applications using MERN stack. Collaborated with cross-functional teams to deliver high-quality software solutions.'
          }
        ],
        education: [
          {
            institution: 'Your University',
            degree: 'Bachelor of Technology in Computer Science',
            duration: '2019 - 2023',
            description: 'Focused on software engineering, data structures, algorithms, and web development.'
          }
        ]
      };

      await Profile.create(profileData);
      console.log('Profile data seeded successfully');
    }

    // Seed Sample Projects
    const existingProjects = await Project.find();
    if (existingProjects.length === 0) {
      const projectsData = [
        {
          title: 'E-Commerce Platform',
          description: 'A full-featured e-commerce platform built with MERN stack, featuring user authentication, product management, shopping cart, and payment integration.',
          technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'Stripe'],
          githubUrl: 'https://github.com/yourusername/ecommerce-platform',
          liveUrl: 'https://your-ecommerce-demo.vercel.app',
          featured: true,
          order: 1
        },
        {
          title: 'Task Management App',
          description: 'A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.',
          technologies: ['React', 'Node.js', 'Socket.io', 'MongoDB', 'Tailwind CSS'],
          githubUrl: 'https://github.com/yourusername/task-manager',
          liveUrl: 'https://your-task-manager.vercel.app',
          featured: true,
          order: 2
        },
        {
          title: 'Weather Dashboard',
          description: 'A responsive weather dashboard that displays current weather conditions and forecasts for multiple cities with beautiful visualizations.',
          technologies: ['React', 'OpenWeather API', 'Chart.js', 'CSS3'],
          githubUrl: 'https://github.com/yourusername/weather-dashboard',
          liveUrl: 'https://your-weather-app.vercel.app',
          featured: false,
          order: 3
        }
      ];

      await Project.insertMany(projectsData);
      console.log('Sample projects seeded successfully');
    }

    // Seed DSA Data
    const existingDSA = await DSA.findOne();
    if (!existingDSA) {
      const dsaData = {
        leetcode: {
          username: 'yourusername',
          solved: 250,
          ranking: 150000,
          badges: ['50 Days Badge', '100 Days Badge']
        },
        codeforces: {
          username: 'yourusername',
          rating: 1200,
          maxRating: 1350,
          rank: 'Pupil'
        },
        codechef: {
          username: 'yourusername',
          rating: 1400,
          stars: 2,
          globalRank: 50000
        },
        achievements: [
          {
            title: 'First Contest Participation',
            description: 'Participated in my first competitive programming contest',
            date: new Date('2023-01-15'),
            platform: 'Codeforces'
          },
          {
            title: '100 Problems Solved',
            description: 'Solved 100 problems on LeetCode',
            date: new Date('2023-03-20'),
            platform: 'LeetCode'
          }
        ]
      };

      await DSA.create(dsaData);
      console.log('DSA data seeded successfully');
    }

    // Seed Sample Blog Posts
    const existingBlogs = await Blog.find();
    if (existingBlogs.length === 0) {
      const blogsData = [
        {
          title: 'Getting Started with MERN Stack Development',
          description: 'A comprehensive guide to building full-stack applications with MongoDB, Express, React, and Node.js',
          externalUrl: 'https://medium.com/@yourusername/mern-stack-guide',
          platform: 'Medium',
          publishedDate: new Date('2023-06-15'),
          tags: ['MERN', 'React', 'Node.js', 'MongoDB'],
          featured: true
        },
        {
          title: 'Mastering Data Structures and Algorithms',
          description: 'Tips and strategies for improving your problem-solving skills in competitive programming',
          externalUrl: 'https://dev.to/yourusername/dsa-mastery',
          platform: 'Dev.to',
          publishedDate: new Date('2023-07-20'),
          tags: ['DSA', 'Algorithms', 'Problem Solving'],
          featured: false
        }
      ];

      await Blog.insertMany(blogsData);
      console.log('Sample blog posts seeded successfully');
    }

    console.log('All sample data seeded successfully!');

  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
};

seedData();
