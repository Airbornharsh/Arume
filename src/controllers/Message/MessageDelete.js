const { getIO } = require("../../../socket");
// const message = require("../../models/message");

const MessageDelete = async (req, res) => {
  try {
    // const Message = await message.findByIdAndDelete(req.params.id);

  

    res.send({ communityId: req.community.communityId, id: req.params.id });
  } catch (e) {
    res.status(500).send(e.message);
  }
};

module.exports = MessageDelete;
