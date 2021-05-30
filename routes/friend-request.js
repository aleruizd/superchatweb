var express = require('express');
var router = express.Router();

const { errorMessage } = require('../helpers/friend-request-helpers');

const { verifySession } = require('../middlewares/session-verify');

const User = require('../models/user');
const FriendRequest = require('../models/friend-request');
const { async } = require('validate.js');

router.delete("/friend-request",verifySession, (req, res) => {
    let body = req.body;
    
    User.findOne({ username: req.session.username },(err, user) => {
        user.friendRequests = user.friendRequests.filter(request => request._id != body.friendRequestId);
        user.save();
        
        return res.send({
            ok: true
        })
    })
})

router.post('/friend-request',verifySession, async (req, res) => {

    let from = req.session.username;
    let to = req.body.to.toLowerCase();

    if (from == to) return errorMessage(res,'You cannot send a friend request to yourself');

    let alreadyGotRequest
    
    await User.findOne({username: from},(err, myUser) => {
        alreadyGotRequest = myUser.friendRequests.find(request => request.from == to);
    })

    await User.findOne({username: to},(err, user) => {
        if(!user) return errorMessage(res,'The user was not found');

        if(alreadyGotRequest) return errorMessage(res,'You have already got a friend request from this person');

        let requestAlreadySent = user.friendRequests.find(request => request.from == from)
        if(requestAlreadySent) return errorMessage(res,'You have already sent a friend request to this person');

        let contactAlreadyAdded = user.contacts.find(contact => contact.username == from);
        if(contactAlreadyAdded) return errorMessage(res,'You are already friend of this contact');

        let friendRequest = new FriendRequest({
            from,
            to
        })

        user.friendRequests.push(friendRequest);
        user.save();
        return res.send({
            ok: true,
            message: 'Friend request sent successfully',
            friendRequest
        })
    })
})

module.exports = router;