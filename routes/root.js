var express = require('express');
var router = express.Router();

const {verifySession} = require('../middlewares/session-verify');

router.get('/',verifySession,(req, res, next) => {
    res.redirect("/chat");
});

module.exports = router;
