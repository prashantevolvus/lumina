const mongoose = require('mongoose');

const trainingSessionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  participants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
});

trainingSessionSchema.methods.registerParticipant = function (userId) {
  if (!this.participants.includes(userId)) {
    this.participants.push(userId);
  }
  return this.save();
};

trainingSessionSchema.methods.trackProgress = function (userId, progress) {
  // Logic to track participant's progress
};

const TrainingSession = mongoose.model('TrainingSession', trainingSessionSchema);

module.exports = TrainingSession;
