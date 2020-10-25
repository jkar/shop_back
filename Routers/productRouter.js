const productsRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const Product = require('../Models/products');
var multer  = require('multer');
const fs = require('fs');
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
        // const count = await Product.count();
        const count = await Product.countDocuments();
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
    const result = await Product.find().sort('number').skip(offset).limit(limit);
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

productsRouter.delete('/:id', (req, res, next) => {

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
            
                    const id = req.params.id;
                    console.log('ID', id);

                    const result = await Product.findByIdAndDelete(id);
                    return res.status(204).end();
                }
            } catch (err) {
                    return res.status(400).json({msg : err});
                }
            });
        }
});

// POST gia na kanei delete to img amesws meta to router.delete gia tin card sti mongo
productsRouter.post('/img', (req, res, next) => {

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
            
                    let path = req.body.img;
                    console.log('img', path);

                    fs.unlink(path, (err) => {
                        if (err) {
                          console.error(err)
                          return
                        }
                    })

                    return res.status(200).send({msg : 'deleted'})
                }
            } catch (err) {
                    return res.status(400).json({msg : err});
                }
            });
        }
});

productsRouter.put('/:id', upload.single('file'), (req, res, next) => {
    // productsRouter.put('/:id', (req, res, next) => {


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

            let id = req.params.id;
            //id = id.substring(3);
            console.log('ID', id);

            let p = new Product( {
                title : req.body.title,
                description : req.body.description,
                imagePath : req.file.path,
                number : 100
            });

            let productToUpdate = {}

            productToUpdate = Object.assign(productToUpdate, p._doc);
            delete productToUpdate._id;
    
            const prod = new Product(p);
            const result = await Product.findByIdAndUpdate(id, productToUpdate, {new : true});
            console.log('res', result);
            return res.status(200).send(result);
        }
        } catch (err) {
            console.log('err', err)
            return res.status(400).json({msg : err.message});
        }
    });
    }


});

productsRouter.put('/withoutImage/:id', (req, res, next) => {

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

            let id = req.params.id;
            //id = id.substring(3);
            console.log('ID', id);

            let p = new Product( {
                title : req.body.title,
                description : req.body.description,
                imagePath : req.body.imagePath,
                number : 100
            });

            let productToUpdate = {}

            productToUpdate = Object.assign(productToUpdate, p._doc);
            delete productToUpdate._id;
    
            const prod = new Product(p);
            const result = await Product.findByIdAndUpdate(id, productToUpdate, {new : true});
            console.log('res', result);
            return res.status(200).send(result);
        }
        } catch (err) {
            console.log('err', err)
            return res.status(400).json({msg : err.message});
        }
    });
    }
});

module.exports = productsRouter;