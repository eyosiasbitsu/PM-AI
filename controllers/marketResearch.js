// controllers/marketResearch.js

const googleApi = require('../services/googleApi');
const emailService = require('../services/emailService');

const createMarketResearchForm = async (context) => {
    const formDetails = {
        title: 'Market Research Form',
        description: `Form to gather market feedback for ${context.productName}`,
        questions: context.questions
    };

    const formLink = await googleApi.createGoogleForm(formDetails);
    return `Market research form created! You can share the form at: ${formLink}`;
};

const sendMarketResearchEmails = async (emailList, formLink) => {
    const subject = 'Participate in Market Research';
    const body = `We are conducting market research for a new product. Please fill out the form at the following link: ${formLink}`;
    
    await emailService.sendEmail(emailList, subject, body);
    return 'Emails sent successfully!';
};

module.exports = {
    createMarketResearchForm,
    sendMarketResearchEmails
};
