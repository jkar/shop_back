const mongoose = require('mongoose');
// mongoose.set('useFindAndModify', false);
// mongoose.set('useCreateIndex', true);
// const uniqueValidator = require('mongoose-unique-validator');

const productSchema = new mongoose.Schema({

    title: {  type: String,
              required: true,
              minlength: 3
          },
    description: {
        type: String
    },
    imagePath : {
        type : String
    },
    date : {
        type: Date,
        required: true
    }
    // number: {
    //     type: Number
    // },
    // user: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'User'
    //   }
});

// blogSchema.plugin(uniqueValidator, { type: 'mongoose-unique-validator' });

module.exports = mongoose.model('Product', productSchema)