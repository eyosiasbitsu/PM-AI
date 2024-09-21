// controllers/meetingManager.js

const googleApi = require('../services/googleApi');

const scheduleMeeting = async (meetingDetails, groupEmail) => {
    const { title, time, agenda } = meetingDetails;
    await googleApi.sendCalendarInvite({ title, time, agenda }, groupEmail);
    return 'Meeting invite sent successfully!';
};

module.exports = {
    scheduleMeeting
};
