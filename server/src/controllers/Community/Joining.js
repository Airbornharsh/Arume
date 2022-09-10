const jwt = require("jsonwebtoken");
const community = require("../../models/community");

const Joining = async (req, res) => {
  try {
    const tempCommunity = await community.find({
      communityId: req.body.communityId,
    });

    if (!tempCommunity[0]) {
      const newCommunity = new community({ communityId: req.body.communityId });
      newCommunity.save();

      const token = jwt.sign(
        { communityId: newCommunity.communityId },
        process.env.JWT_SECRET
      );
      return res.send(token);
    } else {
      const token = jwt.sign(
        { communityId: req.body.communityId },
        process.env.JWT_SECRET
      );
      return res.send(token);
    }
  } catch (e) {
    console.log(e);
    res.status(500).send(e.message);
  }
};

module.exports = Joining;
