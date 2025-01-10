const User = require('../models/User');
const TrainingSession = require('../models/TrainingSession');

const sendNotification = async (userId, message) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    // Logic to send notification to the user
    console.log(`Notification sent to ${user.email}: ${message}`);
  } catch (err) {
    console.error(err.message);
  }
};

const notifyNewTrainingSession = async (trainingSessionId) => {
  try {
    const trainingSession = await TrainingSession.findById(trainingSessionId);
    if (!trainingSession) {
      throw new Error('Training session not found');
    }

    const participants = trainingSession.participants;
    const message = `New training session: ${trainingSession.title} on ${trainingSession.date}`;

    for (const participant of participants) {
      await sendNotification(participant, message);
    }
  } catch (err) {
    console.error(err.message);
  }
};

module.exports = {
  sendNotification,
  notifyNewTrainingSession,
};
