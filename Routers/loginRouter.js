const bcrypt = require('bcryptjs');
const loginRouter = require('express').Router();
const User = require('../Models/users');

loginRouter.post('/', async (req, res, next) => {

    try {
        console.log(req.body.params);
        const user = await User.findOne({ username: req.body.params.username });
        
        const passwordCorrect = user === null
        ? false
        : await bcrypt.compare(req.body.params.password, user.password);

        // if (!(user && passwordCorrect)) {
        if (user === null || passwordCorrect === false) {
            res.json({
            error: 'invalid username or password'
            });
          } else {

        const userForToken = {
            username: user.username,
            id: user._id,
          }
        
          const token = jwt.sign(userForToken, 'login')
        
          res
            .status(200)
            .send({ token, username: user.username });

        res.send({ msg : "send"});
        }

    } catch (err) {
        res.status(400).send({error : err});
    }

});



module.exports = loginRouter;