const Note = require('../../../models/Note');

const findNotes = (data, res, next) => Note.find(data)
  .select('-email')
  .sort({ date: -1 })
  .then((notes) => {
    if (notes.length > 0) {
      res.status(200).json(notes);
    } else {
      res.status(200).json({
        message: 'Notes Note Found.',
      });
    }
  })
  .catch((err) => {
    const error = new Error(err);
    res.status(422);
    next(error);
  });

module.exports = { findNotes };
