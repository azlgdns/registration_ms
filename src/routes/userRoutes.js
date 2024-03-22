const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');
const validateToken = require('../middlewares/validationMiddleware');

// GET /api/users - Get all users
router.get('/', validateToken("admin") ,UserController.getAllUsersController);

// GET /api/users/:id - Get user by ID
router.get('/:id', validateToken("user"),  UserController.getUserByIdController);

// POST /api/users - Create a new user
router.post('/', validateToken("admin"), UserController.createUserController);

// PUT /api/users/:id - Update user by ID
router.put('/:id',validateToken("user"),  UserController.updateUserByIdController);

// DELETE /api/users/:id - Delete user by ID
router.delete('/:id',validateToken("admin"), UserController.deleteUserByIdController);

module.exports = router;
