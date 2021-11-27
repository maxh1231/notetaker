const fs = require('fs');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const path = require('path')

const db = require('./db/db.json');

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));

});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
    // res.send(db);
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/api/notes', (req, res) => {
    res.send(db);

})

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});

