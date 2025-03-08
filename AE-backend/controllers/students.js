// Imports
const express = require("express");
const router = express.Router();
const Student = require("../models/student");
const verifyToken = require("../middleware/verify-token");

module.exports = router;
