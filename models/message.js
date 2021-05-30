const mongoose = require("mongoose");
const Schema  = mongoose.Schema;

const Message = new Schema({
    author: String,
    body: String,
    to: String,
    date: String
})

module.exports = mongoose.model('Message',Message);