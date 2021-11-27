const fs = require('fs');
const express = require('express');
const app = express();
const { v4: uuidv4 } = require('uuid');
const PORT = process.env.PORT || 3001;
const path = require('path')

const db = require('./db/db.json');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// landing page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, './public/index.html'));
// });

// Get existing notes
app.get('/api/notes', (req, res) => {
    res.send(db);
})

const postNote = newNote => {
    let dbArray = db;
    newNote.id = uuidv4();
    dbArray.push(newNote);
    console.log(dbArray);
    fs.writeFile('./db/db.json', JSON.stringify(dbArray), err => {
        if (err) {
            console.log(err)
        } else {
            console.log('success');
        }
    })
}

app.post('/api/notes', (req, res) => {
    postNote(req.body);
})



app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});

