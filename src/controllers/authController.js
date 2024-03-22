const { signup, login } = require("../services/authService");

exports.loginController = async (req, res) => {
    try {
        const resp = await login(req.body.email, req.body.password);
        if(!resp){
            res.status(404).json({message: `Logged in failed`});
        }
        if(resp instanceof Error){
            throw resp
        }
        res.status(201).json({message: `Logged in as ${resp.user.name}`, body: resp});
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

exports.signupController = async (req, res) => {
    try {
        const resp = await signup(req.body.name, req.body.email, req.body.password);
        if(!resp){
            res.status(404).json({message: `Signup failed`});
        }
        if(resp instanceof Error){
            throw resp
        }
        res.status(201).json({message: `Signed up as ${resp.user.name}`, body: resp});
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}
