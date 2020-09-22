const express = require('express');

const app = express();
const productsRoutes = require('./src/routers/products');

app.use('/', productsRoutes);

app.listen(4000);