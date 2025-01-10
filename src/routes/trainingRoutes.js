const express = require('express');
const router = express.Router();
const trainingController = require('../controllers/trainingController');
const authMiddleware = require('../middleware/authMiddleware');

// Publish training session route
router.post('/', authMiddleware, trainingController.publishTrainingSession);

// Edit training session route
router.put('/:id', authMiddleware, trainingController.editTrainingSession);

// Delete training session route
router.delete('/:id', authMiddleware, trainingController.deleteTrainingSession);

// Register participant route
router.post('/:id/register', authMiddleware, trainingController.registerParticipant);

// Track participant progress route
router.post('/:id/progress', authMiddleware, trainingController.trackParticipantProgress);

module.exports = router;
