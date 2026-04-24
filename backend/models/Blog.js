import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  externalUrl: {
    type: String,
    required: true
  },
  platform: {
    type: String,
    enum: ['Medium', 'Dev.to', 'Hashnode', 'Personal', 'Other'],
    required: true
  },
  publishedDate: {
    type: Date,
    required: true
  },
  tags: [String],
  featured: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

export default mongoose.model('Blog', blogSchema);
