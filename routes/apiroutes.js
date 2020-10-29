//dependencies
const router = require("express").Router();
const fs = require("fs");
const path = require("path");
const database = path.join(__dirname, "../db/db.json");

const readData = () => JSON.parse(fs.readFileSync(database, "UTF-8"));
const writeData = (obj) => fs.writeFileSync(database, JSON.stringify(obj));

//read information from .JSON database

router.get("/notes", function (req, res) {
    const notes = readData();

    res.json(notes)
});

//submit new note to .JSON database

router.post("/notes", function (req, res) {
    const notes = readData();
    const newNote = req.body;

    newNote.id = notes.length +1;

    notes.push(newNote);
    writeData(notes);

    res.json(newNote.id);
    readData();
});

//delete note from .JSON Database

router.delete("/notes/:id", function(req, res) {
    const notes = readData();
    const id = req.params.id;

    for (var i = 0; i < notes.length; i++) {
        if (id == notes[i].id) {
            notes.splice(i, 1);
        }
    }
    console.log(id);
    writeData(notes);
    res.json(notes);
})

module.exports = router;