const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const user = jwt.verify(token, "SHEY");
  if (user) {
    req.body.user = user;
    next();
  } else {
    res.status(500).send({ message: "Invalid or Expired Token" });
  }
};
