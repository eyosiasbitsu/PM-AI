// utils/logger.js

const logError = (message) => {
    console.error(`[ERROR] ${message}`);
};

const logInfo = (message) => {
    console.info(`[INFO] ${message}`);
};

module.exports = {
    logError,
    logInfo
};
