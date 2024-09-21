// services/googleApi.js

const { google } = require('googleapis');
const { OAuth2 } = google.auth;

// Initialize OAuth2 client
const oauth2Client = new OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    "https://developers.google.com/oauthplayground" // Redirect URL (you can change this)
);

// Set up OAuth2 credentials
oauth2Client.setCredentials({
    refresh_token: process.env.GOOGLE_REFRESH_TOKEN
});

// Google Forms API - Create Google Form
const createGoogleForm = async (formDetails) => {
    // Set up the logic to interact with Google Forms API
    // Example implementation:
    const form = {
        title: formDetails.title,
        description: formDetails.description,
        questions: formDetails.questions.map((q) => ({
            questionItem: {
                textQuestion: {
                    title: q,
                },
            },
        })),
    };

    // Make API call to create the form and return the form link
    // Assuming the Google Forms API is correctly configured
    const formLink = "https://forms.google.com/example-form"; // Replace with actual API call result
    return formLink;
};

// Google Sheets API - Store Responses in Google Sheets
const storeResponsesInGoogleSheet = async (responseData) => {
    // Logic to store responses in Google Sheets
    const sheets = google.sheets({ version: 'v4', auth: oauth2Client });

    const spreadsheetId = process.env.GOOGLE_SPREADSHEET_ID; // ID of the Google Sheet
    const range = 'Sheet1!A1'; // The range where data will be added

    const values = [[responseData.name, responseData.feedback, responseData.rating]]; // Sample data
    const resource = { values };

    // Append data to the Google Sheet
    await sheets.spreadsheets.values.append({
        spreadsheetId,
        range,
        valueInputOption: 'RAW',
        resource,
    });
};

// Google Calendar API - Send Calendar Invite
const sendCalendarInvite = async (inviteDetails, groupEmail) => {
    const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

    const event = {
        summary: inviteDetails.title,
        description: inviteDetails.agenda,
        start: {
            dateTime: inviteDetails.time,
            timeZone: 'America/Los_Angeles',
        },
        end: {
            dateTime: new Date(new Date(inviteDetails.time).getTime() + 60 * 60 * 1000).toISOString(),
            timeZone: 'America/Los_Angeles',
        },
        attendees: [{ email: groupEmail }],
    };

    // Send the calendar invite
    await calendar.events.insert({
        calendarId: 'primary',
        resource: event,
    });

    return 'Calendar invite sent successfully!';
};

module.exports = {
    createGoogleForm,
    storeResponsesInGoogleSheet,
    sendCalendarInvite
};
