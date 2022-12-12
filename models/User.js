
const mongo = require('mongoose');

const userSchema = new mongo.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String ,
        required : true
    },
    age :{
        type : Number,
        required : true
    },
    date : {
        type : Date ,
        default : Date.now
    },
    payment : {
        type : Object ,
        default : {
            Jan : {
                type : Object,
                default : {
                    batch : String,
                    paymentDate : Date.now
                }
            },
            Feb : {
                type : Object,
                default : {
                    batch : String,
                    paymentDate : Date.now
                }
            },
            Mar : {
                type : Object,
                default : {
                    batch : String,
                    paymentDate : Date.now
                }
            },
            Apr : {
                type : Object,
                default : {
                    batch : String,
                    paymentDate : Date.now
                }
            },
            May : {
                type : Object,
                default : {
                    batch : String,
                    paymentDate : Date.now
                }
            },
            Jun : {
                type : Object,
                default : {
                    batch : String,
                    paymentDate : Date.now
                }
            },
            Jul : {
                type : Object,
                default : {
                    batch : String,
                    paymentDate : Date.now
                }
            },
            Aug : {
                type : Object,
                default : {
                    batch : String,
                    paymentDate : Date.now
                }
            },
            Sep : {
                type : Object,
                default : {
                    batch : String,
                    paymentDate : Date.now
                }
            },
            Oct : {
                type : Object,
                default : {
                    batch : String,
                    paymentDate : Date.now
                }
            },
            Nov : {
                type : Object,
                default : {
                    batch : String,
                    paymentDate : Date.now
                }
            },
            Dec : {
                type : Object,
                default : {
                    batch : String,
                    paymentDate : Date.now
                }
            }
        }
    }
});

module.exports = mongo.model( 'user' ,userSchema );