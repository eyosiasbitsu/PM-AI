const axios = require('axios');
const qs = require('qs'); // For URL-encoding POST body

// Get access token using refresh token
const getAccessToken = async () => {
    try {
        const tokenResponse = await axios.post('https://oauth2.googleapis.com/token', qs.stringify({
            client_id: process.env.GOOGLE_CLIENT_ID,
            client_secret: process.env.GOOGLE_CLIENT_SECRET,
            refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
            grant_type: 'refresh_token',
        }), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });

        return tokenResponse.data.access_token;
    } catch (error) {
        console.error('Error getting access token:', error.response?.data || error.message);
        throw new Error('Could not retrieve access token');
    }
};

// Function to create Google Form
const createGoogleForm = async (formDetails) => {
    try {
        const accessToken = "ya29.a0AcM612xqRN3M5Jh7fHpsucZCly42zkdCYvFYLeELVOo1R2qLvOZlPhQJroJmfmPTvBYy-Lm6qdanFbArGwrcTWpDoAKSoAhFYpYE-gmeuVVUALCqlMl7goLxQioXUor6YRkfOED8XH-fZjAcrQ4GFoMYouTx1zHitqYYQI3yaCgYKAYoSARASFQHGX2MiEFxd8EQeLlxvHFLiq6qarg0175";

        // Construct the form creation request
        const formRequestBody = {
            info: {
                title: formDetails.title,
            }
        };

        // Make the request to create the form
        const response = await axios.post('https://forms.googleapis.com/v1/forms', formRequestBody, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
        });

        const formId = response.data.formId;
        const formLink = `https://docs.google.com/forms/d/${formId}/edit`;

        return { formLink, formId };
    } catch (error) {
        console.error('Error creating Google Form:', error.message);
        throw new Error('Could not create Google Form');
    }
};

// Function to add questions to Google Form
const addQuestionsToForm = async (formId, questions) => {
    try {
        const accessToken = "ya29.a0AcM612xqRN3M5Jh7fHpsucZCly42zkdCYvFYLeELVOo1R2qLvOZlPhQJroJmfmPTvBYy-Lm6qdanFbArGwrcTWpDoAKSoAhFYpYE-gmeuVVUALCqlMl7goLxQioXUor6YRkfOED8XH-fZjAcrQ4GFoMYouTx1zHitqYYQI3yaCgYKAYoSARASFQHGX2MiEFxd8EQeLlxvHFLiq6qarg0175";

        // Construct the batchUpdate request
        const requests = questions.map((question, index) => ({
            createItem: {
                item: {
                    title: question,
                    questionItem: {
                        textQuestion: {}
                    }
                },
                location: {
                    index: index
                }
            }
        }));

        const requestBody = { requests };

        // Make the request to add the questions to the form
        const response = await axios.post(`https://forms.googleapis.com/v1/forms/${formId}:batchUpdate`, requestBody, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
        });

        return response.data;
    } catch (error) {
        console.error('Error adding questions to Google Form:', error.response?.data || error.message);
        throw new Error('Could not add questions to Google Form');
    }
};

module.exports = {
    createGoogleForm,
    addQuestionsToForm
};
