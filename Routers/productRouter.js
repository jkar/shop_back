const productsRouter = require('express').Router();
const Product = require('../Models/products');

productsRouter.get('/', async (req, res, next) => {

    const offset = req.body.offset;
    const limit = req.body.limit
    console.log('req', req.body);
    const result = await Product.find().skip(offset).limit(limit);
    res.status(200).send(result);
});

productsRouter.post('/', async (req, res, next) => {

    try {
        let p = {
            title : req.body.title,
            description: req.body.description,
            number: req.body.number
        }
        const prod = new Product(p);
        const result = await prod.save();
        console.log('res', result);
        res.status(200).send(result);
    } catch (err) {
        res.status(400).send({msg : err});
    }

})

module.exports = productsRouter;