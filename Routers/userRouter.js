const bcrypt = require('bcryptjs');
const productsRouter = require('express').Router();
const User = require('../Models/users');

productsRouter.post('/', async (req, res, next) => {

    try {
    console.log('req', req.body);
    const saltRounds = await bcrypt.genSaltSync(10);
    const passwordHash = await bcrypt.hashSync(req.body.params.password, saltRounds);

    const u = {
        name : req.body.params.name,
        username : req.body.params.username,
        password : passwordHash
    }
    const user = new User(u);
    const result = await user.save();
    res.status(200).json(result);
    } catch (err) {
        res.status(400).send({ msg : err.message})
    }
});

module.exports = productsRouter;