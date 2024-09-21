// routes/meetingRoutes.js

const express = require('express');
const router = express.Router();
const meetingManager = require('../controllers/meetingManager');

// Route for scheduling a meeting
router.post('/schedule', async (req, res) => {
    const { meetingDetails, groupEmail } = req.body;
    const result = await meetingManager.scheduleMeeting(meetingDetails, groupEmail);
    res.json({ message: result });
});

module.exports = router;
