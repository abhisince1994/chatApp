// login.js
const express = require('express');
const data = require('./data');  // Make sure this is included

const router = express.Router();

// GET route to display the login form
router.get('/', (req, res) => {
    res.send(`
        <form action="/login" method="POST">
            <input id="username" name="username" type="text" placeholder="Username">
            <button type="submit">Login</button>
        </form>
    `);
});

// POST route to handle form submission
router.post('/', (req, res) => {
    const { username } = req.body;

    if (!username) {
        return res.status(400).send('Username is required');
    }

    // Save the user to the data store
    data.users[username] = { username };

    // Redirect to the message page with the username
    res.redirect(`/message?username=${username}`);
});

module.exports = router;
