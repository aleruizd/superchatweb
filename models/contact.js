const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Contact = new Schema({
    username: String,
    conversationId: String,
    lastMessageDate: String,
    unreadedMessages: {
        type: Number,
        default: 0
    }
})

module.exports = mongoose.model('Contact',Contact);