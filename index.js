const express = require('express');
const bodyParser = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path')

const app = express();
// const productsRoutes = require('./src/routers/products');
const authRoutes = require('./src/routers/auth');
const blogRoutes = require('./src/routers/blogRouters');

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images')
    },
    filename: (req, file, cb) => {
        cb(null, new Date().getTime() + '-' + file.originalname)
    }
})

// filter hanya file Image yang di upload
const fileFilter  = (req, file, cb) => {
    if(
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jpeg'
    ){
        cb(null, true);
    }else {
        cb(null, false);
    }

}

app.use(bodyParser.json()) // type JSON
app.use('/images', express.static(path.join(__dirname, 'images')))
app.use(multer({storage: fileStorage, fileFilter: fileFilter}).single('image'))


// cors BE
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next()
})

// app.use('/', productsRoutes);
app.use('/v1/auth', authRoutes);
app.use('/v1/blog', blogRoutes);

app.use((error, req, res, next) => {
    const status = error.errorsStatus || 500;
    const message = error.message;
    const data = error.data;

    res.status(status).json({message: message, data: data});
});

/* untuk koneksi mongoose */
mongoose.connect('mongodb+srv://Rizalnj:135709miza@cluster0.mvjzb.mongodb.net/blog?retryWrites=true&w=majority', {
    useNewUrlParser: true, 
    useUnifiedTopology: true
})
.then(() => {
    app.listen(4000);
})
.catch(err => console.log(err));
