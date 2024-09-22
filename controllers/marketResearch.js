const googleApi = require('../services/googleApi');
const emailService = require('../services/emailService');

/**
 * Controller to create a Google Form and return the form link
 */
const createMarketResearchForm = async (req, res) => {
    try {
        const { productName, questions } = req.body;

        // Create the Google Form
        const formDetails = {
            title: `Market Research for ${productName}`,
        };

        const { formLink, formId } = await googleApi.createGoogleForm(formDetails);

        // Add questions to the form after creation
        // await googleApi.addQuestionsToForm(formId, questions);

        // Respond with the form link
        res.status(200).json({
            message: 'Google Form created and questions added successfully!',
            formLink: formLink
        });
    } catch (error) {
        res.status(500).json({
            message: 'Failed to create Google Form or add questions',
            error: error.message
        });
    }
};

// Controller to handle sending market research emails
const sendMarketResearchEmails = async (req, res) => {
    try {
        const { emailList, formLink } = req.body;

        const subject = 'Participate in Market Research';
        const body = `We are conducting market research for a new product. Please fill out the form at the following link: ${formLink}`;

        // Send emails using the email service
        await emailService.sendEmail(emailList, subject, body);

        // Respond with success message
        res.status(200).json({ message: 'Emails sent successfully!' });
    } catch (error) {
        res.status(500).json({
            message: 'Failed to send emails',
            error: error.message
        });
    }
};

module.exports = {
    createMarketResearchForm,
    sendMarketResearchEmails
};
