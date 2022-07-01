const express = require("express");
const router = express.Router();
const authmiddleWare = require("../middlewares/authMiddleWare");

router.get("/get-user-info", authmiddleWare, async (req, res) => {
  try {
    res.send({ success: true, data: req.body.user });
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
