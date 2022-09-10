const jwt = require("jsonwebtoken");

const Authentication = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) return res.sendStatus(401);

    jwt.verify(token, process.env.JWT_SECRET, (err, authCommunity) => {
      req.community = authCommunity;
      next();
    });
  } catch (e) {
    res.status(500).send(e.message);
  }
};
module.exports = Authentication;
