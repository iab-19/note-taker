const express = require('express'); // Allow the use of express
const path = require('path'); // Import built in Node.js package to resolve path of files that are located on the server
const genUniqueId = require('generate-unique-id'); // Allow the use of the generate unique id package
// const notes = require('./db/db.json');


const app = express(); // Initialize an instance of express
const PORT = 2023;

app.use(express.static('public')); // Point static middleware to the public folder
app.use(express.urlencoded({ extended: true }));

const dbData = require('./db/db.json');

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
    console.info(`${req.method} request received`);

    let response;

    if (req.body && req.body.title) {
        response = {
            status: 'success',
            data: req.body,
        };
        res.json(`Note title and text has been added. Title: ${req.body.title}. Text: ${req.body.text}`)
    } else {
        res.json('Request body must contain a title and some text')
    }

    console.log(req.body);
    // console.log(req.body.noteText);

    // console.info(req.rawHeaders);



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
