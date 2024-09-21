// routes/marketRoutes.js

const express = require('express');
const router = express.Router();
const marketResearch = require('../controllers/marketResearch');

// Route for creating a Google Form
router.post('/create-form', async (req, res) => {
    const result = await marketResearch.createMarketResearchForm(req.body);
    res.json({ message: result });
});

// Route for sending market research emails
router.post('/send-email', async (req, res) => {
    const { emailList, formLink } = req.body;
    const result = await marketResearch.sendMarketResearchEmails(emailList, formLink);
    res.json({ message: result });
});

module.exports = router;
