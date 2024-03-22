const jwt = require('jsonwebtoken');
require('dotenv').config();

const validateToken = (role) => (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWTSECRET); 
        if(decoded.role == role && decoded.email == req.body.email){
            next();
        } else{
            throw new Error("Access denied.")
        }
    } catch (error) {
        return res.status(401).json({ message: `Invalid token. ${error.message}` });
    }
};

module.exports = validateToken;
