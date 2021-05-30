const express = require("express");
const router = express.Router();

const User = require('../models/user');
const Contact = require('../models/contact');
const Conversation = require('../models/conversation');

router.post("/contact",(req,res) => {
    let body = req.body;

    User.findOne({username: req.session.username},(err, myUser)=>{
        //DELETING THE REQUEST FROM MY REQUESTLIST
        let request = myUser.friendRequests.find(request => request._id == body.friendRequestId);
        myUser.friendRequests = myUser.friendRequests.filter(request => request._id != body.friendRequestId);

        //ADDING THE CONTACT TO MY ACCOUNT AND ADDING MYSELF TO MY CONTACT´S CONTACT LIST

        User.findOne({username: request.from},(err, requestUser) => {

            //CREATING CONVERSATION OBJECT, IT IS CREATED IN ANOTHER COLLECTION

            let conversation = new Conversation({
                members: [request.from,req.session.username]
            })
            conversation.save();

            let requestContact = new Contact({
                username: request.from,
                conversationId: conversation._id
            })

            let myContact = new Contact({
                username: req.session.username,
                conversationId: conversation._id
            })

            requestUser.contacts.push(myContact);
            myUser.contacts.push(requestContact);
            
            requestUser.save();
            myUser.save();

            return res.send({
                ok: true,
                requestContact,
                myContact
            })
        })
    })
})

module.exports = router;