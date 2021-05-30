const mongoose = require('mongoose');
const conversation = require('./conversation');
const Schema = mongoose.Schema;

const FriendRequest = require("./friend-request").schema;
const Contact = require("./contact").schema;
const Conversation = require("./conversation").schema;

const User = new Schema({
    username: String,
    email: String,
    password: String,
    friendRequests: [FriendRequest],
    contacts: [Contact]
});

module.exports = mongoose.model('User',User);