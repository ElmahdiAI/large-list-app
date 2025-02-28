const express = require('express');
const fs = require('fs').promises;
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());

const USERS_FILE_PATH = 'usernames.txt';
const CHUNK_SIZE = 100;

// Asynchronously reads user data from the file.
async function readUsersFromFile() {
    try {
        const data = await fs.readFile(USERS_FILE_PATH, 'utf8'); // Read the file contents as a string
        return data.split('\n').filter(name => name).map(name => name.toUpperCase());
    } catch (error) {
        console.error('Error reading user file:', error);
        return [];
    }
}

// --- API Endpoint: /users ---
app.get('/users', async (req, res) => {
    const startChar = req.query.startChar;

    // --- Input Validation ---
    if (!startChar) {
        return res.status(400).send('Missing startChar parameter');
    }

    // --- Data Retrieval and Filtering ---
    const users = await readUsersFromFile();
    const filteredUsers = users.filter(user => user.startsWith(startChar.toUpperCase()));
    const chunk = filteredUsers.slice(0, CHUNK_SIZE); // Get the first CHUNK_SIZE users from the filtered list

    // --- Response ---
    res.json(chunk);
});

// --- Start the Server ---
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});