import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  bio: {
    type: String,
    required: true
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

export default mongoose.model('Profile', profileSchema);
