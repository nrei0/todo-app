const path = require("path");
const express = require("express");

const port = process.env.PORT || 8080;

const app = express();

app.use(express.static(path.resolve(__dirname, "./build")));

app.listen(port, () => {
  console.log("server started");
});
