const nodemailer = require('nodemailer');

// Nodemailer transporter configuration using Gmail
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USERNAME, // Your Gmail address from the .env file
        pass: process.env.EMAIL_PASSWORD, // App Password (for 2FA) or your Gmail password (non-2FA)
    }
});

// Function to send an email
const sendEmail = async (to, subject, body) => {
    const mailOptions = {
        from: process.env.EMAIL_USERNAME, // Sender's email address (Gmail)
        to,                               // Recipient's email address
        subject,                          // Email subject
        text: body                        // Email body text
    };

    // Send the email using Nodemailer
    result = await transporter.sendMail(mailOptions);
};

module.exports = {
    sendEmail
};
