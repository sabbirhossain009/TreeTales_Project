const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
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
    type: String,
    required: true
  },
  donor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  donorName: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Indoor Plants', 'Outdoor Plants', 'Cuttings', 'Seeds', 'Accessories', 'Tools']
  },
  condition: {
    type: String,
    enum: ['New', 'Good', 'Fair'],
    default: 'Good'
  },
  location: {
    type: String,
    required: true
  },
  contactPhone: {
    type: String,
    required: true
  },
  contactEmail: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['available', 'claimed', 'completed', 'cancelled'],
    default: 'available'
  },
  claimedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  claimedAt: Date,
  completedAt: Date,
  isApproved: {
    type: Boolean,
    default: false
  },
  approvedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  approvedAt: Date,
  rejectionReason: String,
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Index for search and filtering
donationSchema.index({ category: 1, status: 1, isApproved: 1 });
donationSchema.index({ donor: 1 });
donationSchema.index({ title: 'text', description: 'text' });

module.exports = mongoose.model('Donation', donationSchema);