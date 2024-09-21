// routes/index.js

const express = require('express');
const router = express.Router();

const productRoutes = require('./productRoutes');
const marketRoutes = require('./marketRoutes');
const meetingRoutes = require('./meetingRoutes');

// Product management routes
router.use('/product', productRoutes);

// Market research routes
router.use('/market', marketRoutes);

// Meeting management routes
router.use('/meeting', meetingRoutes);

module.exports = router;
