const express = require('express');
var mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3001;
MONGODB_URI="mongodb://localhost:27017/shop";
// const Product = require('./Models/products');
const productsRouter = require('./Routers/productRouter');
const userRouter = require('./Routers/userRouter');
const loginRouter = require('./Routers/loginRouter');
const filtersRouter = require('./Routers/filtersRouter');
const testjwtRouter = require('./Routers/testjwtRouter');


mongoose.connect(MONGODB_URI, { useUnifiedTopology: true, useNewUrlParser: true})
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));

app.get('/', (req, res) => {
  res.send('Hello World!!!!');
})

app.use('/api/products', productsRouter);
app.use('/api/user', userRouter);
app.use('/api/login', loginRouter);
app.use('/api/filters', filtersRouter);
app.use('/api/test', testjwtRouter);


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})