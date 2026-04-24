import multer from 'multer';
import cloudinary from '../config/cloudinary.js';

// Configure multer for memory storage
const storage = multer.memoryStorage();

// Enhanced file filter to handle both images and PDFs
const fileFilter = (req, file, cb) => {
  console.log('File received:', {
    fieldname: file.fieldname,
    originalname: file.originalname,
    mimetype: file.mimetype
  });

  // Allow images for profile pictures and project images
  if (file.fieldname === 'profileImage' || file.fieldname === 'image') {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed for profile pictures and project images'), false);
    }
  }
  // Allow PDFs for resume uploads
  else if (file.fieldname === 'resume') {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed for resume uploads'), false);
    }
  }
  // Default: allow images
  else {
    if (file.mimetype.startsWith('image/') || file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only image and PDF files are allowed'), false);
    }
  }
};

export const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit (increased for PDFs)
  },
  fileFilter
});

export const uploadToCloudinary = async (buffer, folder = 'portfolio', resourceType = 'auto') => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: resourceType, // 'auto', 'image', 'video', 'raw'
        quality: resourceType === 'image' ? 'auto' : undefined,
        fetch_format: resourceType === 'image' ? 'auto' : undefined,
        // For PDFs and other documents
        flags: resourceType === 'raw' ? 'attachment' : undefined
      },
      (error, result) => {
        if (error) {
          console.error('Cloudinary upload error:', error);
          reject(error);
        } else {
          console.log('Cloudinary upload success:', {
            url: result.secure_url,
            public_id: result.public_id,
            resource_type: result.resource_type
          });
          resolve({
            url: result.secure_url,
            public_id: result.public_id
          });
        }
      }
    ).end(buffer);
  });
};

export const deleteFromCloudinary = async (publicId, resourceType = 'image') => {
  try {
    const result = await cloudinary.uploader.destroy(publicId, {
      resource_type: resourceType
    });
    console.log('Cloudinary delete result:', result);
  } catch (error) {
    console.error('Error deleting from Cloudinary:', error);
  }
};

// Helper function to determine resource type based on file
export const getResourceType = (mimetype) => {
  if (mimetype.startsWith('image/')) {
    return 'image';
  } else if (mimetype.startsWith('video/')) {
    return 'video';
  } else {
    return 'raw'; // For PDFs and other documents
  }
};
