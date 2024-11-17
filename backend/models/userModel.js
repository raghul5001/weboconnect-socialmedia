const db = require('../db/config');

// Create a new user
const createUser = (username, hashedPassword, callback) => {
  const sql = 'INSERT INTO users (username, password) VALUES (?, ?)';
  db.query(sql, [username, hashedPassword], callback);
};

// Find a user by username
const findUserByUsername = (username, callback) => {
  const sql = 'SELECT * FROM users WHERE username = ?';
  db.query(sql, [username], callback);
};

// Find a user by ID
const findUserById = (id, callback) => {
  const sql = 'SELECT * FROM users WHERE id = ?';
  db.query(sql, [id], callback);
};

module.exports = {
  createUser,
  findUserByUsername,
  findUserById,
};
