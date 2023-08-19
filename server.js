const express = require('express'); // Allow the use of express
const path = require('path'); // Import built in Node.js package to resolve path of files that are located on the server

const app = express(); // Initialize an instance of express
const PORT = 2023;

app.use(express.static('public')); // Point static middleware to the public folder

// Navigate to index.html
app.get('/', (req, res) => res.send('Navigate to /notes'));

// Navigate to notes.html
app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, 'public/notes.html'))
);

// Reroute to index.html whenever an invalid URL is entered
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

// TODO: Read the db.json file and return all saved notes as JSON at the route GET/api/notes


// TODO: Recive a new note to save on the request body, add it to the db.json file, and return
// the new note to the client at the route POST/api.notes

// Initialize server
app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT}`)
);
