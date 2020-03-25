const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const requiredString = {
  type: String,
  require: true,
};

const requiredDate = {
  type: Date,
  default: Date.now,
};

const UserSchema = new Schema({
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: requiredString,
  username: requiredString,
  active: {
    type: Boolean,
  },
  role: requiredString,
  __v: {
    type: Number,
    select: false,
  },
  createdAt: requiredDate,
  updatedAt: requiredDate,
}, {
  timestamps: true,
});

module.exports = model('User', UserSchema);
