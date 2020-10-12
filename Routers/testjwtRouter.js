const jwt = require('jsonwebtoken');
const testjwtRouter = require('express').Router();

testjwtRouter.post('/', async (req, res, next) => {

    try {
        

        let token = req.headers['authorization'];
        console.log(token);
        if (!token) {
            console.log('no token')
            res.json({msg : "no token"});
        } else {
        token = token.substring(7);

        jwt.verify(token, 'login', (err, authData) => {
            if (err) {
                console.log('invalid token')
                res.send({ err : "INVALID TOKEN" });
            } else {
                console.log('valid jwt')
                res.status(200).json({ msg : "jwt valid" , authData : authData });
            }
        });
    }

    } catch (err) {

        res.status(400).json({error : err});
    }
});

module.exports = testjwtRouter;