const express = require('express');
const Donation = require('../models/Donation');
const auth = require('../middleware/auth');

const router = express.Router();

// Get all donations with filtering
router.get('/', async (req, res) => {
  try {
    const {
      search,
      category,
      status = 'available',
      page = 1,
      limit = 12
    } = req.query;

    let query = { isApproved: true, isActive: true };

    // Search functionality
    if (search) {
      query.$text = { $search: search };
    }

    // Category filter
    if (category && category !== 'all') {
      query.category = category;
    }

    // Status filter
    if (status && status !== 'all') {
      query.status = status;
    }

    const donations = await Donation.find(query)
      .populate('donor', 'name')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Donation.countDocuments(query);

    res.json({
      donations,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    console.error('Get donations error:', error);
    res.status(500).json({ message: 'Server error while fetching donations' });
  }
});

// Create donation
router.post('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const donationData = {
      ...req.body,
      donor: req.userId,
      donorName: user.name
    };

    const donation = new Donation(donationData);
    await donation.save();

    res.status(201).json({
      message: 'Donation created successfully. Awaiting admin approval.',
      donation
    });
  } catch (error) {
    console.error('Create donation error:', error);
    res.status(500).json({ message: 'Server error while creating donation' });
  }
});

// Get user's donations
router.get('/my-donations', auth, async (req, res) => {
  try {
    const donations = await Donation.find({ donor: req.userId })
      .populate('claimedBy', 'name email phone')
      .sort({ createdAt: -1 });

    res.json(donations);
  } catch (error) {
    console.error('Get user donations error:', error);
    res.status(500).json({ message: 'Server error while fetching user donations' });
  }
});

// Claim donation
router.put('/:id/claim', auth, async (req, res) => {
  try {
    const donation = await Donation.findById(req.params.id);
    if (!donation) {
      return res.status(404).json({ message: 'Donation not found' });
    }

    if (donation.status !== 'available') {
      return res.status(400).json({ message: 'Donation is not available for claiming' });
    }

    if (donation.donor.toString() === req.userId) {
      return res.status(400).json({ message: 'Cannot claim your own donation' });
    }

    const updatedDonation = await Donation.findByIdAndUpdate(
      req.params.id,
      {
        status: 'claimed',
        claimedBy: req.userId,
        claimedAt: new Date()
      },
      { new: true }
    ).populate('claimedBy', 'name email phone');

    res.json({
      message: 'Donation claimed successfully',
      donation: updatedDonation
    });
  } catch (error) {
    console.error('Claim donation error:', error);
    res.status(500).json({ message: 'Server error while claiming donation' });
  }
});

// Approve donation (admin only)
router.put('/:id/approve', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user || user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Admin only.' });
    }

    const updatedDonation = await Donation.findByIdAndUpdate(
      req.params.id,
      {
        isApproved: true,
        approvedBy: req.userId,
        approvedAt: new Date()
      },
      { new: true }
    );

    if (!updatedDonation) {
      return res.status(404).json({ message: 'Donation not found' });
    }

    res.json({
      message: 'Donation approved successfully',
      donation: updatedDonation
    });
  } catch (error) {
    console.error('Approve donation error:', error);
    res.status(500).json({ message: 'Server error while approving donation' });
  }
});

module.exports = router;