const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  originalPrice: {
    type: Number,
    min: 0
  },
  images: [{
    type: String,
    required: true
  }],
  category: {
    type: String,
    required: true,
    enum: ['Indoor Plants', 'Outdoor Plants', 'Flowering Plants', 'Hanging Plants', 'Succulents', 'Tools', 'Accessories']
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  sellerName: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  difficulty: {
    type: String,
    enum: ['Easy', 'Medium', 'Hard'],
    default: 'Easy'
  },
  lightRequirement: {
    type: String,
    enum: ['Low', 'Medium', 'High'],
    default: 'Medium'
  },
  waterFrequency: {
    type: String,
    default: 'Weekly'
  },
  temperature: {
    type: String,
    default: '18-24°C'
  },
  humidity: {
    type: String,
    default: '40-60%'
  },
  careInstructions: [{
    type: String
  }],
  benefits: [{
    type: String
  }],
  stockCount: {
    type: Number,
    required: true,
    min: 0,
    default: 1
  },
  inStock: {
    type: Boolean,
    default: true
  },
  featured: {
    type: Boolean,
    default: false
  },
  isApproved: {
    type: Boolean,
    default: false
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  reviewCount: {
    type: Number,
    default: 0
  },
  tags: [{
    type: String,
    trim: true
  }],
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Index for search functionality
productSchema.index({ name: 'text', description: 'text', tags: 'text' });
productSchema.index({ category: 1, isApproved: 1, isActive: 1 });
productSchema.index({ seller: 1 });

module.exports = mongoose.model('Product', productSchema);