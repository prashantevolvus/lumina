const User = require('../models/User');

const calculateCoins = (contribution) => {
  let coins = 0;

  switch (contribution.type) {
    case 'Article':
      coins = 10;
      break;
    case 'CodeSnippet':
      coins = 5;
      break;
    case 'ProjectImplementation':
      coins = 20;
      break;
    default:
      coins = 0;
  }

  return coins;
};

const updateCoinBalance = async (userId, coins) => {
  try {
    const user = await User.findById(userId);

    if (!user) {
      throw new Error('User not found');
    }

    user.coins += coins;
    await user.save();

    return user.coins;
  } catch (err) {
    console.error(err.message);
    throw new Error('Error updating coin balance');
  }
};

module.exports = {
  calculateCoins,
  updateCoinBalance,
};
