const User = require("../models/user");
const user = require("../models/user");

const updateLastMessage = (username,contact,date) => {
    User.findOne({username},(err, user)=>{
        user.contacts.forEach(userContact => {
            if(userContact.username == contact)
                userContact.lastMessageDate = date.toString();
        });

        user.save();
    })
}

module.exports = {
    updateLastMessage
}