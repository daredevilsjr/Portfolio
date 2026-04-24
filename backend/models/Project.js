import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    url: String,
    public_id: String
  },
  technologies: [{
    type: String,
    required: true
  }],
  githubUrl: {
    type: String,
    required: true
  },
  liveUrl: {
    type: String
  },
  featured: {
    type: Boolean,
    default: false
  },
  order: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

export default mongoose.model('Project', projectSchema);
