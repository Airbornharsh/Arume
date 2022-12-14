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

const server = app.listen(process.env.PORT, () => {
  console.log(`Server Started at ${process.env.PORT}`);
});

const io = require("./socket").init(server);

io.on("connection", (socket) => {
  console.log("Client Connected");

  //Adding Messages
  socket.on("messageAdd", (data) => {
    io.emit("messageAdd", data);
  });

  //Deleting Messages
  socket.on("messageDelete", (data) => {
    io.emit("messageDelete", data);
  });

  socket.on("connectionRender", (data) => {
    io.emit("connectionRender", data);
  });

  socket.on("disconnect", async () => {
    console.log("Client Disconnected");

    // try {
    //   const clientsNoData = await community.findOne({
    //     communityId: req.body.communityId,
    //   });

    //   await community.findByIdAndUpdate(clientsNoData._id, {
    //     clients: clientsNoData.clients - 1,
    //   });
    // } catch (e) {
    //   console.log(e);
    // }
  });
});
