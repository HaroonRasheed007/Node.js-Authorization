const router = require('express').Router();
const jwt = require('jsonwebtoken');

let User = require('../models/user.model');


router.post('/signup', (req, res) => {
    const newUser = new User(req.body);

    newUser.save()
        .then(() => {res.json('User created!')})
        .catch(error => {res.status(400).json('Error: ' + error)});
});


router.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    if (username && password) {
        User.findOne({ username })
            .then(user => {
                if(user.password === password) {
                    let token = jwt.sign({username}, process.env.SECRET, { expiresIn: '24h'});
                    res.json({
                        message: 'Authentication Successful!',
                        token: token
                    });
                }
                else {
                    res.status(403).json({
                        message: 'Password Incorrect!'
                    });
                }
            })
            .catch(error => {
                res.status(403).json('Username incorrect! ' + error);
            });
    }
    else {
        res.status(400).json('Authentication failed! Problematic request.');
    }
});


module.exports = router;