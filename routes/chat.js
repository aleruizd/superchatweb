var express = require('express');
var router = express.Router();

const { verifyContactsDates } = require('../helpers/verify-contacts-dates');
const { orderByDate } = require('../helpers/order-by-date');

const {verifySession} = require('../middlewares/session-verify');

const User = require('../models/user');

router.get('/chat',verifySession,(req, res) => {
  
  User.findOne({username: req.session.username}, (err, user) => {
    let contacts = user.contacts
    
    orderByDate(contacts);
    verifyContactsDates(contacts);

    res.render('chat',{
      username: user.username,
      friendRequests: user.friendRequests,
      contacts: user.contacts
    });
  })
});

module.exports = router;
