const db = require('../db/config');

// Add a like
const addLike = (userId, postId, callback) => {
  const sql = 'INSERT INTO likes (user_id, post_id) VALUES (?, ?)';
  db.query(sql, [userId, postId], callback);
};

// Remove a like
const removeLike = (userId, postId, callback) => {
  const sql = 'DELETE FROM likes WHERE user_id = ? AND post_id = ?';
  db.query(sql, [userId, postId], callback);
};

// Get likes for a specific post
const getLikesByPostId = (postId, callback) => {
  const sql = 'SELECT * FROM likes WHERE post_id = ?';
  db.query(sql, [postId], callback);
};

module.exports = {
  addLike,
  removeLike,
  getLikesByPostId,
};
