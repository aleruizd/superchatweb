const express = require("express");
const router = express.Router();

const { verifySession } = require('../middlewares/session-verify');

const Conversation = require('../models/conversation');

router.get("/conversation/:conversationId",verifySession,(req,res) => {
    let conversationId = req.params.conversationId;
    
    Conversation.findOne({_id: conversationId},(err,conversation) => {
        return res.send({
            ok: true,
            conversation,
            myUsername: req.session.username
        });
    })
})

module.exports = router;
