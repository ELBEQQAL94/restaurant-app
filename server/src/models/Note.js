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

const NoteSchema = new Schema({
  title: requiredString,
  description: requiredString,
  email: requiredString,
  user_id: requiredString,
  __v: {
    type: Number,
    select: false,
  },
  createdAt: requiredDate,
  updatedAt: requiredDate,
}, {
  timestamps: true,
});

module.exports = model('Note', NoteSchema);
