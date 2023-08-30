const express = require('express'); // Allow the use of express
const path = require('path'); // Import built in Node.js package to resolve path of files that are located on the server
const api = require('./routes/index');

// const dbData = require('../db/db.json');
const PORT = 2023;

const app = express(); // Initialize an instance of express


// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);

app.use(express.static('public')); // Point static middleware to the public folder

// Navigate to index.html
app.get('/', (req, res) => res.send('Navigate to /notes'));

// Navigate to notes.html
app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, 'public/notes.html'))
);

// Reroute to index.html whenever an invalid URL is entered(Wildcard route)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'))
});
// Initialize server
app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT}`)
);
