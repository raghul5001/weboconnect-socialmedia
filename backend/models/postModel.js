const db = require('../db/config');

// Create a new post
const createPost = (userId, content, callback) => {
  const sql = 'INSERT INTO posts (user_id, content) VALUES (?, ?)';
  db.query(sql, [userId, content], callback);
};
const likePost = (postId, userId, callback) => {
    const sql = `
      INSERT INTO likes (post_id, user_id)
      VALUES (?, ?)
      ON DUPLICATE KEY UPDATE post_id = post_id;
    `;
    db.query(sql, [postId, userId], callback);
  };
// Get all posts (with user details)
const getAllPosts = (callback) => {
  const sql = `
    SELECT posts.*, users.username
    FROM posts
    JOIN users ON posts.user_id = users.id
    ORDER BY posts.created_at DESC
  `;
  db.query(sql, callback);
};

// Get a specific post by ID
const getPostById = (postId, callback) => {
  const sql = 'SELECT * FROM posts WHERE id = ?';
  db.query(sql, [postId], callback);
};

// Delete a post by ID
const deletePostById = (postId, callback) => {
  const sql = 'DELETE FROM posts WHERE id = ?';
  db.query(sql, [postId], callback);
};

const getFeedPosts = (userId, callback) => {
    console.log('Fetching posts for User ID:', userId); // Debugging Log
  
    const sql = `
      SELECT posts.*, users.username
      FROM posts
      JOIN users ON posts.user_id = users.id
      LEFT JOIN follows ON follows.following_id = posts.user_id
      WHERE follows.follower_id = ? OR posts.user_id = ?
      ORDER BY posts.created_at DESC;
    `;
  
    db.query(sql, [userId, userId], (err, results) => {
      if (err) {
        console.error('Error executing SQL query:', err); // Debugging Log
        return callback(err);
      }
      console.log('Feed Posts Results:', results); // Debugging Log
      callback(null, results);
    });
  };
  const addComment = (postId, userId, content, callback) => {
    const sql = `
      INSERT INTO comments (post_id, user_id, content)
      VALUES (?, ?, ?)
    `;
    db.query(sql, [postId, userId, content], callback);
  };
  
  const getCommentsByPostId = (postId, callback) => {
    const sql = `
      SELECT comments.*, users.username
      FROM comments
      JOIN users ON comments.user_id = users.id
      WHERE comments.post_id = ?
      ORDER BY comments.created_at ASC
    `;
    db.query(sql, [postId], callback);
  };

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  deletePostById,
  getFeedPosts, // Export the newly added function
  likePost,
  getCommentsByPostId,
  addComment
};
