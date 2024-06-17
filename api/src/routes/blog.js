const express = require('express');
const {body} = require('express-validator');

const router = express.Router();
const blogController = require('../controllers/blog');

router.post('/create', [
  body('title').isLength({min: 5}).withMessage('Title must be at least 5 characters long.'),
  body('content').isLength({min: 5}).withMessage('Content must be at least 5 characters long.')
], blogController.createBlogPost);

router.get('/posts', blogController.getBlogPosts);
router.get('/post/:postId', blogController.getBlogPostById);
router.put('/post/:postId', [
  body('title').isLength({min: 5}).withMessage('Title must be at least 5 characters long.'),
  body('content').isLength({min: 5}).withMessage('Content must be at least 5 characters long.')
], blogController.updateBlogPost);

router.delete('/post/:postId', blogController.deleteBlogPost);

module.exports = router;