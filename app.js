// app.js

const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const routes = require('./routes/index'); // Main route file

const app = express();

// Middleware to parse request bodies
app.use(bodyParser.json());

// Use the defined routes
app.use('/api', routes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
