const jwt = require("jsonwebtoken");
const community = require("../../models/community");

const Joining = async (req, res) => {
  try {
    const tempCommunity = await community.find({
      communityId: req.body.communityId,
    });

    if (!tempCommunity[0]) {
      const newCommunity = new community({
        communityId: req.body.communityId,
        clients: 1,
      });

      console.log(newCommunity);
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

      const clientsNoData = await community.findOne({
        communityId: req.body.communityId,
      });

      await community.findByIdAndUpdate(clientsNoData._id, {
        clients: clientsNoData.clients + 1,
      });
      return res.send(token);
    }
  } catch (e) {
    console.log(e);
    res.status(500).send(e.message);
  }
};

module.exports = Joining;
