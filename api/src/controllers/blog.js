const {validationResult} = require('express-validator');
const BlogPost = require('../models/blog');
const path = require('path');
const fs = require('fs');

exports.createBlogPost = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error('Validation failed.');
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }

  if (!req.file) {
    const error = new Error('Image must be provided.');
    error.statusCode = 422;
    throw error;
  }

  const title = req.body.title;
  const content = req.body.content;
  const image = req.file.path;

  const Posting = new BlogPost({
    title: title,
    content: content,
    image: image,
    author: {
      uid: 1,
      name: 'Eliavina'
    }
  });

  Posting.save()
    .then(result => {
      res.status(201).json({
        message: 'Blog post created successfully!',
        data: result
      });
    })
    .catch(err => {
      next(err);
    });
};

exports.getBlogPosts = (req, res, next) => {
  const currentPage = req.query.page || 1;
  const perPage = req.query.perPage || 5;
  let totalItems;

  BlogPost.find()
    .countDocuments()
    .then(count => {
      totalItems = count;
      return BlogPost.find()
        .skip((parseInt(currentPage) - 1) * parseInt(perPage))
        .limit(parseInt(perPage));
    })
    .then(posts => {
      res.status(200).json({
        message: 'Fetched posts successfully.',
        data: posts,
        totalItems: totalItems,
        perPage: parseInt(perPage),
        currentPage: currentPage
      });
    })
    .catch(err => {
      next(err);
    });
};

exports.getBlogPostById = (req, res, next) => {
  const postId = req.params.postId;

  BlogPost.findById(postId)
    .then(post => {
      if (!post) {
        const error = new Error('Post not found.');
        error.statusCode = 404;
        throw error;
      }

      res.status(200).json({
        message: 'Post fetched.',
        data: post
      });
    })
    .catch(err => {
      next(err);
    });
};

exports.updateBlogPost = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error('Validation failed.');
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }

  if (!req.file) {
    const error = new Error('Image must be provided.');
    error.statusCode = 422;
    throw error;
  }

  const postId = req.params.postId;
  const title = req.body.title;
  const content = req.body.content;
  const image = req.file.path;

  BlogPost.findById(postId)
    .then(post => {
      if (!post) {
        const error = new Error('Post not found.');
        error.statusCode = 404;
        throw error;
      }

      post.title = title;
      post.content = content;
      post.image = image;

      return post.save();
    })
    .then(result => {
      res.status(200).json({
        message: 'Blog post updated successfully!',
        data: result
      });
    })
    .catch(err => {
      next(err);
    });
};

exports.deleteBlogPost = (req, res, next) => {
  const postId = req.params.postId;

  BlogPost.findById(postId)
    .then(post => {
      if (!post) {
        const error = new Error('Post not found.');
        error.statusCode = 404;
        throw error;
      }

      removeImage(post.image);
      return BlogPost.findByIdAndRemove(postId);
    })
    .then(result => {
      res.status(200).json({
        message: 'Blog post deleted successfully!',
        data: result
      });
    })
    .catch(err => {
      next(err);
    });
};

const removeImage = filePath => {
  filePath = path.join(__dirname, '../..', filePath);
  fs.unlink(filePath, err => console.log(err));
};