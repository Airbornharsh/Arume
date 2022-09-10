const message = require("../../models/message");

const MessageGet = async (req, res) => {
  try {
    const Messages =await  message.find({ communityId: req.community.communityId });
    if (!Messages) {
      return res.send("No Messages");
    }
    res.send(Messages);
  } catch (e) {
    res.send(e.message);
  }
};

module.exports = MessageGet;
