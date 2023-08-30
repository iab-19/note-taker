const express = require('express'); // Allow the use of express
const path = require('path'); // Import built in Node.js package to resolve path of files that are located on the server
const genUniqueId = require('generate-unique-id'); // Allow the use of the generate unique id package
// const notes = require('./db/db.json');
const fs = require('fs');
const api = require('./routes/index')


const app = express(); // Initialize an instance of express
const PORT = 2023;



// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const dbData = require('./db/db.json');

app.use(express.static('public')); // Point static middleware to the public folder

// Navigate to index.html
app.get('/', (req, res) => res.send('Navigate to /notes'));

// Navigate to notes.html
app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, 'public/notes.html'))
);



// TODO: Read the db.json file and return all saved notes as JSON at the route GET/api/notes
app.get('/api/notes', (req, res) => {
    res.json(dbData)
});

// TODO: Recive a new note to save on the request body, add it to the db.json file, and return
// the new note to the client at the route POST/api.notes
app.post('/api/notes', (req, res) => {
    // res.json(`${req.method} request received`);
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
        fs.readFile('./db/db.json', 'utf-8', (err, data) => {
            if (err) {
                console.error(err);
            } else {
                // convert string to json
                const parsedNotes = JSON.parse(data);

                // Add a new note
                parsedNotes.push(newNote);

                // Write updated notes to file
                fs.writeFile(
                    './db/db.json',
                    JSON.stringify(parsedNotes, null, 4),
                    (writeError) =>
                        writeError
                        ? console.error(writeError)
                        : console.log(`Note has been written to JSON file`)
                        );
            }
        })
        // const noteString = JSON.stringify(newNote);

        const response = {
            status: 'success',
            data: newNote,
        };
        console.log(response);

        // res.status(201).json(response);
        // res.json(`Note title and text has been added. Title: ${req.body.title}. Text: ${req.body.text}`)
    } else {
        res.json('Request body must contain a title and some text')
    }


    // Convert note data to string to save to db.json file




});

// TODO: Delete method



// Reroute to index.html whenever an invalid URL is entered
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'))
});
// Initialize server
app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT}`)
);
