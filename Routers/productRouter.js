const productsRouter = require('express').Router();
const Product = require('../Models/products');



productsRouter.get('/', (req, res) => {
    res.send('prod');
})

module.exports = productsRouter;