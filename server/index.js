require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const Router = require("./src/Routes");
const DbConnect = require("./src/config/Database_config");

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(Router);

app.use("*", (req, res) => {
  res.send("404 Not Found");
});

DbConnect();

app.listen(process.env.PORT, () => {
  console.log(`Server Started at ${process.env.PORT}`);


});
