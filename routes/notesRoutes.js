const note = require("express").Router();
const utils = require("../helpers/fsUtils");
const {
  readAndAppend,
  readFromFile,
  readAndDelete,
} = require("../helpers/fsUtils");
const uuid = require("../helpers/uuid");

// GET Route for retrieving all the notes
note.get("/notes", (req, res) =>
  readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)))
);

// POST Route for submitting notes
note.post("/notes", (req, res) => {
  // Destructuring assignment for the items in req.body
  const { title, text } = req.body;

  // If all the required properties are present
  if (title && text) {
    // Variable for the object we will save
    const newNote = {
      title,
      text,
      id: uuid(),
    };

    readAndAppend(newNote, "./db/db.json");

    const response = {
      status: "success",
      body: newNote,
    };

    res.json(response);
  } else {
    res.json("Error in posting Note");
  }
});

// Delete Route for deleting note
note.delete("/notes/:id", (req, res) => {
  const id = req.params.id;
  utils.readAndDelete(id, "./db/db.json");
  let response = {
    status: "Note Removed",
  };
  res.json(response);
});

module.exports = note;
