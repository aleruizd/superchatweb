const express = require("express");
const router = express.Router();

const { verifySession } = require('../middlewares/session-verify');
const { updateLastMessage } = require('../helpers/update-last-message');

const Conversation = require('../models/conversation');
const Message = require('../models/message');

router.post("/message",verifySession,(req,res) => {
    let body = req.body;
    let todaysDate = new Date(Date.now());

    Conversation.findOne({_id: body.actualConversation._id},(err,conversation)=>{
        
        let to = conversation.members.filter(member => member != req.session.username)[0];

        let message = new Message({
            author: req.session.username,
            date: new Date(Date.now()).toString(),
            body: body.message,
            to
        })

        conversation.lastMessageDate = message.date;
        
        updateLastMessage(conversation.members[0],conversation.members[1],todaysDate);
        updateLastMessage(conversation.members[1],conversation.members[0],todaysDate);

        conversation.messages.push(message);
        conversation.save();

        res.send({
            ok: true,
            message
        })
    })
})


module.exports = router;
