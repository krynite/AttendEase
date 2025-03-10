const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const AttendanceRecords = require("../models/attendanceRecords");
const Attendance = require("../models/attendance");
const verifyToken = require("../middleware/verify-token");

router.get("/", async (req, res) => {});

module.exports = router;
