const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

// User registration route
router.post('/register', userController.registerUser);

// User login route
router.post('/login', userController.loginUser);

// User profile management route
router.get('/profile', authMiddleware, userController.getUserProfile);
router.put('/profile', authMiddleware, userController.updateUserProfile);

// Publish contribution route
router.post('/contributions', authMiddleware, userController.publishContribution);

// Upgrade level route
router.post('/upgrade-level', authMiddleware, userController.upgradeUserLevel);

module.exports = router;
