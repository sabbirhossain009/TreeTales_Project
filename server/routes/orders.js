const express = require('express');
const Order = require('../models/Order');
const Product = require('../models/Product');
const auth = require('../middleware/auth');

const router = express.Router();

// Create new order
router.post('/', auth, async (req, res) => {
  try {
    const { items, shippingAddress, paymentMethod, notes } = req.body;

    // Validate items and calculate total
    let totalAmount = 0;
    const orderItems = [];

    for (const item of items) {
      const product = await Product.findById(item.productId);
      if (!product || !product.inStock || product.stockCount < item.quantity) {
        return res.status(400).json({ 
          message: `Product ${product?.name || 'unknown'} is not available in requested quantity` 
        });
      }

      const orderItem = {
        product: product._id,
        productName: product.name,
        productImage: product.images[0],
        quantity: item.quantity,
        price: product.price,
        seller: product.seller,
        sellerName: product.sellerName
      };

      orderItems.push(orderItem);
      totalAmount += product.price * item.quantity;
    }

    // Calculate shipping cost
    const shippingCost = totalAmount > 1000 ? 0 : 50;
    const finalAmount = totalAmount + shippingCost;

    // Create order
    const order = new Order({
      buyer: req.userId,
      items: orderItems,
      totalAmount,
      shippingCost,
      finalAmount,
      paymentMethod,
      shippingAddress,
      notes
    });

    await order.save();

    // Update product stock
    for (const item of items) {
      await Product.findByIdAndUpdate(item.productId, {
        $inc: { stockCount: -item.quantity }
      });
    }

    await order.populate('buyer', 'name email phone');

    res.status(201).json({
      message: 'Order created successfully',
      order
    });
  } catch (error) {
    console.error('Create order error:', error);
    res.status(500).json({ message: 'Server error while creating order' });
  }
});

// Get user orders
router.get('/my-orders', auth, async (req, res) => {
  try {
    const { page = 1, limit = 10, status } = req.query;

    let query = { buyer: req.userId };
    if (status && status !== 'all') {
      query.orderStatus = status;
    }

    const orders = await Order.find(query)
      .populate('items.product', 'name images')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Order.countDocuments(query);

    res.json({
      orders,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    console.error('Get orders error:', error);
    res.status(500).json({ message: 'Server error while fetching orders' });
  }
});

// Get single order
router.get('/:id', auth, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('buyer', 'name email phone')
      .populate('items.product', 'name images')
      .populate('items.seller', 'name email phone');

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Check if user has access to this order
    const user = await User.findById(req.userId);
    const hasAccess = order.buyer._id.toString() === req.userId ||
                     user.role === 'admin' ||
                     order.items.some(item => item.seller._id.toString() === req.userId);

    if (!hasAccess) {
      return res.status(403).json({ message: 'Access denied' });
    }

    res.json(order);
  } catch (error) {
    console.error('Get order error:', error);
    res.status(500).json({ message: 'Server error while fetching order' });
  }
});

// Update order status (admin or seller only)
router.put('/:id/status', auth, async (req, res) => {
  try {
    const { status, trackingNumber, estimatedDelivery } = req.body;

    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    const user = await User.findById(req.userId);
    const hasAccess = user.role === 'admin' ||
                     order.items.some(item => item.seller.toString() === req.userId);

    if (!hasAccess) {
      return res.status(403).json({ message: 'Access denied' });
    }

    const updateData = { orderStatus: status };
    if (trackingNumber) updateData.trackingNumber = trackingNumber;
    if (estimatedDelivery) updateData.estimatedDelivery = estimatedDelivery;
    if (status === 'delivered') updateData.deliveredAt = new Date();

    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.json({
      message: 'Order status updated successfully',
      order: updatedOrder
    });
  } catch (error) {
    console.error('Update order status error:', error);
    res.status(500).json({ message: 'Server error while updating order status' });
  }
});

// Cancel order (buyer only, before shipping)
router.put('/:id/cancel', auth, async (req, res) => {
  try {
    const { reason } = req.body;

    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    if (order.buyer.toString() !== req.userId) {
      return res.status(403).json({ message: 'Access denied' });
    }

    if (['shipped', 'delivered'].includes(order.orderStatus)) {
      return res.status(400).json({ message: 'Cannot cancel order after shipping' });
    }

    // Restore product stock
    for (const item of order.items) {
      await Product.findByIdAndUpdate(item.product, {
        $inc: { stockCount: item.quantity }
      });
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      {
        orderStatus: 'cancelled',
        cancelledAt: new Date(),
        cancellationReason: reason
      },
      { new: true }
    );

    res.json({
      message: 'Order cancelled successfully',
      order: updatedOrder
    });
  } catch (error) {
    console.error('Cancel order error:', error);
    res.status(500).json({ message: 'Server error while cancelling order' });
  }
});

module.exports = router;