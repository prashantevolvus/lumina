const mongoose = require('mongoose');

const contributionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  type: {
    type: String,
    enum: ['Article', 'CodeSnippet', 'ProjectImplementation'],
    required: true,
  },
  coins: {
    type: Number,
    default: 0,
  },
});

contributionSchema.methods.rewardContribution = function (coins) {
  this.coins += coins;
  return this.save();
};

const Contribution = mongoose.model('Contribution', contributionSchema);

module.exports = Contribution;
