const message = require("../../models/message");

const MessagePut = async (req, res) => {
  try {
    const Message = await message.findByIdAndUpdate(req.params.id, {
      message: req.body.message,
    });

    res.send(Message);
  } catch (e) {
    res.status(500).send(e.message);
  }
};

module.exports = MessagePut;
