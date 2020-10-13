const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    name : {
        type : String,
        required : true,
        minlength : 3
    },
    username : {
        type : String,
        required : true,
        minlength : 5
    },
    password : {
        type : String,
        required : true,
        minlength : 5
    }
    // ,
    // products: [
    //     {
    //       type: mongoose.Schema.Types.ObjectId,
    //       ref: 'Product'
    //     }
    //   ]
});

module.exports = mongoose.model('User', userSchema)