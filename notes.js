console.log("Starting notes.js");

const fs = require('fs');

/**
 * Reads the notes from a JSON file and returns an object
 */
var fetchNotes = () => {
  try {
    var notesString = fs.readFileSync('notes.json');
    return JSON.parse(notesString);
  } catch (error) {
    return [];
  }
};

/**
 * Writes the notes from an object into a JSON file
 */
var saveNotes = (notes) => {
  fs.writeFileSync('notes.json', JSON.stringify(notes));
};

/**
 * Add a note
 * @param {string} title Title of the note
 * @param {string} body Body of the note
 */
var addNote = (title, body) => {
  var notes = fetchNotes();
  var note = {
    title,
    body
  };
  var duplicateNotes = notes.filter((note) => note.title === title);

  if (duplicateNotes.length === 0) {
    notes.push(note);
    saveNotes(notes);
    return note;
  }
};

/**
 * Get all notes
 */
var getAll = () => {
  return fetchNotes();
};

/**
 * Gets a note for a given title
 * @param {string} title Title of the note
 */
var getNote = (title) => {
  var notes = fetchNotes();
  var filteredNotes = notes.filter((note) => note.title === title);
  return filteredNotes[0];
};

/**
 * Removes a note for a given title
 * @param {string} title Title of the note
 */
var removeNote = (title) => {
  var notes = fetchNotes();
  var filteredNotes = notes.filter((note) => note.title !== title);
  saveNotes(filteredNotes);

  return notes.length !== filteredNotes.length;
};

var logNote = (note) => {
  console.log('----------');
  console.log(`Title: ${note.title}`);
  console.log(`Body: ${note.body}`);
};

module.exports = {
  addNote,
  getAll,
  getNote,
  removeNote,
  logNote
};