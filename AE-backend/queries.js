/*------------------------------- Starter Code -------------------------------*/

const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const User = require("./models/user");
const Student = require("./models/student");
const Attendance = require("./models/attendance");
const AttendanceRecord = require("./models/attendanceRecords");

const bcrypt = require("bcrypt");

const connect = async () => {
  // Connect to MongoDB using the MONGODB_URI specified in our .env file.
  await mongoose.connect(process.env.MONGODB_URI);
  console.log("Connected to MongoDB");

  await runQueries();

  await mongoose.disconnect();
  console.log("Disconnected from MongoDB");

  // Close our app, bringing us back to the command line.
  process.exit();
};

const createDefaultUsers = async () => {
  //! ONLY USE THIS TO RESET TO DEFAULT USERS
  // https://www.npmjs.com/package/bcrypt
  await User.deleteMany({});
  const saltRounds = 12;
  const users = await User.create([
    {
      username: "TestUser1",
      hashedPassword: bcrypt.hashSync("123", saltRounds),
    },
    {
      username: "TestUser2",
      hashedPassword: bcrypt.hashSync("123", saltRounds),
    },
  ]);
  console.log(users);
};
// Used epoch dates: https://www.epochconverter.com/
const createDefaultStudents = async () => {
  await Student.deleteMany();
  const defaultStudents = await Student.create([
    {
      enrollStatus: "active",
      enrollDate: 1735776000000, // 2nd Jan 2025
      scfaStatus: "active-beneficiary",
      role: "student",
      studentName: "Morgan",
      studentIc: "T1111111H",
      dateOfBirth: 1331903771000, // 1 Jan 2013 P6
      gender: "male",
      address: "123 Road",
      schoolName: "ASD School",
      schoolNumber: 66554433,
    },
    {
      enrollStatus: "active",
      enrollDate: 1735776000000, // 2nd Jan 2025
      scfaStatus: "non-beneficiary",
      role: "student",
      studentName: "Jane",
      studentIc: "T2222222H",
      dateOfBirth: 1262304000000, // 1st Jan 2010 P5
      gender: "female",
      address: "234 Road",
      schoolName: "ASD School",
      schoolNumber: 66554433,
    },
    {
      enrollStatus: "active",
      enrollDate: 1735776000000, // 2nd Jan 2025
      scfaStatus: "active-beneficiary",
      role: "student",
      studentName: "Steven",
      studentIc: "T3333333H",
      dateOfBirth: 1293840000000, // 1st Jan 2011 P3
      gender: "male",
      address: "345 Road",
      schoolName: "ASD School",
      schoolNumber: 66554433,
    },
  ]);
  console.log(defaultStudents);
};

const testInsertAttendanceRecords = async () => {
  await AttendanceRecord.deleteMany();

  //TODO Testing for SCFA True and Met req
  // Test scan in for students
  const firstTime = 1741598893000; // 9:28am 10th March 2025
  const secondTime = 1741620493000; // 3:28pm 10th Match 2025
  // Calc Difference  - //! Migrated to virtual in schema
  const epochDiff = Math.abs(secondTime - firstTime);
  const epochDiffHours = epochDiff / (1000 * 60 * 60);
  console.log(`Time Difference: ${epochDiff}`);
  console.log(`Time Difference in Hours: ${epochDiffHours}`);

  // SCFA?
  const scfaBeneficiary = true;
  let scfaReq = "NA";
  if (scfaBeneficiary) {
    scfaReq = epochDiffHours >= 4 ? "true" : "false";
  }

  const testAttendanceRecords = await AttendanceRecord.create([
    {
      timeIn: firstTime,
      timeOut: secondTime,
      // timeDuration: epochDiff,  // Testing virtuals first.
      requirementsMet: scfaReq,
    },
  ]);

  // To see in hours and minutes
  const durationMins = Math.floor(
    testAttendanceRecords[0].timeDuration / (1000 * 60)
  );
  const durationHours = Math.floor(durationMins / 60);

  const dateFormat = Date(testAttendanceRecords[0].timeDuration);
  console.log(testAttendanceRecords);
  console.log("Test Virtual Duration:", testAttendanceRecords[0].timeDuration); //! VIRTUAL WORKS!!!
  console.log(
    `Hours and Min Format: ${durationHours} Hours or ${durationMins} Minutes.` // works!
  );
};

const testInsertAttendance = async () => {
  // Test Attendance Update
  await Attendance.deleteMany();
  const defaultAttendance = await Attendance.create([
    {
      attendanceName: "67cc53f896b207298ef1ecca",
      attendanceDate: 1741564800,
    },
  ]);
};

const createHardcodedAttendanceRecords = async () => {
  console.log("Creating hardcoded test attendance records...");

  // Clear existing attendance records
  await Attendance.deleteMany({});

  // Student IDs (hardcoded) - make sure these match your actual student IDs in the database
  // You should replace these with the actual IDs from your database
  const studentIds = {
    morgan: "67ce7890123456789012345a", // Replace with actual Morgan's ID
    jane: "67ce7890123456789012345b", // Replace with actual Jane's ID
    steven: "67ce7890123456789012345c", // Replace with actual Steven's ID
  };

  // Dates for March 10-15, 2025
  const dates = [
    new Date("2025-03-10T00:00:00Z"), // Monday
    new Date("2025-03-11T00:00:00Z"), // Tuesday
    new Date("2025-03-12T00:00:00Z"), // Wednesday
    new Date("2025-03-13T00:00:00Z"), // Thursday
    new Date("2025-03-14T00:00:00Z"), // Friday
    new Date("2025-03-15T00:00:00Z"), // Saturday
  ];

  // Hardcoded array of attendance records
  const attendanceRecords = [];

  // For each student
  for (const [studentName, studentId] of Object.entries(studentIds)) {
    // For each date
    for (const date of dates) {
      // Create time in (9am) and time out (4pm) for this date
      const timeIn = new Date(date);
      timeIn.setHours(9, 0, 0, 0);

      const timeOut = new Date(date);
      timeOut.setHours(16, 0, 0, 0);

      // Set requirements met based on student
      let requirementsMet = "NA";
      if (studentName === "morgan" || studentName === "steven") {
        // Morgan and Steven are SCFA active beneficiaries, and they stay for 7 hours
        requirementsMet = "true"; // 7 hours > 4 hours requirement
      }

      // Create the attendance record
      attendanceRecords.push({
        attendanceName: studentId,
        attendanceDate: date,
        attendanceRecords: [
          {
            timeIn: timeIn,
            timeOut: timeOut,
            requirementsMet: requirementsMet,
          },
        ],
      });
    }
  }

  // Insert all attendance records
  try {
    const result = await Attendance.insertMany(attendanceRecords);
    console.log(`Created ${result.length} attendance records`);
  } catch (error) {
    console.error("Error creating attendance records:", error.message);
  }
};

// Alternative approach: Create test records without relying on student IDs
const createTestAttendanceWithoutIds = async () => {
  console.log(
    "Creating test attendance records without relying on existing student IDs..."
  );

  // Clear existing attendance records
  await Attendance.deleteMany({});

  // First, find the actual student IDs from the database
  try {
    const morgan = await Student.findOne({ studentName: "Morgan" });
    const jane = await Student.findOne({ studentName: "Jane" });
    const steven = await Student.findOne({ studentName: "Steven" });

    if (!morgan || !jane || !steven) {
      console.log(
        "One or more students not found. Creating default students first..."
      );
      await createDefaultStudents();

      // Try finding the students again
      const morgan = await Student.findOne({ studentName: "Morgan" });
      const jane = await Student.findOne({ studentName: "Jane" });
      const steven = await Student.findOne({ studentName: "Steven" });

      if (!morgan || !jane || !steven) {
        throw new Error("Could not find or create students");
      }
    }

    // Create attendance records for each date
    const attendanceRecords = [];

    // Dates for March 10-15, 2025
    const dates = [
      new Date("2025-03-10"), // Monday
      new Date("2025-03-11"), // Tuesday
      new Date("2025-03-12"), // Wednesday
      new Date("2025-03-13"), // Thursday
      new Date("2025-03-14"), // Friday
      new Date("2025-03-15"), // Saturday
    ];

    // For each student
    for (const student of [morgan, jane, steven]) {
      // For each date
      for (const date of dates) {
        // Set time for 9am arrival and 4pm departure
        const timeIn = new Date(date);
        timeIn.setHours(9, 0, 0, 0);

        const timeOut = new Date(date);
        timeOut.setHours(16, 0, 0, 0);

        // Determine requirements met based on SCFA status
        let requirementsMet = "NA";
        if (student.scfaStatus === "active-beneficiary") {
          requirementsMet = "true"; // They stay for 7 hours which is > 4 hour requirement
        }

        // Create attendance record
        const record = {
          attendanceName: student._id,
          attendanceDate: date,
          attendanceRecords: [
            {
              timeIn: timeIn,
              timeOut: timeOut,
              requirementsMet: requirementsMet,
            },
          ],
        };

        attendanceRecords.push(record);
      }
    }

    // Insert all records at once
    const result = await Attendance.insertMany(attendanceRecords);
    console.log(`Created ${result.length} attendance records`);
  } catch (error) {
    console.error("Error:", error.message);
  }
};

// const testingUpdateStatus = async () => {
//   //! works, but why the express side not working................
//   // for testing updating status from pending to accepted.

//TODO Use this ONLY to test the above functions.
//TODO Remember to use AWAIT before running the functions
const runQueries = async () => {
  console.log(`runQueris is running.`);
  // await createDefaultUsers(); // Create Default users.
  // await createDefaultStudents();
  // await testInsertAttendance(); //TODO Direct to DB works.
  // await testInsertAttendanceRecords();
  await createTestAttendanceWithoutIds();
};

connect();
