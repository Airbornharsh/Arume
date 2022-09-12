// const message = require("../../models/message");
const { v1: uuidv1 } = require("uuid");
const io = require("../../../socket");

const MessagePost = async (req, res) => {
  try {
    // const newMessage = new message({
    //   communityId: req.community.communityId,
    //   message: req.body.message,
    // });
    // newMessage.save();

    // io.getIO().on("connection", (socket) => {
    //   socket.broadcast.emit("messages", {
    //     action: "create",
    //     communityId: req.community.communityId,
    //     message: req.body.message,
    //   });
    // });

    // io.getIO().on("connect", (socket) => {
    //   console.log("connected Bro");

    //   socket.broadcast.emit("messages", {
    //     action: "create",
    //     communityId: req.community.communityId,
    //     message: req.body.message,
    //     id: uuidv1(),
    //   });

    //   socket.on("disconnect", () => {
    //     console.log("disconnected BRO");
    //   });
    // });

    // io.getIO().emit("messages", {
    //   action: "create",
    //   communityId: req.community.communityId,
    //   message: req.body.message,
    //   id: uuidv1(),
    // });

    res.send(req.body.message);
  } catch (e) {
    res.sendStatus(500).send(e.message);
  }
};

module.exports = MessagePost;
