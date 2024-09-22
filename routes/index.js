const express = require('express');
const router = express.Router();

// Import other route files (for product management, market research, etc.)
const productRoutes = require('./productRoutes');
const marketRoutes = require('./marketRoutes');
const meetingRoutes = require('./meetingRoutes');

// Import the email routes file for sending test emails
const emailRoutes = require('./emailRoutes');

// Register routes with the main router
router.use('/product', productRoutes);
router.use('/market', marketRoutes);
router.use('/meeting', meetingRoutes);
router.use('/email', emailRoutes); // Add the email routes here

module.exports = router;
