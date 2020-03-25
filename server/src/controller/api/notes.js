const { findNotes } = require('./helpers/notes');

const Note = require('../../models/Note');

// GET All NOTES
// GET http://localhost:8080/api/v1/notes
// --------------------------------------
exports.getNotes = (req, res, next) => {
  const data = { user_id: req.user._id };
  findNotes(data, res, next);
};

// Create NOTE
// POST Request To http://localhost:8080/api/v1/notes
// -------------------------------------------------
exports.createNote = (req, res) => {
  const note = {
    ...req.body,
    user_id: req.user._id,
    email: req.user.email,
  };

  // create new note
  const newNote = new Note(note);

  // insert note to db
  newNote.save();

  res.status(200).json({
    message: 'Note is created!',
    note: newNote,
  });
};
