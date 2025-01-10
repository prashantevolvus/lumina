const TrainingSession = require('../models/TrainingSession');

// Publish training session
exports.publishTrainingSession = async (req, res) => {
  try {
    const { title, date, description } = req.body;
    const trainingSession = new TrainingSession({ title, date, description });
    await trainingSession.save();
    res.status(201).json(trainingSession);
  } catch (error) {
    res.status(500).json({ message: 'Failed to publish training session', error });
  }
};

// Edit training session
exports.editTrainingSession = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, date, description } = req.body;
    const trainingSession = await TrainingSession.findByIdAndUpdate(
      id,
      { title, date, description },
      { new: true }
    );
    if (!trainingSession) {
      return res.status(404).json({ message: 'Training session not found' });
    }
    res.status(200).json(trainingSession);
  } catch (error) {
    res.status(500).json({ message: 'Failed to edit training session', error });
  }
};

// Delete training session
exports.deleteTrainingSession = async (req, res) => {
  try {
    const { id } = req.params;
    const trainingSession = await TrainingSession.findByIdAndDelete(id);
    if (!trainingSession) {
      return res.status(404).json({ message: 'Training session not found' });
    }
    res.status(200).json({ message: 'Training session deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete training session', error });
  }
};

// Register participant
exports.registerParticipant = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const trainingSession = await TrainingSession.findById(id);
    if (!trainingSession) {
      return res.status(404).json({ message: 'Training session not found' });
    }
    await trainingSession.registerParticipant(userId);
    res.status(200).json(trainingSession);
  } catch (error) {
    res.status(500).json({ message: 'Failed to register participant', error });
  }
};

// Track participant progress
exports.trackParticipantProgress = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId, progress } = req.body;
    const trainingSession = await TrainingSession.findById(id);
    if (!trainingSession) {
      return res.status(404).json({ message: 'Training session not found' });
    }
    await trainingSession.trackProgress(userId, progress);
    res.status(200).json(trainingSession);
  } catch (error) {
    res.status(500).json({ message: 'Failed to track participant progress', error });
  }
};
