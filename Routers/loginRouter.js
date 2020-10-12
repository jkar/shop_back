const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const loginRouter = require('express').Router();
const User = require('../Models/users');

loginRouter.post('/', async (req, res, next) => {

    try {
        console.log(req.body);
        const user = await User.findOne({ username: req.body.username });
        
        const passwordCorrect = user === null
        ? false
        : await bcrypt.compare(req.body.password, user.password);

        //if (!(user && passwordCorrect)) {
        if (user === null || passwordCorrect === false) {
            return res.status(401).json({
              error: 'invalid username or password'
            });
          }

        const userForToken = {
            username: user.username,
            id: user._id,
          }
        
          const token = jwt.sign(userForToken, 'login')
        
          res
            .status(200)
            .send({ token, username: user.username });

    } catch (err) {
        res.status(400).send({error : err});
    }

});

loginRouter.post('/test', async (req, res, next) => {

    try {

        let token = req.headers['authorization'];
        if (!token) {
            res.status(400).json({msg : "no token"});
        } else {
        token = token.substring(7);

        jwt.verify(token, 'login', (err, authData) => {
            if (err) {
                res.status(400).send({ err : "INVALID TOKEN" });
            } else {
                res.status(200).json({ msg : "jwt valid" , authData : authData });
            }
        });
    }

    } catch (err) {

        res.status(400).json({error : err});
    }
});

module.exports = loginRouter;