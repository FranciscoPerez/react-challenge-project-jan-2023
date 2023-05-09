const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: String,
  password: String,
}, {
  timestamps: true,
  collection: 'User',
});

module.exports = mongoose.model('User', UserSchema);