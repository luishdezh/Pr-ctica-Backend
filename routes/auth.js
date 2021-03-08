const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');

const router = express.Router();
const jsonParser = bodyParser.json();

router.get('/login',  function(req, res) {
    res.render('login');
});

router.get('/google/login',  function(_, res) {
    res.send("Google login");
});

router.get('/google/callback',  
            passport.authenticate('google',{ successRedirect: '/animals', failureRedirect: '/animals'}),
            function(req, res) {
                console.log(req.query.code);
                res.redirect('/animals');
});

router.get('/logout',  function(_, res) {
    res.send("Google logout");
});

router.get('/google', passport.authenticate('google', { scope:['profile','email']}));

module.exports = router;