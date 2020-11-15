const Product = require('../Models/products');
const filtersRouter = require('express').Router();

filtersRouter.get('/', async (req, res, next) => {

    try {
        // const result = await Product.find({}, { title :1 });
        const result = await Product.distinct( "title" );
        res.status(200).send(result);
    } catch (error) {
        res.status(400).send({ msg : error })
    }

});

module.exports = filtersRouter;
