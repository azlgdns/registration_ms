const User = require('../models/userModel');

exports.getAllUsers = async () => {
    try {
        return await User.find();
    } catch (error) {
        console.log(error);
        return error;
    }
}

exports.createUser = async (name, email) => {
    const user = new User({
        name,
        email
    });
    try {
        return await user.save();
    } catch (error) {
        console.log(error);
        return error
    }
}

exports.getUserById = async (id) => {
    try {
        return await User.findById(id);
    } catch (error) {
        console.log(error);
        return error
    }
}

exports.updateUserById = async (id, updates) => {
    try {
        return await User.findByIdAndUpdate(id, updates, { new: true });
    } catch (error) {
        console.log(error);
        return error
    }
}

exports.deleteUserById = async (id) => {
    try {
        return await User.findByIdAndDelete(id);
    } catch (error) {
        console.log(error);
        return error
    }
}