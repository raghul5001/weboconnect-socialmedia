const express = require('express');
const { createPost, getAllPosts, getFeedPosts ,likePost ,addComment,getComments } = require('../controllers/postController');
const authenticate = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/create', authenticate, createPost);
router.get('/all', authenticate, getAllPosts);
router.get('/feed', authenticate, getFeedPosts);
router.post('/like/:postId', authenticate, likePost);
router.post('/comment/:postId', authenticate, addComment);
router.get('/comments/:postId', authenticate, getComments);


module.exports = router;
