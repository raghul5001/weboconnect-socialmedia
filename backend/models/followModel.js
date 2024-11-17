const db = require('../db/config');

// Follow a user
const followUser = (followerId, followingId, callback) => {
  const sql = 'INSERT INTO follows (follower_id, following_id) VALUES (?, ?)';
  db.query(sql, [followerId, followingId], callback);
};

// Unfollow a user
const unfollowUser = (followerId, followingId, callback) => {
  const sql = 'DELETE FROM follows WHERE follower_id = ? AND following_id = ?';
  db.query(sql, [followerId, followingId], callback);
};

// Get followers for a user
const getFollowers = (userId, callback) => {
  const sql = `
    SELECT users.*
    FROM follows
    JOIN users ON follows.follower_id = users.id
    WHERE follows.following_id = ?
  `;
  db.query(sql, [userId], callback);
};

// Get users a specific user is following
const getFollowing = (userId, callback) => {
  const sql = `
    SELECT users.*
    FROM follows
    JOIN users ON follows.following_id = users.id
    WHERE follows.follower_id = ?
  `;
  db.query(sql, [userId], callback);
};

module.exports = {
  followUser,
  unfollowUser,
  getFollowers,
  getFollowing,
};
