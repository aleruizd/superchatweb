const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();

const SALT_ROUNDS = 10;

const User = require('../models/user');

const { validateBody } = require('../middlewares/register-middleware');

router.get('/register', (req, res) => {
  res.render('register');
});

router.post('/register',validateBody, (req, res) => {
  let body = req.body;

  let userPassword = bcrypt.hashSync(body.password, SALT_ROUNDS);

  let user = new User({
    username: body.username.toLowerCase(),
    email: body.email.toLowerCase(),
    password: userPassword
  });

  user.save((err) => {
    if(err) throw err;
    
    res.send({ok: true});
  });
})

module.exports = router;
