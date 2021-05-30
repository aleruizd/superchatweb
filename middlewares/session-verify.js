const session = require("express-session")

const verifySession = (req, res, next) => {
    if(req.session.username == undefined){
        res.redirect('/login')
    }else{
        next()
    }
}

module.exports = {
    verifySession
}