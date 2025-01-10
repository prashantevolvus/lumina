const Contribution = require('../models/Contribution');
const User = require('../models/User');

exports.publishContribution = async (req, res) => {
  const { title, content, type } = req.body;

  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    const contribution = new Contribution({
      title,
      content,
      type,
      author: user.id,
    });

    await contribution.save();

    user.coins += 10; // Reward 10 coins for publishing a contribution
    await user.save();

    res.json(contribution);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.editContribution = async (req, res) => {
  const { title, content, type } = req.body;

  try {
    const contribution = await Contribution.findById(req.params.id);

    if (!contribution) {
      return res.status(404).json({ msg: 'Contribution not found' });
    }

    if (contribution.author.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    contribution.title = title || contribution.title;
    contribution.content = content || contribution.content;
    contribution.type = type || contribution.type;

    await contribution.save();

    res.json(contribution);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.deleteContribution = async (req, res) => {
  try {
    const contribution = await Contribution.findById(req.params.id);

    if (!contribution) {
      return res.status(404).json({ msg: 'Contribution not found' });
    }

    if (contribution.author.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await contribution.remove();

    res.json({ msg: 'Contribution removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.rewardContribution = async (req, res) => {
  const { coins } = req.body;

  try {
    const contribution = await Contribution.findById(req.params.id);

    if (!contribution) {
      return res.status(404).json({ msg: 'Contribution not found' });
    }

    await contribution.rewardContribution(coins);

    res.json(contribution);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
