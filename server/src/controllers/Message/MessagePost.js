const message = require("../../models/message");

const MessagePost = async (req, res) => {
  try {
    const newMessage = new message({
      communityId: req.community.communityId,
      message: req.body.message,
    });
    newMessage.save();

    res.send(newMessage);
  } catch (e) {
    res.sendStatus(500).send(e.message);
  }
};

module.exports = MessagePost;
