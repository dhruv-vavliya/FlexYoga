require('dotenv').config()

const express = require('express');
const User = require('../models/User');
const router = express.Router();

// register user
router.post('/register', (req, res) => {

    try {

        User.exists({ email: req.body.email }, (error, user) => {
            if (error) {
                res.json(500, {
                    msg: "internal server error"
                });
            } else if (user) {
                return res.json(400, {
                    msg: "User already exist"
                })
            } else {
                const user = new User(req.body);
                user.save((error) => {
                    if (error) {
                        res.json(500, {
                            msg: "internal server error"
                        });
                    } else {
                        res.json(200);
                    }
                })
            }
        })

    } catch {
        res.json(500, {
            msg: "internal server error"
        });
    }

});


// login user
router.post('/login', (req, res) => {

    try {
        const { email, password } = req.body;
        User.findOne({ email: email }, (error, user) => {
            if (error) {
                res.json(500, {
                    msg: "internal server error"
                });
            } else if (!user) {
                res.json(400, {
                    msg: "User Doesn't exist."
                })
            } else if (user.password != password) {
                res.json(400, {
                    msg: "Incorrect Password."
                })
            } else {
                res.json(200, user);
            }
        })
    } catch {
        res.json(500, {
            msg: "internal server error"
        });
    }

});

module.exports = router;
