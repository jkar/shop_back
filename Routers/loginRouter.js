const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const loginRouter = require('express').Router();
const User = require('../Models/users');

loginRouter.post('/', async (req, res, next) => {

    try {
        console.log(req.body);
        const user = await User.findOne({ username: req.body.username });
        
        const passwordCorrect = user === null
        ? false
        : await bcrypt.compare(req.body.password, user.password);

        // if (!(user && passwordCorrect)) {
        if (user === null || passwordCorrect === false) {
            return res.status(401).json({
            error: 'invalid username or password'
            });
          } else {

        const userForToken = {
            name: user.name,
            username: user.username,
            id: user._id,
          }
        
          const token = jwt.sign(userForToken, 'login');
        
          res
            .status(200)
            .send({ token, username: user.username, name : user.name });

        }

    } catch (err) {
        res.status(400).send({error : err});
    }

});



module.exports = loginRouter;