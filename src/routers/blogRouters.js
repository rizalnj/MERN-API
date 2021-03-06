const express = require('express');
const {body} = require('express-validator')

const router = express.Router();

const blogController = require('../controllers/blogController');
const { route } = require('./auth');


router.post('/post', [
    body('title').isLength({min: 5})
    .withMessage('input title min 5 karakter'), 
    body('body').isLength({min: 5})
    .withMessage('input body min 5 karakter')], 
    blogController.createBlogPost);

    router.get('/posts', blogController.getAllBlogPost);
    router.get('/posts/:postId', blogController.getBlogById);
    router.put('/posts/:postId', [
        body('title').isLength({min: 5})
        .withMessage('input title min 5 karakter'), 
        body('body').isLength({min: 5})
        .withMessage('input body min 5 karakter')], 
    blogController.updateBlogPost)

    router.delete('/posts/:postId', blogController.deleteBlogPost);


module.exports = router;