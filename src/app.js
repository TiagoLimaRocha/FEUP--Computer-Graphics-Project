const express = require("express");
const path = require("path");

const app = express();

const publicDir = path.join(__dirname, "../public");
app.use(express.static(publicDir));

let port = process.env.PORT || 3000;
app.listen(port, () => console.log("Server is up and running! ☻"));

