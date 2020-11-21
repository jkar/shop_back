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

filtersRouter.get('/title', async (req, res, next) => {

    try {
         const listOfTitles = req.query.titles;
         const offset = parseInt(req.query.offset);
         const limit = parseInt(req.query.limit);

        const result = await Product.find({
            // "title": { $in: ["shocks", "boots"] }
            "title": { $in: listOfTitles }
        }).sort({date: -1}).skip(offset).limit(limit);
        res.status(200).send(result);
    } catch (error) {
        res.status(400).send({ msg : error });
    }
});

filtersRouter.get('/countTitles', async (req, res, next) => {
    try {
        const listOfTitles = req.query.titles;
        const limit = req.query.limit;
        console.log('listOfTitles', listOfTitles);
        console.log('limit', limit);
        const count = await Product.find({
            "title": { $in: listOfTitles }
        }).countDocuments();
        let numberOfPages = Math.floor( count / limit );
        if (count % limit !== 0) {
            numberOfPages = numberOfPages + 1;
        }

        res.status(200).send( { numberOfPages : numberOfPages });
    } catch (err) {
        res.status(400).send({ msg : err });
    }
});

module.exports = filtersRouter;
