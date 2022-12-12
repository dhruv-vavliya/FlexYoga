require('dotenv').config()

const express = require('express');
const User = require('../models/User');
const router = express.Router();

// payment route
router.post( '/',(req ,res)=>{
    console.log(req.body);
    try {
        User.findOne({ email: req.body.email }, (error, user) => {
            if (error) {
                res.json(500, {
                    msg: "internal server error"
                });
            } else if (!user) {
                res.json(400, {
                    msg: "User Doesn't exist."
                })
            } else if (user.password != req.body.password) {
                res.json(400, {
                    msg: "Incorrect Password."
                })
            } else {
                const {month ,batch} = req.body;

                let obj = user.payment;
                obj[month] = {
                    batch : batch,
                    paymentDate : Date.now
                }
                user.payment = obj;
                
                User.updateOne( {email : req.body.email} ,user ,( e ,user )=>{
                    if( e ){
                        res.json(500, {
                            msg: "internal server error"
                        });
                    } else{
                        res.json(200);
                    }
                } )
            }
        })
    } catch {
        res.json(500, {
            msg: "internal server error"
        });
    }

        
} );

module.exports = router;
