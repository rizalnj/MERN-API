const {validationResult} = require('express-validator');
const BlogPost = require ('../models/blogModels')

exports.createBlogPost = (req, res, next) => {
    const errors = validationResult(req);
    
    if(!errors.isEmpty()){
       const err = new Error('Input Value Tidak Sesuai');
       err.errorsStatus = 400;
       err.data = errors.array();
       throw err;
    }

    if(!req.file) {
        const err = new Error('Image Harus di Upload');
        err.errorStatus = 422;
        throw err;
    }

    const title = req.body.title;
    const image = req.file.path;
    const body = req.body.body;


// posting di sini =>
    const Posting = new BlogPost ({
        title: title,
        image: image,
        body: body,
        author: {uid: 1, name: 'Rizal Nurjamal'}
    })
     
    // save di sini
    Posting.save()
    .then(result => {
        res.status(201).json({
            message: 'Create Blog Success',
            data: result
        });
    })
    .catch(err => {
        console.log('err:  ', err);
    });
}

exports.getAllBlogPost = (req, res, next) => {
    BlogPost.find()
    .then(result => {
        res.status(200).json({
            massage: 'Data Blog Berhasil Dipanggil',
            data: result
        })
    })
    .catch(err => {
    next(err)    
    })
}

exports.getBlogById = (req, res, next) => {
    const postId = req.params.postId;
    BlogPost.findById(postId)
    .then(result => {
        if(!result) {
            const error = new Error('Blog Post Tidak Ditemukan')
            error.errorStatus = 404;
            throw error;
        }
        res.status(200).json({
            message: 'Data Blog Post Berhasil Dipanggil',
            data: result,
        })

    })
    .catch(err => {
        next(err);
    })
}