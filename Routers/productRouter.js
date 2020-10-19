const productsRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const Product = require('../Models/products');
var multer  = require('multer');
// var upload = multer({ dest: 'uploads/' });

const storage = multer.diskStorage({
    destination : function ( req, file, cb) {
        cb(null, './uploads/');
    },
    filename : function ( req, file, cb) {
        cb(null, Date.now() + '-' +  file.originalname);
    }
});

const fileFilter = (req, file, cb) => {

    if ( file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(new Error('Wrong type of file'), false);
    }
};

var upload = multer({ 
    storage : storage,
    limits : { fileSize : 1024 * 1024 * 5 },
    fileFilter : fileFilter    
});


productsRouter.get('/count', async (req, res, next) => {
    try {
        const limit = req.query.limit;
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
    const offset = parseInt(req.query.offset);
    const limit = parseInt(req.query.limit);
    console.log('limit', limit);
    console.log('ofst', offset);
    const result = await Product.find().skip(offset).limit(limit);
    res.status(200).send(result);
    } catch (err) {
        res.status(400).send({msg : err});
    }
});

productsRouter.post('/', upload.single('file') , (req, res, next) => {


        let token = req.headers['authorization'];
        console.log(token);
        if (!token) {
            console.log('no token')
            return res.status(400).json({msg : "no token"});
        } else {
        token = token.substring(7);

        jwt.verify(token, 'login', async (err, authData) => {

            try {

            if (err) {
                console.log('invalid token')
                return res.status(401).send({ msg : "INVALID TOKEN" });
            } else {
                console.log('valid jwt')

                let p = {
                    title : req.body.title,
                    description : req.body.description,
                    imagePath : req.file.path,
                    number : 1
                }
        
                const prod = new Product(p);
                const result = await prod.save();
                console.log('res', result);
                return res.status(200).send(result);
            }
            } catch (err) {
                return res.status(400).json({msg : err.message});
            }

        });
        }

});

module.exports = productsRouter;