const productsRouter = require('express').Router();
const Product = require('../Models/products');



productsRouter.post('/', async (req, res, next) => {
    // let p = {
    //     title : "ring",
    //     description: "gold",
    //     number: 1
    // }
    console.log('req', req.body);
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