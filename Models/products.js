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
    path : {
        type : String
    },
    number: {
        type: Number
    }
});

// blogSchema.plugin(uniqueValidator, { type: 'mongoose-unique-validator' });

module.exports = mongoose.model('Product', productSchema)