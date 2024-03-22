
const { getAllUsers, createUser, getUserById, updateUserById, deleteUserById } = require('../services/userService');

// Controller function to get all users
exports.getAllUsersController = async (req, res) => {
    try {
        const users = await getAllUsers();
        if(users instanceof Error){
            throw users
        }
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Controller function to create a new user
exports.createUserController = async (req, res) => {
    try {
        const newUser = await createUser(req.body.name, req.body.email);
        if(newUser instanceof Error){
            throw newUser
        }
        res.status(201).json(newUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.getUserByIdController = async (req, res) => {
    const userId = req.params.id;
    try {
        const user = await getUserById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        if(user instanceof Error){
            throw user
        }
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

// Controller function to update user by ID
exports.updateUserByIdController = async (req, res) => {
    const userId = req.params.id;
    const updates = req.body;

    try {
        const updatedUser = await updateUserById(userId, updates);
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        if(updatedUser instanceof Error){
            throw updatedUser
        }
        res.json(updatedUser);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Controller function to delete user by ID
exports.deleteUserByIdController = async (req, res) => {
    const userId = req.params.id;

    try {
        const deletedUser = await deleteUserById(userId);
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        if(deletedUser instanceof Error){
            throw deletedUser
        }
        res.json({ message: 'User deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


// Add other controller functions for handling getUserById, updateUserById, and deleteUserById as needed
