const express = require("express");
// Database noSQL
const { mongoose } = require('./database')

// Express: Facto standard server framework for Node.js
const app = express();
var cors = require('cors');

// Morgan is used for logging request details;
const morgan = require("morgan");
const bodyParser = require("body-parser");


app.use((req, response, next) => {
  
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader("Access-Control-Allow-Credentials", "true");
  response.setHeader("Access-Control-Allow-Methods", "*");
  response.setHeader("Access-Control-Allow-Headers", "*");
  app.use(cors());
  next();
});

// All OPTIONS requests return a simple status: 'OK'
app.options('*', (req, res) => {
  res.json({
    status: 'OK'
  });
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Settings
app.set("port", process.env.PORT || 3001);

// Middlewares: functions run before of create routes
app.use(morgan("dev"));
app.use(express.json());

// Routes
app.use("/api", require("./routes"));

// Redirection of routes no specification for main page
app.get("/*", function(req, res) {
  res.send("Error 404 page not found!");
});

// Starting the server
app.listen(app.get("port"), () => {
  console.log(`Serve on port ${app.get("port")}`);
});