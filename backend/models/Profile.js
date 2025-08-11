const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  title: {
    type: String,
  },
  bio: {
    type: String,
  },
  profileImage: {
    url: String,
    public_id: String
  },
  resume: {
    url: String,
    public_id: String
  },
  socialLinks: {
    github: String,
    linkedin: String,
    twitter: String,
    instagram: String
  },
  skills: [{
    category: String,
    items: [String]
  }],
  experience: [{
    company: String,
    position: String,
    duration: String,
    description: String
  }],
  education: [{
    institution: String,
    degree: String,
    duration: String,
    description: String
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Profile', profileSchema);
