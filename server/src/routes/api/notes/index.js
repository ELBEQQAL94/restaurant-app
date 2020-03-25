const express = require('express');

const router = express.Router();

const { getNotes, createNote } = require('../../../controller/api/notes');
const validateNote = require('./notes.middlewares');


// GET all notes
router.get('/', getNotes);

// POST Note
router.post('/', validateNote, createNote);


module.exports = router;
