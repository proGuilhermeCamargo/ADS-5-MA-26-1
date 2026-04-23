const express = require('express');
const { register, login, getTeste } = require('../controllers/auth.controller');
const authenticate = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/teste', getTeste);

module.exports = router;
