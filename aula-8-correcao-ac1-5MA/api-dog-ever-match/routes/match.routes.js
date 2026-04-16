const express = require('express');
const { getMatch, postMatch } = require('../controllers/match.controller');
const authenticate = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/getMatch', authenticate , getMatch);
router.get('/postMatch', authenticate , postMatch);

module.exports = router;