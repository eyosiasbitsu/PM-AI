const express = require('express');
const router = express.Router();
const emailService = require('../services/emailService');

// Test route for sending an email
router.post('/send-test-email', async (req, res) => {
    try {
        const { to, subject, body } = req.body; // Retrieve email details from the request body
        await emailService.sendEmail(to, subject, body); // Call email service to send email
        res.status(200).json({ message: 'Email sent successfully!' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to send email', error: error.message });
    }
});

module.exports = router;
