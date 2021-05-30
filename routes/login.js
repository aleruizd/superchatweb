var express = require('express');
var router = express.Router();

const { validateLogin } = require('../middlewares/login-middleware');

router.get('/login',(req, res, next) => {
  res.render('login');
});

router.post('/login',validateLogin, (req, res) => {
    req.session.username = req.body.username;
    res.send({
      ok: true
    });
})

module.exports = router;
