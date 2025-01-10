const User = require('../models/User');

const levelMilestones = {
  Explorer: 0,
  Contributor: 100,
  Innovator: 500,
  Visionary: 1000,
};

const upgradeUserLevel = (user) => {
  let upgraded = false;

  if (user.coins >= levelMilestones.Visionary && user.level !== 'Visionary') {
    user.level = 'Visionary';
    upgraded = true;
  } else if (user.coins >= levelMilestones.Innovator && user.level !== 'Innovator') {
    user.level = 'Innovator';
    upgraded = true;
  } else if (user.coins >= levelMilestones.Contributor && user.level !== 'Contributor') {
    user.level = 'Contributor';
    upgraded = true;
  }

  return upgraded;
};

const checkAndUpdateUserLevels = async () => {
  try {
    const users = await User.find();

    users.forEach((user) => {
      const upgraded = upgradeUserLevel(user);

      if (upgraded) {
        user.save();
      }
    });
  } catch (err) {
    console.error('Error checking and updating user levels:', err.message);
  }
};

module.exports = {
  upgradeUserLevel,
  checkAndUpdateUserLevels,
};
