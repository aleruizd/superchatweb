const { request } = require("express");

const express = require("express");
const router = express.Router();

const {verifySession} = require('../middlewares/session-verify');

router.get("/logout", verifySession, (req, res) => {
    req.session.destroy();
    res.redirect("/login");
})

module.exports = router;