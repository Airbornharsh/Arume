// const message = require("../../models/message");
const io = require("../../../socket");

const MessagePost = async (req, res) => {
  try {
    // const newMessage = new message({
    //   communityId: req.community.communityId,
    //   message: req.body.message,
    // });
    // newMessage.save();

    io.getIO().emit("messages", {
      action: "create",
      communityId: req.community.communityId,
      message: req.body.message,
    });

    res.send(req.body.message);
  } catch (e) {
    res.sendStatus(500).send(e.message);
  }
};

module.exports = MessagePost;
