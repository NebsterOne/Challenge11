const express = require("express");

// Import our modular routers for /Index and /Notes
const notesRouter = require("./notes");
// const indexRouter = require('./index');

const app = express();

app.use("/notes", notesRouter);
// app.use('/index', indexRouter);

module.exports = app;
