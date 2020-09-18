const express = require('express');

const app = express();
const router = express.Router();

router.use( '/products', (req, res, next) => {
    res.json({name: "rizal", email: "rznj@gmail.com"});
    next();
})

router.use('/price', (req, res, next) => {
    res.json({price: 25000});
    next();
})

router.get('/customers', (req, res, next) => {
    res.json({title: "Customer"});
    next();
})

app.use('/', router);


// GET '/users' ==> [{name}]

app.listen(4000);