const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const { createUser, updateUserById } = require('./userService');
const { generateJWT } = require('./jwtServices');
const { error } = require('winston');

exports.login = async (email, password) => {
    try {
        let user = await User.findOne({ email });
        const myPromise = new Promise((resolve, reject) => {
            bcrypt.compare(password, user.hash, function (err, result) {
                if (err) {
                    reject(err);
                }
                if (result) {
                    let copuUser = {...user}._doc
                    delete copuUser.hash;
                    const jwttoken = generateJWT(copuUser, "user", "30d");
                    if (jwttoken instanceof Error) {
                        throw error;
                    }
                    if (jwttoken) {
                        copuUser = { user: copuUser, jwttoken }
                    }
                    resolve(copuUser)
                } else { resolve(null); }
            });
        });
        return await myPromise;
    } catch (error) {
        console.log(error);
        return error;
    }
}

exports.signup = async (name, email, password) => {
    const saltRounds = 10;
    try {
        const newUser = await createUser(name, email);
        if (newUser instanceof Error) {
            throw newUser;
        }
        if (newUser) {
            const myPromise = new Promise((resolve, reject) => {
                bcrypt.hash(password, saltRounds, function (err, hash) {
                    if (err) {
                        reject(err);
                    }
                    resolve(hash)
                });
            });

            const hash = await myPromise;
            const updatedUser = await updateUserById(newUser._id, { hash });
            if (updatedUser instanceof Error) {
                throw updatedUser;
            }
            let copyupdateduser = {...updatedUser}._doc
            delete copyupdateduser.hash
            const jwttoken = generateJWT(copyupdateduser, "user", "30d");
            if (jwttoken instanceof Error) {
                throw error;
            }
            if (jwttoken) {
                copyupdateduser = { user: copyupdateduser, jwttoken }
            }
            return copyupdateduser;
        }
    } catch (error) {
        console.log(error);
        return error;
    }
}