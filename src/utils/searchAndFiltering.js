const Contribution = require('../models/Contribution');
const TrainingSession = require('../models/TrainingSession');

const searchContributions = async (query) => {
  try {
    const contributions = await Contribution.find({
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { content: { $regex: query, $options: 'i' } },
        { type: { $regex: query, $options: 'i' } },
      ],
    });
    return contributions;
  } catch (err) {
    console.error(err.message);
    throw new Error('Error searching contributions');
  }
};

const filterContributions = async (type) => {
  try {
    const contributions = await Contribution.find({ type });
    return contributions;
  } catch (err) {
    console.error(err.message);
    throw new Error('Error filtering contributions');
  }
};

const searchTrainingSessions = async (query) => {
  try {
    const trainingSessions = await TrainingSession.find({
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } },
      ],
    });
    return trainingSessions;
  } catch (err) {
    console.error(err.message);
    throw new Error('Error searching training sessions');
  }
};

const filterTrainingSessions = async (date) => {
  try {
    const trainingSessions = await TrainingSession.find({ date });
    return trainingSessions;
  } catch (err) {
    console.error(err.message);
    throw new Error('Error filtering training sessions');
  }
};

module.exports = {
  searchContributions,
  filterContributions,
  searchTrainingSessions,
  filterTrainingSessions,
};
