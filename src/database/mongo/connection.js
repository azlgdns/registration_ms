const mongoose = require('mongoose'); 
const config = require('../../config/config');
require('dotenv').config();

// MongoDB connection
mongoose.connect(process.env.MONGOURI, { useNewUrlParser: true, useUnifiedTopology: true });
const mongoDB = mongoose.connection;
mongoDB.on('error', console.error.bind(console, 'MongoDB connection error:'));
mongoDB.once('open', () => {
    console.log('Connected to MongoDB');
});

module.exports = {
    mongoDB: mongoDB
};
