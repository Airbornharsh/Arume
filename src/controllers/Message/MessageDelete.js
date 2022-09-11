const message = require("../../models/message");

const MessageDelete = async (req, res) => {
  try {
    const Message = await message.findByIdAndDelete(req.params.id);

    res.send(Message);
  } catch (e) {
    res.status(500).send(e.message);
  }
};

module.exports = MessageDelete;
