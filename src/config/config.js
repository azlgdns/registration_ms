module.exports = {
    development: {
        port: 3000,
        loggingLevel: 'debug',
        MONGOURI: ""
    },
    production: {
        port: process.env.PORT || 3000,
        loggingLevel: 'info',
    }
};
