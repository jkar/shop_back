const productsRouter = require('express').Router();
const Product = require('../Models/products');

productsRouter.get('/count', async (req, res, next) => {
    try {
        const limit = req.body.limit;
        const count = await Product.count();
        let numberOfPages = Math.floor( count / limit );
        if (count % limit !== 0) {
            numberOfPages = numberOfPages + 1;
        }

        res.status(200).send( { numberOfPages : numberOfPages });
    } catch (err) {
        res.status(400).send({ msg : err });
    }
});

productsRouter.get('/', async (req, res, next) => {

    try {
    const offset = req.body.offset;
    const limit = req.body.limit
    const result = await Product.find().skip(offset).limit(limit);
    res.status(200).send(result);
    } catch (err) {
        res.status(400).send({msg : err});
    }
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