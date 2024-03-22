var jwt = require('jsonwebtoken');
require('dotenv').config();

exports.generateJWT = (body, role, tl) => {
    try{
    return jwt.sign({email: body.email, role} , process.env.JWTSECRET, { expiresIn: tl });
    } catch (error) {
        console.log(error)
        return error;
    }
}

exports.verifyJWT = (role) => {
    try {
        var decoded = jwt.verify(token, process.env.JWTSECRET);
        if(decoded.role == role){
            return true;
        }
        return false;
      } catch(err) {
        console.log(err)
        return err;
      }
}