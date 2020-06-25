"use strict";
const express = require("express");
const logger = require("morgan");
const fs = require("fs");

const PORT = 3000;
const REDIRECT =
  "https://www.gov.kr/portal/coronaPolicy/list/emergCalamSportAmt";

// Create the express app
const app = express();

// Routes and middleware
app.use(logger("dev"));
app.use(function handler(req, res) {
  const IP =
    new Date() +
    "\tIP:\t" +
    (req.headers["x-forwarded-for"] || req.connection.remoteAddress) +
    "\n";
  console.log(IP);

  fs.appendFile("./ip-logger.txt", IP, function (err) {
    if (err) console.log("Save..Error...");
    else console.log("Saved!");
  });

  res.writeHead(302, {
    Location: REDIRECT,
  });
  res.end();
});

// Start server
app.listen(PORT, "0.0.0.0", function (err) {
  if (err) {
    return console.error(err);
  }
  console.log(`Started Server`);
});
