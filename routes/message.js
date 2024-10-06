const express = require('express');
const fs = require('fs');
const data = require('./data');
const router = express.Router();

router.get('/', (req, res,next) => {
    const username = req.query.username || '';

    // Display all messages
    const allMessages = data.messages.map(msg => `${msg.username}: ${msg.message}`);

    res.send(`
        <div>${allMessages}</div>
        <form action="/message" method="POST">
            <input id="message" name="message" type="text" placeholder="message">
            <input type="hidden" name="username" value="${username}">
            <button type="submit">Send</button>
        </form>
    `);
});

router.post('/', (req, res,next) => {
    const { message, username } = req.body;

    if (!username || !message) {
        return res.status(400).send('Both username and message are required');
    }

    // Add the message to the shared list
    const formattedMessage = `${username}: ${message}`;
    data.messages.push({ username, message });

    // Append the message to the message.txt file
    fs.appendFile('message.txt', `${formattedMessage}\n`, (err) => {
        if (err) {
            console.error('Failed to write message to file', err);
            return res.status(402).send('Could not save message');
        }
    });

    // Redirect back to the message page to show updated messages
    res.redirect(`/message?username=${username}`);
});

module.exports = router;
