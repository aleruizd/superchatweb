const bcrypt = require('bcrypt');

const User = require('../models/user');

const validateLogin = async (req, res, next) => {
    let body = req.body;

    let userFound = await User.findOne({username: body.username});
    if(!userFound || !bcrypt.compareSync(body.password, userFound.password)){
        return res.send({
            ok: false,
            message: 'Incorrect username or password'
        })
    }

    next();
}

module.exports = {
    validateLogin
}