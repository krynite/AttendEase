const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const Attendance = require("../models/attendance");
const Student = require("../models/student");
const verifyToken = require("../middleware/verify-token");
const student = require("../models/student");

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
  const { id, timeAll } = req.body; // id = student mongodbId, timeAll = scanned Time or Timestamp to MILLESECONDS!! 13 digits

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
    // console.log(`Checking Error Depth`)
    const startOfDay = new Date(today.setHours(0, 0, 0)); // hr:min:sec: Link: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/setHours
    const endOfDay = new Date(today.setHours(23, 59, 59));

    console.log(`Start of Day: ${startOfDay}`);
    console.log(`End of Day: ${endOfDay}`);

    const convertedTimeAll = new Date(timeAll);
    // console.log(`timeAll Data: ${timeAll}`);
    // console.log(`convertedTimeAll Data: ${convertedTimeAll}`);

    //find if attendance exist
    let attendance = await Attendance.findOne({
      attendanceName: id,
      attendanceDate: {
        // range 00:00:00 to 23:59:59
        // Can track during specific hours by altering startOfDay and endOfDay
        $gte: startOfDay, // >=   Link: https://www.mongodb.com/docs/manual/reference/operator/query/
        $lte: endOfDay, // <=
      },
    });

    // console.log(`Checking Error Depth #1`); //! Checking Error Depth (fixed)

    //? Some issues with the logic below. Not updating timeOut. (11/03/2025 - fixed)
    if (!attendance) {
      //if nth than create. else update
      //create
      attendance = await Attendance.create({
        attendanceName: id,
        attendanceDate: today,
        attendanceRecords: [
          {
            timeIn: convertedTimeAll,
            timeOut: convertedTimeAll,
            requirementsMet: "NA",
          },
        ],
      });

      //   console.log(`Checking Error Depth #2`); //! Checking Error Depth
    } else {
      //TODO: Write track last Idx and create record with the new Idx
      const lastRecordsIdx = attendance.attendanceRecords.length - 1; // .length is either 1 or 2, Idx is either 0 or 1

      // If no records, create 1st record
      if (attendance.attendanceRecords.length === 0) {
        attendance.attendanceRecords.push({
          timeIn: convertedTimeAll,
          timeOut: convertedTimeAll,
          requirementsMet: "NA",
        });
        await attendance.save();
      } else {
        const lastRecord = attendance.attendanceRecords[lastRecordsIdx]; // lastRecordsIdx = 0
        // lastRecord.timeOut = convertedTimeAll;

        //TODO: Write check for scfaStatus from students. If yes, tabulate if more than 4 hrs. if more = "true" else "false"
        console.log(`scfaStatus before update: ${studentId.scfaStatus}`);
        console.log(
          `Testing 5 mins data:`,
          lastRecord.timeOut - lastRecord.timeIn
        );
        //TODO Testing 5 min buffer
        // 12 March 2025
        // 5 mins = 300000
        // 9:00 AM = 1741770000000
        // 9:03 AM = 1741770180000
        // 9:04 AM = 1741770240000
        // 9:05 AM = 1741791900000
        // 9:06 AM = 1741791960000
        // 3:00 PM = 1741791600000
        const minDiff = Math.abs(lastRecord.timeOut - lastRecord.timeIn);
        console.log(`Mins Diff: ${minDiff}`);
        //   > 300000
        if (minDiff > 300000) {
          lastRecord.timeOut = convertedTimeAll;
          if (studentId.scfaStatus === "active-beneficiary") {
            console.log(`LastRecord TimeOut : ${lastRecord.timeOut}`);
            console.log(`LastRecord TimeIn : ${lastRecord.timeIn}`);
            const hoursDiff =
              Math.abs(lastRecord.timeOut - lastRecord.timeIn) /
              (1000 * 60 * 60);
            lastRecord.requirementsMet = hoursDiff >= 4 ? "true" : "false";
          }
          await attendance.save();
        }
      }

      // await attendance.save();
    }

    const populateAttendance = await Attendance.findById(
      attendance._id
    ).populate({
      path: "attendanceName",
      model: "Student",
      select: "studentName studentIc dateOfBirth scfaStatus",
    });
    // res.json(attendance);
    res.json(populateAttendance);
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
});

module.exports = router;

// testing old data ObjectID: attendanceName: 67cc53f896b207298ef1ecca from attendance collection
// testing new data ObjectId: attendanceName: 67ce5322298c820947bc3724 insert into attendance collection

// Code for recording arrays with multiple entries. //! Cant decide which idea. Doing both. Bottom old code untested.
// if (!attendance) {
//       //if nth than create. else update
//       //create
//       attendance = await Attendance.create({
//         attendanceName: id,
//         attendanceDate: today,
//         attendanceRecords: [
//           {
//             timeIn: timeAll,
//             timeOut: timeAll, //TODO: Think if wanna cheat and change require status to false. Hahaha
//             requirementsMet: "NA",
//           },
//         ],
//       });
//     } else {
//       //TODO: Write track last Idx and create record with the new Idx
//       const lastRecordsIdx = attendance.attendanceDate.length - 1;
//       if(lastRecordsIdx !== 0)
//     }
