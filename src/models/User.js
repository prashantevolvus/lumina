const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  level: {
    type: String,
    enum: ['Explorer', 'Contributor', 'Innovator', 'Visionary'],
    default: 'Explorer',
  },
  coins: {
    type: Number,
    default: 0,
  },
});

userSchema.methods.publishContribution = function (contribution) {
  // Logic to publish a contribution
};

userSchema.methods.upgradeLevel = function () {
  // Logic to upgrade user level based on coin milestones
};

const User = mongoose.model('User', userSchema);

module.exports = User;
