const express = require('express');

const router = express.Router();

const productsController = require("../controllers/products");

router.post( '/products', (req, res, next) => {
    res.json({name: "rizal", email: "rznj@gmail.com"});
    next();
})

router.get( '/products', (req, res, next) => {
    res.json({name: "rizal", email: "rznj@gmail.com"});
    next();
})

router.put( '/products', (req, res, next) => {
    res.json({name: "rizal", email: "rznj@gmail.com"});
    next();
})

router.delete( '/products', (req, res, next) => {
    res.json({name: "rizal", email: "rznj@gmail.com"});
    next();
})


module.exports = router
