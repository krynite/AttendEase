/*------------------------------- Starter Code -------------------------------*/

const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const User = require("./models/user");
const Student = require("./models/student");

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
      enrollDate: 1735776000000,
      scfaStatus: "active-beneficiary",
      role: "student",
      studentName: "Morgan",
      studentIc: "T1111111H",
      dateOfBirth: 1356998400000,
      gender: "male",
      address: "123 Road",
      schoolName: "ASD School",
      schoolNumber: 66554433,
    },
    {
      enrollStatus: "active",
      enrollDate: 1735776000000,
      scfaStatus: "non-beneficiary",
      role: "student",
      studentName: "Jane",
      studentIc: "T2222222H",
      dateOfBirth: 1262304000000,
      gender: "female",
      address: "321 Road",
      schoolName: "ASD School",
      schoolNumber: 66554433,
    },
    {
      enrollStatus: "active",
      enrollDate: 1735776000000,
      scfaStatus: "active-beneficiary",
      role: "student",
      studentName: "Steven",
      studentIc: "T3333333H",
      dateOfBirth: 1293840000000,
      gender: "male",
      address: "3245 Road",
      schoolName: "ASD School",
      schoolNumber: 66554433,
    },
  ]);
};

// const testingUpdateStatus = async () => {
//   //! works, but why the express side not working................
//   // for testing updating status from pending to accepted.
//   const test = await User.findOneAndUpdate(
//     {
//       _id: "67b8825c2d7a7007a5f69b85", // returned from frontend mongodbId of the friend log.
//       // recipient: "67b73e97d3855b5e92cdd61e", // returned from frontend user Test1
//     },
//     {
//       status: "pending", // changing status from pending to accepted and vice versa.
//     }
//   );
//   console.log(test);
// };

//TODO Use this ONLY to test the above functions. Comment out when not in use.
//TODO Remember to use AWAIT before running the functions
const runQueries = async () => {
  console.log(`runQueris is running.`);
  // await createDefaultUsers(); // Create Default users.
  await createDefaultStudents();
};

connect();
