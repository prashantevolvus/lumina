const User = require('../models/User');
const Contribution = require('../models/Contribution');
const TrainingSession = require('../models/TrainingSession');

const generateUserReport = async (userId) => {
  try {
    const user = await User.findById(userId).populate('contributions');
    if (!user) {
      throw new Error('User not found');
    }

    const report = {
      name: user.name,
      email: user.email,
      level: user.level,
      coins: user.coins,
      contributions: user.contributions,
    };

    return report;
  } catch (err) {
    console.error('Error generating user report:', err.message);
    throw new Error('Error generating user report');
  }
};

const generateContributionReport = async () => {
  try {
    const contributions = await Contribution.find().populate('author');
    const report = contributions.map((contribution) => ({
      title: contribution.title,
      content: contribution.content,
      author: contribution.author.name,
      type: contribution.type,
      coins: contribution.coins,
    }));

    return report;
  } catch (err) {
    console.error('Error generating contribution report:', err.message);
    throw new Error('Error generating contribution report');
  }
};

const generateTrainingSessionReport = async () => {
  try {
    const trainingSessions = await TrainingSession.find().populate('participants');
    const report = trainingSessions.map((session) => ({
      title: session.title,
      date: session.date,
      description: session.description,
      participants: session.participants.map((participant) => participant.name),
    }));

    return report;
  } catch (err) {
    console.error('Error generating training session report:', err.message);
    throw new Error('Error generating training session report');
  }
};

module.exports = {
  generateUserReport,
  generateContributionReport,
  generateTrainingSessionReport,
};
