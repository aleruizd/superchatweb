const validate = require("validate.js");

const User = require('../models/user');

let constraints = {
    email: {
        presence: true,
        email: true
    },
    password: {
        presence: true,
        length: {
            minimum: 8 
        }
    },
    username: {
        presence: true,
        length: {
            minimum: 5
        },
        format: {
            pattern: "[a-z0-9]+",
            flags: "i",
            message: "can only contain a-z and 0-9"
        }
    }
}

const validateBody = async (req, res, next) => {
    let body = req.body;

    let errors = validate(req.body,constraints);
    
    let userFound = await User.findOne({username: body.username});
    let emailFound = await User.findOne({email: body.email});

    if(emailFound || userFound){
        if(!errors) errors = new Object();

        if(emailFound) errors.email = ['Email not available'];
        if(userFound) errors.username = ['Username not available'];
    }

    if(errors)
        res.send({ok: false, errors});
    else
        next();
}

module.exports = {
    validateBody
}

