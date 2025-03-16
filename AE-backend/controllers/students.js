// Imports
const express = require("express");
const router = express.Router();
const Student = require("../models/student");
const verifyToken = require("../middleware/verify-token");

// age -6 to level.
const calculateStudentLevel = (age) => {
  if (!age || typeof age !== "number") return "Unknown";
  if (age < 7) return "Below P1";
  if (age > 12) return "Above P6";

  // Map ages 7-12 to P1-P6
  return `P${age - 6}`;
};

router.get("/", verifyToken, async (req, res) => {
  try {
    const students = await Student.find(
      {},
      "studentName enrollStatus scfaStatus role schoolName dateOfBirth gender"
    ); // testing seaching other stuff.

    const studentsWithLevel = students.map((student) => {
      const studentObj = student.toObject();
      studentObj.studentLevel = calculateStudentLevel(student.studentAge);
      return studentObj;
    });

    res.json(studentsWithLevel);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

router.post("/filter", verifyToken, async (req, res) => {
  try {
    const { enrollStatus, scfaStatus, schoolName, studentLevel } = req.body;

    // Build query object based on provided filters
    const query = {};

    if (enrollStatus && enrollStatus !== "-" && enrollStatus !== "") {
      query.enrollStatus = enrollStatus;
    }

    if (scfaStatus && scfaStatus !== "-" && scfaStatus !== "") {
      query.scfaStatus = scfaStatus;
    }

    if (schoolName && schoolName !== "-" && schoolName !== "") {
      query.schoolName = schoolName;
    }

    const students = await Student.find(
      query,
      "studentName enrollStatus scfaStatus role schoolName dateOfBirth gender"
    );

    // need this due to virtual
    let filteredStudents = students;

    // filter and calc studentLevel
    if (studentLevel && studentLevel !== "-" && studentLevel !== "") {
      filteredStudents = students.filter((student) => {
        const level = calculateStudentLevel(student.studentAge);
        return level === studentLevel;
      });
    }

    // map students to include studentLevel
    const studentsWithLevel = filteredStudents.map((student) => {
      const studentObj = student.toObject();
      studentObj.studentLevel = calculateStudentLevel(student.studentAge);
      return studentObj;
    });

    res.json(studentsWithLevel);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

router.get("/school-options", verifyToken, async (req, res) => {
  try {
    // https://www.mongodb.com/docs/manual/reference/method/db.collection.distinct/
    const schools = await Student.distinct("schoolName");

    res.json({
      schools,
    });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

// router.get("/:userId", verifyToken, async (req, res) => {
//   //test init login
//   try {
//     if (req.user._id !== req.params.userId) {
//       return res.status(403).json({ err: "Unauthorized" });
//     }

//     const user = await User.findById(req.params.userId);

//     if (!user) {
//       return res.status(404).json({ err: "User not found." });
//     }

//     res.json({ user });
//   } catch (err) {
//     res.status(500).json({ err: err.message });
//   }
// });

router.get("/:studentId", verifyToken, async (req, res) => {
  try {
    const studentId = req.params.studentId;

    const student = await Student.findById(studentId);

    if (!student) {
      return res.status(404).json({ err: "Student not found." });
    }

    // Convert to object to include virtuals
    const studentObj = student.toObject();

    // Add calculated student level
    studentObj.studentLevel = calculateStudentLevel(student.studentAge);

    res.json(studentObj);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

module.exports = router;
