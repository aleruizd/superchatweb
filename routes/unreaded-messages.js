const express = require("express");
const router = express.Router();

const { verifySession } = require('../middlewares/session-verify');

const User = require('../models/user');

router.post("/increment-unreaded-messages",verifySession,(req,res) => {
    let body = req.body;
    
    User.findOne({username: req.session.username},(err, myUser) => {
        myUser.contacts.forEach(contact => {
            if(contact.username == body.contactName)
                contact.unreadedMessages++
        });
        
        myUser.save();
        res.send({
            ok: true
        })
    })
})

router.post("/reset-unreaded-messages",verifySession,(req,res) => {
    let body = req.body;

    User.findOne({username: req.session.username},(err, myUser) => {
        myUser.contacts.forEach(contact => {
            if(contact.username == body.contactName)
                contact.unreadedMessages = 0;
        });
        
        myUser.save();
        res.send({
            ok: true
        })
    })
})

module.exports = router;

