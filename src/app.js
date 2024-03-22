const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors'); // Import cors module
const config = require('./config/config');
const userRoutes = require('../src/routes/userRoutes');
const authRoutes = require('../src/routes/authRoutes');

const db = require('./database/mongo/connection');

// Load environment variables from .env file
dotenv.config();

// Create an Express application
const app = express();

// Parse incoming request bodies in a middleware before your handlers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Enable CORS for all requests
app.use(cors());

// Set up routes
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);

// Define a default route
app.get('/', (req, res) => {
    res.send('Registration Microservice is running!');
});

// Start the server
const PORT = process.env.PORT || config.development.port;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
