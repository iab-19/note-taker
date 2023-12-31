const note = require('express').Router();
const genUniqueId = require('generate-unique-id'); // Allow the use of the generate unique id package
const { readFromFile, writeToFile, readAndAppend } = require('../helpers/fsUtils');

// Read the db.json file and return all saved notes as JSON at the route GET/api/notes
note.get('/', (req, res) => {
    console.info(`${req.method} request received for notes`);
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});


// Recive a new note to save on the request body, add it to the db.json file, and return
// the new note to the client at the route POST/api.notes
note.post('/', (req, res) => {
    console.info(`${req.method} request received to add a new note`);

    // Destructuring assignment
    const { title, text } = req.body;
    console.info(req.body);
    if (title && text) {
        const newNote = {
            title,
            text,
            // generate a unique id with 4 characters
            noteId : genUniqueId({
                length: 4
               }),
        };

        // read file and get existing notes
       readAndAppend(newNote, './db/db.json');
        // const noteString = JSON.stringify(newNote);

        const response = {
            status: 'success',
            data: newNote,
        };
        res.json(response);

    } else {
        res.json('Request body must contain a title and some text');
    }

});


// Delete method
note.delete('/:noteId', (req, res) => {
    const note_id = req.params.noteId;
    readFromFile('./db/db.json')
    .then((data) => JSON.parse(data))
    .then((json) => {
        // Make a new array for the notes except the deleted note
        const result = json.filter((note) => note.noteId !== note_id);

        // Save array
        writeToFile('./db/db.json', result);

        // Respond to the Delete request
        res.json(`Note ${note_id} has been deleted`);
    });
});


module.exports = note;
