const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const db = require("./db");
const movieRouter = require("./routes/movie-router");

const app = express();
const apiPort = 8080;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());

db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.use(express.static(process.cwd() + "/my-app/build/"));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api", movieRouter);

app.get("/", (req, res) => {
  res.sendFile(process.cwd() + "/my-app/build/index.html");
});

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`));
