const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FriendRequest = new Schema({
    from: String,
    to: String
});

module.exports = mongoose.model('FriendRequest',FriendRequest);