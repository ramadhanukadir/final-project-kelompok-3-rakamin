const express = require("express");
const app = express();

app.get("/ping", (req, res) => {
  try {
    res.json({ ping: "success" });
  } catch (error) {
    console.log("something went wrong");
  }
});

module.exports = app;
