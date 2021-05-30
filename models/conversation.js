const mongoose = require("mongoose");
const Schema  = mongoose.Schema;

const Message = require("./message").schema;

const Conversation = new Schema({
    members: Array,
    lastMessageDate: String,
    messages: [Message]
})

module.exports = mongoose.model('Conversation',Conversation);