// controllers/productManager.js

const marketResearch = require('./marketResearch');

const determineProjectStage = (conversationData) => {
    if (!conversationData.hasConductedMarketResearch) {
        return marketResearch.createMarketResearchForm(conversationData);
    }
    return setupRoadmap(conversationData);
};

const setupRoadmap = (conversationData) => {
    const { vision, milestones, features } = conversationData;
    return `Roadmap created with vision: ${vision}, milestones: ${milestones.join(', ')}, features: ${features.join(', ')}`;
};

const setupSprint = (conversationData) => {
    const { sprintGoals, prioritizedFeatures, sprintDuration } = conversationData;
    return `Sprint organized with goals: ${sprintGoals}, prioritized features: ${prioritizedFeatures.join(', ')}, for a duration of ${sprintDuration} days.`;
};

module.exports = {
    determineProjectStage,
    setupRoadmap,
    setupSprint
};
