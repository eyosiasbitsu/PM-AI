// routes/marketRoutes.js

const express = require('express');
const router = express.Router();
const marketResearch = require('../controllers/marketResearch');

// Route for creating Google Form and adding questions
router.post('/market-research/create-form', marketResearch.createMarketResearchForm);

// Route for sending market research emails
router.post('/send-email', marketResearch.sendMarketResearchEmails);

module.exports = router;
