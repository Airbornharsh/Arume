require("dotenv").config();
// const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const Router = require("./src/Routes");
const DbConnect = require("./src/config/Database_config");

var express = require("express");
var app = express();
var http = require("http").createServer(app);
var io = require("socket.io")(http, {
  cors: {
    origin: "*",
  },
});

// const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(Router);

app.use("*", (req, res) => {
  res.send("404 Not Found");
});

DbConnect();

// const server = app.listen(process.env.PORT, () => {
//   console.log(`Server Started at ${process.env.PORT}`);
// });

// const io = require("./socket").init(server);
// const data = io.on("connection", (socket) => {
//   console.log("Client Connected");
// });
// var clients = 0;

require("./socket").init(io);

io.on("connect", (socket) => {
  console.log("Client Connected");

  socket.on("disconnect", () => {
    console.log("Client Disconnected");
  });
});

http.listen(process.env.PORT, () => {
  console.log("listening on localhost:4000");
});
