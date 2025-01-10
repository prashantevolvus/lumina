const User = require('../models/User');

const getTopContributors = async (limit = 10) => {
  try {
    const topContributors = await User.find()
      .sort({ coins: -1 })
      .limit(limit)
      .select('name level coins');

    return topContributors;
  } catch (err) {
    console.error(err.message);
    throw new Error('Error retrieving top contributors');
  }
};

const displayLeaderboard = async (limit = 10) => {
  try {
    const topContributors = await getTopContributors(limit);

    console.log('Leaderboard:');
    topContributors.forEach((user, index) => {
      console.log(
        `${index + 1}. ${user.name} - Level: ${user.level} - Coins: ${user.coins}`
      );
    });
  } catch (err) {
    console.error(err.message);
    throw new Error('Error displaying leaderboard');
  }
};

module.exports = {
  getTopContributors,
  displayLeaderboard,
};
