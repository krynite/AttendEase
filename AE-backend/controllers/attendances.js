const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const Attendance = require("../models/attendance");
const Student = require("../models/student");
const verifyToken = require("../middleware/verify-token");

// HTML codes: https://en.wikipedia.org/wiki/List_of_HTTP_status_codes

// Show all attendances records.
router.get("/", verifyToken, async (req, res) => {
  try {
    const attendance = await Attendance.find({})
      .populate("attendanceName attendanceDate", "studentName enrollStatus")
      .sort({ attendanceDate: -1 });
    res.json(attendance);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

// Specific attendance ID
router.post("/find"),
  verifyToken,
  async (req, res) => {
    const { id } = req.body;

    try {
      if (!id) {
        return res.status(400).json({ err: "Attendance not in body." });
      }

      const attendance = await Attendance.findById(id).populate(
        "attendanceName attendanceDate",
        "studentName enrollStatus"
      );
      if (!attendance) {
        return res.status(404).json({ err: "Attendance not found." });
      }
      res.json(attendance);
    } catch (err) {
      res.json(500).json({ err: err.message });
    }
  };

// testing
router.post("/", verifyToken, async (req, res) => {
  const { studentId, attendanceDate } = req.body;

  try {
    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ err: "Student not found." });
    }

    const existingAttendance = await Attendance.findOne({
      //One attendance per student per day.
      attendanceName: studentId,
      attendanceDate: new Date(attendanceDate),
    });

    if (existingAttendance) {
      return res.status(403).json({ err: "Attendance exist already." });
    }

    //creating new from here.
    const newAttendance = await Attendance.create({
      attendanceName: studentId,
      attendanceDate: new Date(attendanceDate),
      attendanceRecords: [],
    });

    res.status(201).json(newAttendance); //201 created
  } catch (err) {
    return res.status(400).json({ err: err.message });
  }
});

// testing scan in  //TODO can rename from update to scan later
router.post("/scanToday", verifyToken, async (req, res) => {
  const { id, timeAll } = req.body;

  if (!id) {
    return res.status(400).json({ err: "ID missing in body." });
  }
  if (!timeAll) {
    return res.status(400).json({ err: "Timestamp missing in body." });
  }

  try {
    //check if student exist
    const studentId = await Student.findById(id);
    if (!studentId) {
      return res.status(404).json({ err: "Student not found." });
    }
    // check if attendance record for the student exist
    //select todays day and set start and end time of date. Link: https://stackoverflow.com/questions/8636617/how-to-get-start-and-end-of-day-in-javascript
    const today = new Date();
    console.log(`Todays Date: ${today}`);
    const startOfDay = new Date(today.setHours(0, 0, 0)); // hr:min:sec: Link: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/setHours
    const endOfDay = new Date(today.setHours(23, 59, 59));

    //find if attendance exist
    let attendance = await Attendance.findOne({
      attendanceName: id,
      attendanceDate: {         // range 00:00:00 to 23:59:59
        $gte: startOfDay,
        $lte: endOfDay,
      },

      if(!attendance){ //if nth than create. else update
        //create
        const newAttendance = await Attendance.create({
            attendanceName: id,
            attendanceDate: today,
            attehdanceRecords: [{
                timeIn = timeAll,
                timeOut = timeAll,          //TODO: Think if wanna cheat and change require status to false. Hahaha
            }]

        })


      }
    });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
});

module.exports = router;
// testing old data ObjectID: attendanceName: 67cc53f896b207298ef1ecca from attendance collection
// testing new data ObjectId: attendanceName: 67ce5322298c820947bc3724 insert into attendance collection
