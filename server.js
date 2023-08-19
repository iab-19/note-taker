const express = require('express'); // Allow the use of express
const path = require('path'); // Import built in Node.js package to resolve path of files that are located on the server

const app = express(); // Initialize an instance of express
const PORT = 2023;

app.use(express.static('public')); // Point static middleware to the public folder

app.get('/', (req, res) => res.send('Navigate to /notes')); // Navigate to index.html

app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, 'public/notes.html')) // Navigate to notes.html
);

// Initialize server
app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT}`)
);
