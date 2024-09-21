// services/emailService.js

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD
    }
});

const sendEmail = async (to, subject, body) => {
    const mailOptions = {
        from: process.env.EMAIL_USERNAME,
        to,
        subject,
        text: body
    };

    await transporter.sendMail(mailOptions);
};

module.exports = {
    sendEmail
};
