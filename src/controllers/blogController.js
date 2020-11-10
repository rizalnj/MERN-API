const {
    validationResult
} = require('express-validator');
const path = require('path');
const fs = require('fs');
const BlogPost = require('../models/blogModels');
const { count } = require('console');

exports.createBlogPost = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const err = new Error('Input Value Tidak Sesuai');
        err.errorsStatus = 400;
        err.data = errors.array();
        throw err;
    }

    if (!req.file) {
        const err = new Error('Image Harus di Upload');
        err.errorStatus = 422;
        throw err;
    }

    const title = req.body.title;
    const image = req.file.path;
    const body = req.body.body;


    // posting di sini =>
    const Posting = new BlogPost({
        title: title,
        image: image,
        body: body,
        author: {
            uid: 1,
            name: 'Rizal Nurjamal'
        }
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

// memanggil semua postingan data yang ada
exports.getAllBlogPost = (req, res, next) => {
    const currentPage = req.query.page || 1;
    const perPage = req.query.perPage || 5;
    let totalData;

    BlogPost.find()
    .countDocuments()
    .then(count => {
        totalData = count;
        return BlogPost.find()
        .skip((currentPage - 1) * perPage)
        .limit(perPage);
    })
    .then(result => {
        res.status(200).json({
            massage: 'Data Blog Berhasil Dipanggil',
            data: result
        })
    })
    .catch(err => {
        next(err);
    })    
}

// mengabil postingan data berdasarkan id
exports.getBlogById = (req, res, next) => {
    const postId = req.params.postId;
    BlogPost.findById(postId)
        .then(result => {
            if (!result) {
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

exports.updateBlogPost = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const err = new Error('Input Value Tidak Sesuai');
        err.errorsStatus = 400;
        err.data = errors.array();
        throw err;
    }

    if (!req.file) {
        const err = new Error('Image Harus di Upload');
        err.errorStatus = 422;
        throw err;
    }

    const title = req.body.title;
    const image = req.file.path;
    const body = req.body.body;
    const postId = req.params.postId;

    BlogPost.findById(postId)
        .then(post => {
            if (!post) {
                const err = new Error('Blog Post tidak ditemukan');
                err.errorStatus = 404;
                throw err;
            }

            post.title = title;
            post.body = body;
            post.image = image;

            return post.save();
        })
        //  jika sukses
        .then(result => {
            res.status(200).json({
                message: 'Update Sukses',
                data: result,
            })
        })
        //  jika error =>>>
        .catch(err => {
            next(err);
        })

}

exports.deleteBlogPost = (req, res, next) => {
    const postId = req.params.postId;

    BlogPost.findById(postId)
        .then(post => {
            if (!post) {
                const error = new Error('Blog Post tidak ditemukan');
                error.errorStatus = 404;
                throw error;
            }
            // remove image & postingnya
            removeImage(post.image);
            return BlogPost.findByIdAndRemove(postId);
        })
        .then(result => {
            res.status(200).json({
                message: 'Menghapus Blog Post Berhasil',
                data: result,
            })
        })
        .catch(err => {
            next(err);
        })
}
// fungsi hapus image
const removeImage = (filePath) => {
    console.log('filePath', filePath)
    console.log('dir_name', __dirname);
    // menggabungkan 2 path agar bisa masuk ke polder Images
    filePath = path.join(__dirname, '../..', filePath);
    // cara remove
    fs.unlink(filePath, err => console.log(err));

}