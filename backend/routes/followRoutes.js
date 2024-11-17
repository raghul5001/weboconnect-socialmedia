const express = require('express');
const {
  followUser,
  unfollowUser,
  getFollowers,
  getFollowing,
} = require('../controllers/followController');
const authenticate = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/follow', authenticate, followUser);
router.post('/unfollow', authenticate, unfollowUser);
router.get('/:userId/followers', authenticate, getFollowers);
router.get('/:userId/following', authenticate, getFollowing);

module.exports = router;
