const express = require('express');
const router = express.Router();
const contributionController = require('../controllers/contributionController');
const authMiddleware = require('../middleware/authMiddleware');

// Publish contribution route
router.post('/', authMiddleware, contributionController.publishContribution);

// Edit contribution route
router.put('/:id', authMiddleware, contributionController.editContribution);

// Delete contribution route
router.delete('/:id', authMiddleware, contributionController.deleteContribution);

// Reward contribution with coins route
router.post('/:id/reward', authMiddleware, contributionController.rewardContribution);

module.exports = router;
