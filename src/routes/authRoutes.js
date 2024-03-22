const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/authController');

// POST /api/auth/login - User login
router.post('/login', AuthController.loginController);

// POST /api/auth/register - User registration
router.post('/signup', AuthController.signupController);

// POST /api/auth/logout - User logout (optional)
// router.post('/logout', AuthController.logout);

module.exports = router;
