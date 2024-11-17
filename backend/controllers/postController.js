const postModel = require('../models/postModel');

// Create a new post
exports.createPost = (req, res) => {
  const { content } = req.body;
  const userId = req.user.id; // Extracted from the token by authMiddleware

  if (!content || content.trim() === '') {
    return res.status(400).send({ message: 'Content cannot be empty' });
  }

  postModel.createPost(userId, content, (err, result) => {
    if (err) {
      console.error('Error creating post:', err);
      return res.status(500).send({ message: 'Database error' });
    }
    res.status(201).send({ message: 'Post created successfully!', postId: result.insertId });
  });
};

// Get all posts
exports.getAllPosts = (req, res) => {
  postModel.getAllPosts((err, results) => {
    if (err) {
      console.error('Error fetching posts:', err);
      return res.status(500).send({ message: 'Database error' });
    }
    res.status(200).send(results);
  });
};

// Get feed posts
exports.getFeedPosts = (req, res) => {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(400).json({ message: 'User ID is missing or invalid' });
    }
  
    postModel.getFeedPosts(userId, (err, results) => {
      if (err) {
        console.error('Error fetching feed posts:', err);
        return res.status(500).json({ message: 'Database error' });
      }
      res.json(results);
    });
  };
  
  exports.likePost = (req, res) => {
    const { postId } = req.params;
    const userId = req.user.id;
  
    if (!postId || !userId) {
      return res.status(400).json({ message: 'Post ID or User ID is missing' });
    }
  
    postModel.likePost(postId, userId, (err, result) => {
      if (err) {
        console.error('Error liking post:', err);
        return res.status(500).json({ message: 'Database error while liking post' });
      }
      res.status(200).json({ message: 'Post liked successfully' });
    });
  };

  exports.addComment = (req, res) => {
    const { postId } = req.params;
    const { content } = req.body;
    const userId = req.user.id;
  
    if (!postId || !userId || !content) {
      return res.status(400).json({ message: 'Post ID, User ID, or comment content is missing' });
    }
  
    postModel.addComment(postId, userId, content, (err, result) => {
      if (err) {
        console.error('Error adding comment:', err);
        return res.status(500).json({ message: 'Database error while adding comment' });
      }
      res.status(201).json({ message: 'Comment added successfully', commentId: result.insertId });
    });
  };
  exports.getComments = (req, res) => {
    const { postId } = req.params;
  
    postModel.getCommentsByPostId(postId, (err, results) => {
      if (err) {
        console.error('Error fetching comments:', err);
        return res.status(500).json({ message: 'Database error while fetching comments' });
      }
      res.status(200).json(results);
    });
  };