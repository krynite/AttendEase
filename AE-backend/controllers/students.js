// Imports
const express = require("express");
const router = express.Router();
const Student = require("../models/student");
const verifyToken = require("../middleware/verify-token");

router.get("/", verifyToken, async (req, res) => {
  try {
    // const students = await Student.find({}, "studentName");
    const students = await Student.find({}, "studentName enrollStatus role"); // testing seaching other stuff.

    res.json(students);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

router.get("/:userId", verifyToken, async (req, res) => {
  //test init login
  try {
    if (req.user._id !== req.params.userId) {
      return res.status(403).json({ err: "Unauthorized" });
    }

    const user = await User.findById(req.params.userId);

    if (!user) {
      return res.status(404).json({ err: "User not found." });
    }

    res.json({ user });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

module.exports = router;

module.exports = router;
