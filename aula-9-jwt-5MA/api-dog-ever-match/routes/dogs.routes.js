const express = require('express');
const { getAllDogs, getAllDogsPerOrder } = require('../controllers/dogs.controller');
const authenticate = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/getAllDogs', authenticate, getAllDogs);
router.get('/getAllDogsPerOrder',getAllDogsPerOrder);

module.exports = router;
