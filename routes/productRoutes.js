// routes/productRoutes.js

const express = require('express');
const router = express.Router();
const productManager = require('../controllers/productManager');

// Route for determining the project stage (whether market research is needed)
router.post('/determine-project-stage', (req, res) => {
    const result = productManager.determineProjectStage(req.body);
    res.json({ message: result });
});

// Route for roadmap setup
router.post('/roadmap', (req, res) => {
    const result = productManager.setupRoadmap(req.body);
    res.json({ message: result });
});

// Route for sprint setup
router.post('/sprint', (req, res) => {
    const result = productManager.setupSprint(req.body);
    res.json({ message: result });
});

module.exports = router;
