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


// #region  OLD TESTS
const createDefaultStudents = async () => {
  await Student.deleteMany();
  const defaultStudents = await Student.create([
    // {
    //   enrollStatus: "active",
    //   enrollDate: 1735776000000, // 2nd Jan 2025
    //   scfaStatus: "active-beneficiary",
    //   role: "student",
    //   studentName: "Morgan",
    //   studentIc: "T1111111H",
    //   dateOfBirth: 1331903771000, // 1 Jan 2013 P6
    //   gender: "male",
    //   address: "123 Road",
    //   schoolName: "ASD School",
    //   schoolNumber: 66554433,
    // },
    // {
    //   enrollStatus: "active",
    //   enrollDate: 1735776000000, // 2nd Jan 2025
    //   scfaStatus: "non-beneficiary",
    //   role: "student",
    //   studentName: "Jane",
    //   studentIc: "T2222222H",
    //   dateOfBirth: 1262304000000, // 1st Jan 2010 P5
    //   gender: "female",
    //   address: "234 Road",
    //   schoolName: "ASD School",
    //   schoolNumber: 66554433,
    // },
    // {
    //   enrollStatus: "active",
    //   enrollDate: 1735776000000, // 2nd Jan 2025
    //   scfaStatus: "active-beneficiary",
    //   role: "student",
    //   studentName: "Steven",
    //   studentIc: "T3333333H",
    //   dateOfBirth: 1293840000000, // 1st Jan 2011 P3
    //   gender: "male",
    //   address: "345 Road",
    //   schoolName: "ASD School",
    //   schoolNumber: 66554433,
    // },
    //-------------------------------------------------------------------------------
    //   {
    //     enrollStatus: "active",
    //     enrollDate: 1735776000000, // 2nd Jan 2025
    //     scfaStatus: "non-beneficiary",
    //     role: "student",
    //     studentName: "StudentP6",
    //     studentIc: "T4444444H",
    //     dateOfBirth: 1357132571000, //  2nd Jan 2013 P6
    //     gender: "male",
    //     address: "345 Road",
    //     schoolName: "ASD School",
    //     schoolNumber: 66554433,
    //   },
    //   {
    //     enrollStatus: "active",
    //     enrollDate: 1735776000000, // 2nd Jan 2025
    //     scfaStatus: "active-beneficiary",
    //     role: "student",
    //     studentName: "StudentP5",
    //     studentIc: "T5555555H",
    //     dateOfBirth: 1388668571000, // 2nd Jan 2014 P5
    //     gender: "male",
    //     address: "345 Road",
    //     schoolName: "ASD School",
    //     schoolNumber: 66554433,
    //   },
    //   {
    //     enrollStatus: "active",
    //     enrollDate: 1735776000000, // 2nd Jan 2025
    //     scfaStatus: "non-beneficiary",
    //     role: "student",
    //     studentName: "StudentP4",
    //     studentIc: "T66666666H",
    //     dateOfBirth: 1420204571000, // 2nd Jan 2015 P4
    //     gender: "male",
    //     address: "345 Road",
    //     schoolName: "CED School",
    //     schoolNumber: 66554433,
    //   },
    //   {
    //     enrollStatus: "active",
    //     enrollDate: 1735776000000, // 2nd Jan 2025
    //     scfaStatus: "active-beneficiary",
    //     role: "student",
    //     studentName: "Student P3",
    //     studentIc: "T7777777H",
    //     dateOfBirth: 1451740571000, // 2nd Jan 2016 P3
    //     gender: "male",
    //     address: "345 Road",
    //     schoolName: "CED School",
    //     schoolNumber: 66554433,
    //   },
    //------------------------------------------------ CUTOFF
    {
      enrollStatus: "active",
      enrollDate: 1735660800000, // Wed Jan 01 2025
      scfaStatus: "non-beneficiary",
      role: "student",
      studentName: "P1 Emily King",
      studentIc: "T0191243H",
      dateOfBirth: 1515772800000, // Sat Jan 13 2018
      gender: "f",
      address: "641 Meadow Lane",
      schoolName: "School A",
      schoolNumber: 67178510,
    },
    {
      enrollStatus: "active",
      enrollDate: 1735660800000, // Wed Jan 01 2025
      scfaStatus: "non-beneficiary",
      role: "student",
      studentName: "P1 Skylar Watson",
      studentIc: "T3404902H",
      dateOfBirth: 1534003200000, // Sun Aug 12 2018
      gender: "f",
      address: "197 Lake View Drive",
      schoolName: "School A",
      schoolNumber: 18573059,
    },
    {
      enrollStatus: "active",
      enrollDate: 1735660800000, // Wed Jan 01 2025
      scfaStatus: "non-beneficiary",
      role: "student",
      studentName: "P1 Nora Nelson",
      studentIc: "T7205100H",
      dateOfBirth: 1543852800000, // Tue Dec 04 2018
      gender: "f",
      address: "970 Sunset Drive",
      schoolName: "School A",
      schoolNumber: 60032330,
    },
    {
      enrollStatus: "active",
      enrollDate: 1735660800000, // Wed Jan 01 2025
      scfaStatus: "non-beneficiary",
      role: "student",
      studentName: "P1 Victoria Howard",
      studentIc: "T2426690H",
      dateOfBirth: 1544371200000, // Mon Dec 10 2018
      gender: "f",
      address: "830 Highland Avenue",
      schoolName: "School A",
      schoolNumber: 87552386,
    },
    {
      enrollStatus: "active",
      enrollDate: 1735660800000, // Wed Jan 01 2025
      scfaStatus: "non-beneficiary",
      role: "student",
      studentName: "P1 Layla Morgan",
      studentIc: "T7761027H",
      dateOfBirth: 1525104000000, // Tue May 01 2018
      gender: "f",
      address: "336 Broadway",
      schoolName: "School A",
      schoolNumber: 12281203,
    },
    {
      enrollStatus: "active",
      enrollDate: 1735660800000, // Wed Jan 01 2025
      scfaStatus: "non-beneficiary",
      role: "student",
      studentName: "P1 Jacob Stewart",
      studentIc: "T9673442H",
      dateOfBirth: 1537372800000, // Thu Sep 20 2018
      gender: "m",
      address: "970 East Street",
      schoolName: "School A",
      schoolNumber: 55838671,
    },
    {
      enrollStatus: "active",
      enrollDate: 1735660800000, // Wed Jan 01 2025
      scfaStatus: "active-beneficiary",
      role: "student",
      studentName: "P1 Lucas Gonzalez",
      studentIc: "T9230732H",
      dateOfBirth: 1517673600000, // Sun Feb 04 2018
      gender: "m",
      address: "923 Elm Street",
      schoolName: "School A",
      schoolNumber: 84506906,
    },
    {
      enrollStatus: "active",
      enrollDate: 1735660800000, // Wed Jan 01 2025
      scfaStatus: "active-beneficiary",
      role: "student",
      studentName: "P1 Robert Ross",
      studentIc: "T5285546H",
      dateOfBirth: 1534176000000, // Tue Aug 14 2018
      gender: "m",
      address: "965 Cedar Lane",
      schoolName: "School A",
      schoolNumber: 56837037,
    },
    {
      enrollStatus: "active",
      enrollDate: 1735660800000, // Wed Jan 01 2025
      scfaStatus: "active-beneficiary",
      role: "student",
      studentName: "P1 Lucas Davis",
      studentIc: "T4859509H",
      dateOfBirth: 1545926400000, // Fri Dec 28 2018
      gender: "m",
      address: "572 Washington Avenue",
      schoolName: "School B",
      schoolNumber: 52277287,
    },
    {
      enrollStatus: "active",
      enrollDate: 1735660800000, // Wed Jan 01 2025
      scfaStatus: "non-beneficiary",
      role: "student",
      studentName: "P1 Anthony Allen",
      studentIc: "T6867553H",
      dateOfBirth: 1542902400000, // Fri Nov 23 2018
      gender: "m",
      address: "979 Pine Street",
      schoolName: "School B",
      schoolNumber: 62338130,
    },
    {
      enrollStatus: "active",
      enrollDate: 1704038400000, // Mon Jan 01 2024
      scfaStatus: "non-beneficiary",
      role: "student",
      studentName: "P2 Elizabeth King",
      studentIc: "T0030556H",
      dateOfBirth: 1506355200000, // Tue Sep 26 2017
      gender: "f",
      address: "19 Maple Avenue",
      schoolName: "School B",
      schoolNumber: 36792288,
    },
    {
      enrollStatus: "active",
      enrollDate: 1704038400000, // Mon Jan 01 2024
      scfaStatus: "non-beneficiary",
      role: "student",
      studentName: "P2 Avery Rogers",
      studentIc: "T6991593H",
      dateOfBirth: 1505318400000, // Thu Sep 14 2017
      gender: "f",
      address: "225 Mill Street",
      schoolName: "School B",
      schoolNumber: 63012853,
    },
    {
      enrollStatus: "active",
      enrollDate: 1704038400000, // Mon Jan 01 2024
      scfaStatus: "non-beneficiary",
      role: "student",
      studentName: "P2 Anna Young",
      studentIc: "T4751113H",
      dateOfBirth: 1505318400000, // Thu Sep 14 2017
      gender: "f",
      address: "113 River Road",
      schoolName: "School B",
      schoolNumber: 17136491,
    },
    {
      enrollStatus: "active",
      enrollDate: 1704038400000, // Mon Jan 01 2024
      scfaStatus: "active-beneficiary",
      role: "student",
      studentName: "P2 Ariana Ramirez",
      studentIc: "T7470748H",
      dateOfBirth: 1483372800000, // Tue Jan 03 2017
      gender: "f",
      address: "289 Oak Street",
      schoolName: "School B",
      schoolNumber: 45089754,
    },
    {
      enrollStatus: "active",
      enrollDate: 1704038400000, // Mon Jan 01 2024
      scfaStatus: "non-beneficiary",
      role: "student",
      studentName: "P2 Mia Clark",
      studentIc: "T6337080H",
      dateOfBirth: 1484236800000, // Fri Jan 13 2017
      gender: "f",
      address: "842 Pine Street",
      schoolName: "School A",
      schoolNumber: 75736096,
    },
    {
      enrollStatus: "active",
      enrollDate: 1704038400000, // Mon Jan 01 2024
      scfaStatus: "active-beneficiary",
      role: "student",
      studentName: "P2 Carter Watson",
      studentIc: "T7477365H",
      dateOfBirth: 1495296000000, // Sun May 21 2017
      gender: "m",
      address: "642 Spring Street",
      schoolName: "School B",
      schoolNumber: 72094108,
    },
    {
      enrollStatus: "active",
      enrollDate: 1704038400000, // Mon Jan 01 2024
      scfaStatus: "non-beneficiary",
      role: "student",
      studentName: "P2 Nicholas Nelson",
      studentIc: "T9597390H",
      dateOfBirth: 1499788800000, // Wed Jul 12 2017
      gender: "m",
      address: "793 Fifth Street",
      schoolName: "School A",
      schoolNumber: 81311772,
    },
    {
      enrollStatus: "active",
      enrollDate: 1704038400000, // Mon Jan 01 2024
      scfaStatus: "active-beneficiary",
      role: "student",
      studentName: "P2 Mason Howard",
      studentIc: "T8797357H",
      dateOfBirth: 1507478400000, // Mon Oct 09 2017
      gender: "m",
      address: "359 Oak Street",
      schoolName: "School B",
      schoolNumber: 60726021,
    },
    {
      enrollStatus: "active",
      enrollDate: 1704038400000, // Mon Jan 01 2024
      scfaStatus: "non-beneficiary",
      role: "student",
      studentName: "P2 Charles Murphy",
      studentIc: "T6167901H",
      dateOfBirth: 1486483200000, // Wed Feb 08 2017
      gender: "m",
      address: "769 Oak Street",
      schoolName: "School B",
      schoolNumber: 98880694,
    },
    {
      enrollStatus: "active",
      enrollDate: 1704038400000, // Mon Jan 01 2024
      scfaStatus: "non-beneficiary",
      role: "student",
      studentName: "P2 Cameron Brooks",
      studentIc: "T4054048H",
      dateOfBirth: 1503417600000, // Wed Aug 23 2017
      gender: "m",
      address: "580 Valley View Road",
      schoolName: "School B",
      schoolNumber: 18815626,
    },
    {
      enrollStatus: "active",
      enrollDate: 1672502400000, // Sun Jan 01 2023
      scfaStatus: "non-beneficiary",
      role: "student",
      studentName: "P3 James Brooks",
      studentIc: "T4523250H",
      dateOfBirth: 1454428800000, // Wed Feb 03 2016
      gender: "m",
      address: "406 Seventh Street",
      schoolName: "School A",
      schoolNumber: 13322083,
    },
    {
      enrollStatus: "active",
      enrollDate: 1672502400000, // Sun Jan 01 2023
      scfaStatus: "non-beneficiary",
      role: "student",
      studentName: "P3 Connor Coleman",
      studentIc: "T8015634H",
      dateOfBirth: 1478880000000, // Sat Nov 12 2016
      gender: "m",
      address: "166 Washington Avenue",
      schoolName: "School B",
      schoolNumber: 33296147,
    },
    {
      enrollStatus: "active",
      enrollDate: 1672502400000, // Sun Jan 01 2023
      scfaStatus: "non-beneficiary",
      role: "student",
      studentName: "P3 Grayson Robinson",
      studentIc: "T1076915H",
      dateOfBirth: 1478016000000, // Wed Nov 02 2016
      gender: "m",
      address: "364 Lake View Drive",
      schoolName: "School B",
      schoolNumber: 78224825,
    },
    {
      enrollStatus: "active",
      enrollDate: 1672502400000, // Sun Jan 01 2023
      scfaStatus: "active-beneficiary",
      role: "student",
      studentName: "P3 Lucas Ward",
      studentIc: "T7885965H",
      dateOfBirth: 1460908800000, // Mon Apr 18 2016
      gender: "m",
      address: "307 Fourth Street",
      schoolName: "School B",
      schoolNumber: 41815568,
    },
    {
      enrollStatus: "active",
      enrollDate: 1672502400000, // Sun Jan 01 2023
      scfaStatus: "active-beneficiary",
      role: "student",
      studentName: "P3 Joshua Cox",
      studentIc: "T1172670H",
      dateOfBirth: 1457193600000, // Sun Mar 06 2016
      gender: "m",
      address: "434 South Street",
      schoolName: "School A",
      schoolNumber: 78287830,
    },
    {
      enrollStatus: "active",
      enrollDate: 1640966400000, // Sat Jan 01 2022
      scfaStatus: "non-beneficiary",
      role: "student",
      studentName: "P4 Maya Powell",
      studentIc: "T4538813H",
      dateOfBirth: 1431878400000, // Mon May 18 2015
      gender: "f",
      address: "769 Hill Street",
      schoolName: "School B",
      schoolNumber: 47850088,
    },
    {
      enrollStatus: "active",
      enrollDate: 1640966400000, // Sat Jan 01 2022
      scfaStatus: "active-beneficiary",
      role: "student",
      studentName: "P4 Sophia Morgan",
      studentIc: "T7501519H",
      dateOfBirth: 1426867200000, // Sat Mar 21 2015
      gender: "f",
      address: "342 Fifth Street",
      schoolName: "School B",
      schoolNumber: 67072355,
    },
    {
      enrollStatus: "active",
      enrollDate: 1640966400000, // Sat Jan 01 2022
      scfaStatus: "active-beneficiary",
      role: "student",
      studentName: "P4 Kennedy Peterson",
      studentIc: "T1944581H",
      dateOfBirth: 1424880000000, // Thu Feb 26 2015
      gender: "f",
      address: "596 Sunset Drive",
      schoolName: "School A",
      schoolNumber: 54510826,
    },
    {
      enrollStatus: "active",
      enrollDate: 1640966400000, // Sat Jan 01 2022
      scfaStatus: "non-beneficiary",
      role: "student",
      studentName: "P4 Bella Wright",
      studentIc: "T7420857H",
      dateOfBirth: 1420473600000, // Tue Jan 06 2015
      gender: "f",
      address: "942 Park Avenue",
      schoolName: "School B",
      schoolNumber: 77557509,
    },
    {
      enrollStatus: "active",
      enrollDate: 1640966400000, // Sat Jan 01 2022
      scfaStatus: "non-beneficiary",
      role: "student",
      studentName: "P4 Caroline James",
      studentIc: "T7706536H",
      dateOfBirth: 1423152000000, // Fri Feb 06 2015
      gender: "f",
      address: "969 Broadway",
      schoolName: "School B",
      schoolNumber: 73948342,
    },
    {
      enrollStatus: "active",
      enrollDate: 1640966400000, // Sat Jan 01 2022
      scfaStatus: "non-beneficiary",
      role: "student",
      studentName: "P4 Jayden Adams",
      studentIc: "T2465266H",
      dateOfBirth: 1431360000000, // Tue May 12 2015
      gender: "m",
      address: "355 Church Street",
      schoolName: "School B",
      schoolNumber: 52557639,
    },
    {
      enrollStatus: "active",
      enrollDate: 1640966400000, // Sat Jan 01 2022
      scfaStatus: "active-beneficiary",
      role: "student",
      studentName: "P4 Hunter James",
      studentIc: "T2250421H",
      dateOfBirth: 1448208000000, // Mon Nov 23 2015
      gender: "m",
      address: "763 Forest Drive",
      schoolName: "School A",
      schoolNumber: 65429653,
    },
    {
      enrollStatus: "active",
      enrollDate: 1640966400000, // Sat Jan 01 2022
      scfaStatus: "non-beneficiary",
      role: "student",
      studentName: "P4 Charles Moore",
      studentIc: "T6707111H",
      dateOfBirth: 1422288000000, // Tue Jan 27 2015
      gender: "m",
      address: "754 Fifth Street",
      schoolName: "School A",
      schoolNumber: 65120550,
    },
    {
      enrollStatus: "active",
      enrollDate: 1640966400000, // Sat Jan 01 2022
      scfaStatus: "non-beneficiary",
      role: "student",
      studentName: "P4 Lucas Watson",
      studentIc: "T4514453H",
      dateOfBirth: 1432396800000, // Sun May 24 2015
      gender: "m",
      address: "918 Pine Street",
      schoolName: "School B",
      schoolNumber: 27814448,
    },
    {
      enrollStatus: "active",
      enrollDate: 1640966400000, // Sat Jan 01 2022
      scfaStatus: "non-beneficiary",
      role: "student",
      studentName: "P4 Jacob King",
      studentIc: "T5349133H",
      dateOfBirth: 1444406400000, // Sat Oct 10 2015
      gender: "m",
      address: "674 Valley View Road",
      schoolName: "School B",
      schoolNumber: 17638886,
    },
    {
      enrollStatus: "active",
      enrollDate: 1609430400000, // Fri Jan 01 2021
      scfaStatus: "non-beneficiary",
      role: "student",
      studentName: "P5 Paisley Adams",
      studentIc: "T4335018H",
      dateOfBirth: 1417104000000, // Fri Nov 28 2014
      gender: "f",
      address: "137 Sunset Drive",
      schoolName: "School A",
      schoolNumber: 37207836,
    },
    {
      enrollStatus: "active",
      enrollDate: 1609430400000, // Fri Jan 01 2021
      scfaStatus: "active-beneficiary",
      role: "student",
      studentName: "P5 Nova Powell",
      studentIc: "T3917845H",
      dateOfBirth: 1396886400000, // Tue Apr 08 2014
      gender: "f",
      address: "407 Fourth Street",
      schoolName: "School B",
      schoolNumber: 70275149,
    },
    {
      enrollStatus: "active",
      enrollDate: 1609430400000, // Fri Jan 01 2021
      scfaStatus: "active-beneficiary",
      role: "student",
      studentName: "P5 Savannah Taylor",
      studentIc: "T3526009H",
      dateOfBirth: 1396454400000, // Thu Apr 03 2014
      gender: "f",
      address: "606 Seventh Street",
      schoolName: "School B",
      schoolNumber: 93013130,
    },
    {
      enrollStatus: "active",
      enrollDate: 1609430400000, // Fri Jan 01 2021
      scfaStatus: "active-beneficiary",
      role: "student",
      studentName: "P5 Lucy Thomas",
      studentIc: "T5830144H",
      dateOfBirth: 1395244800000, // Thu Mar 20 2014
      gender: "f",
      address: "983 Second Street",
      schoolName: "School A",
      schoolNumber: 17043300,
    },
    {
      enrollStatus: "active",
      enrollDate: 1609430400000, // Fri Jan 01 2021
      scfaStatus: "non-beneficiary",
      role: "student",
      studentName: "P5 Anna Cook",
      studentIc: "T8786440H",
      dateOfBirth: 1418054400000, // Tue Dec 09 2014
      gender: "f",
      address: "702 West Street",
      schoolName: "School A",
      schoolNumber: 43430736,
    },
    {
      enrollStatus: "active",
      enrollDate: 1609430400000, // Fri Jan 01 2021
      scfaStatus: "active-beneficiary",
      role: "student",
      studentName: "P5 Caleb Rodriguez",
      studentIc: "T6810201H",
      dateOfBirth: 1400601600000, // Wed May 21 2014
      gender: "m",
      address: "851 Spring Street",
      schoolName: "School A",
      schoolNumber: 63806783,
    },
    {
      enrollStatus: "active",
      enrollDate: 1609430400000, // Fri Jan 01 2021
      scfaStatus: "active-beneficiary",
      role: "student",
      studentName: "P5 Hunter Peterson",
      studentIc: "T2725307H",
      dateOfBirth: 1414771200000, // Sat Nov 01 2014
      gender: "m",
      address: "177 Center Street",
      schoolName: "School B",
      schoolNumber: 83846516,
    },
    {
      enrollStatus: "active",
      enrollDate: 1609430400000, // Fri Jan 01 2021
      scfaStatus: "non-beneficiary",
      role: "student",
      studentName: "P5 Christopher Reed",
      studentIc: "T7572693H",
      dateOfBirth: 1415116800000, // Wed Nov 05 2014
      gender: "m",
      address: "133 Sixth Street",
      schoolName: "School A",
      schoolNumber: 81346256,
    },
    {
      enrollStatus: "active",
      enrollDate: 1609430400000, // Fri Jan 01 2021
      scfaStatus: "active-beneficiary",
      role: "student",
      studentName: "P5 Anthony Johnson",
      studentIc: "T9398057H",
      dateOfBirth: 1393257600000, // Tue Feb 25 2014
      gender: "m",
      address: "587 West Street",
      schoolName: "School A",
      schoolNumber: 24020584,
    },
    {
      enrollStatus: "active",
      enrollDate: 1609430400000, // Fri Jan 01 2021
      scfaStatus: "non-beneficiary",
      role: "student",
      studentName: "P5 Grayson Murphy",
      studentIc: "T0298464H",
      dateOfBirth: 1399478400000, // Thu May 08 2014
      gender: "m",
      address: "601 Spring Street",
      schoolName: "School A",
      schoolNumber: 59066512,
    },
    {
      enrollStatus: "active",
      enrollDate: 1577808000000, // Wed Jan 01 2020
      scfaStatus: "non-beneficiary",
      role: "student",
      studentName: "P6 Zoe Peterson",
      studentIc: "T2136720H",
      dateOfBirth: 1377360000000, // Sun Aug 25 2013
      gender: "f",
      address: "114 Forest Drive",
      schoolName: "School A",
      schoolNumber: 32569588,
    },
    {
      enrollStatus: "active",
      enrollDate: 1577808000000, // Wed Jan 01 2020
      scfaStatus: "active-beneficiary",
      role: "student",
      studentName: "P6 Alice Lee",
      studentIc: "T8614714H",
      dateOfBirth: 1387641600000, // Sun Dec 22 2013
      gender: "f",
      address: "737 Main Street",
      schoolName: "School A",
      schoolNumber: 60864201,
    },
    {
      enrollStatus: "active",
      enrollDate: 1577808000000, // Wed Jan 01 2020
      scfaStatus: "non-beneficiary",
      role: "student",
      studentName: "P6 Sadie Campbell",
      studentIc: "T5221148H",
      dateOfBirth: 1384704000000, // Mon Nov 18 2013
      gender: "f",
      address: "249 River Road",
      schoolName: "School A",
      schoolNumber: 71549904,
    },
    {
      enrollStatus: "active",
      enrollDate: 1577808000000, // Wed Jan 01 2020
      scfaStatus: "active-beneficiary",
      role: "student",
      studentName: "P6 Emily Campbell",
      studentIc: "T7052597H",
      dateOfBirth: 1383321600000, // Sat Nov 02 2013
      gender: "f",
      address: "328 Lake View Drive",
      schoolName: "School B",
      schoolNumber: 30587652,
    },
    {
      enrollStatus: "active",
      enrollDate: 1577808000000, // Wed Jan 01 2020
      scfaStatus: "active-beneficiary",
      role: "student",
      studentName: "P6 Zoey Mitchell",
      studentIc: "T9997694H",
      dateOfBirth: 1357660800000, // Wed Jan 09 2013
      gender: "f",
      address: "401 Maple Avenue",
      schoolName: "School B",
      schoolNumber: 52097721,
    },
    {
      enrollStatus: "active",
      enrollDate: 1577808000000, // Wed Jan 01 2020
      scfaStatus: "active-beneficiary",
      role: "student",
      studentName: "P6 Jaxon Garcia",
      studentIc: "T5080991H",
      dateOfBirth: 1358265600000, // Wed Jan 16 2013
      gender: "m",
      address: "295 Mill Street",
      schoolName: "School B",
      schoolNumber: 57820637,
    },
    {
      enrollStatus: "active",
      enrollDate: 1577808000000, // Wed Jan 01 2020
      scfaStatus: "non-beneficiary",
      role: "student",
      studentName: "P6 Jack Smith",
      studentIc: "T7229574H",
      dateOfBirth: 1371830400000, // Sat Jun 22 2013
      gender: "m",
      address: "537 South Street",
      schoolName: "School B",
      schoolNumber: 52552339,
    },
    {
      enrollStatus: "active",
      enrollDate: 1577808000000, // Wed Jan 01 2020
      scfaStatus: "active-beneficiary",
      role: "student",
      studentName: "P6 Andrew Ward",
      studentIc: "T2811527H",
      dateOfBirth: 1386691200000, // Wed Dec 11 2013
      gender: "m",
      address: "108 Meadow Lane",
      schoolName: "School B",
      schoolNumber: 73186983,
    },
    {
      enrollStatus: "active",
      enrollDate: 1577808000000, // Wed Jan 01 2020
      scfaStatus: "active-beneficiary",
      role: "student",
      studentName: "P6 Nicholas Allen",
      studentIc: "T0402952H",
      dateOfBirth: 1387036800000, // Sun Dec 15 2013
      gender: "m",
      address: "404 Cedar Lane",
      schoolName: "School A",
      schoolNumber: 26714725,
    },
    {
      enrollStatus: "active",
      enrollDate: 1577808000000, // Wed Jan 01 2020
      scfaStatus: "non-beneficiary",
      role: "student",
      studentName: "P6 Hunter Walker",
      studentIc: "T7884354H",
      dateOfBirth: 1358179200000, // Tue Jan 15 2013
      gender: "m",
      address: "120 Forest Drive",
      schoolName: "School B",
      schoolNumber: 29771434,
    },
  ]);

  console.log(defaultStudents);
};

const testInsertAttendanceRecords = async () => {
  // await AttendanceRecord.deleteMany();

  //TODO Testing for SCFA True and Met req
  // Test scan in for students
  const firstTime = 1753504742000; // Sat, 26 Jul 2025 04:39:02 GMT
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
  // await Attendance.deleteMany();
  const defaultAttendance = await Attendance.create([
    {
      attendanceName: "681b083d71989331c5615d0a", // P1 Lucas Davis SCFA
      attendanceDate: new Date(1753523811654),    // Jul 26, 2025, 9:56:51 AM UTC

      attendanceRecords: {
        timeIn: new Date("2025-07-26T01:00:00.000Z"),   // UTC
        timeOut: new Date("2025-07-26T03:30:00.000Z"),  // UTC

        requirementsMet: "true",

        scanEvents: [
          { time: new Date("2025-07-26T01:05:00.000Z") },
          { time: new Date("2025-07-26T02:15:00.000Z") },
          { time: new Date("2025-07-26T03:25:00.000Z") },
        ],
      },

      comments: [
        {
          author: "Admin",
          comment: "Initial attendance record created."
        }
      ]
    },
  ]);

  console.log("Inserted test attendance:", defaultAttendance);
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

const testAttendanceRecordsScanEvents = async () => {
  // const scanEmilyToday = await Attendance.findOne({_id: ObjectId(`67d6cf62780237ee30b9b05d`)})

  try {
    const scanEmilyToday = await Attendance.findOne({
      _id: new mongoose.Types.ObjectId(`682c3bf795ed91f78bf993a3`),
    }).populate("attendanceName");
    console.log(
      `TEST SCAN EMILY FIND: ${scanEmilyToday.attendanceName.studentName}`
    );
    // console.log(`TEST SCAN EMILY FINDBY ID: ${scanEmilyToday.attendanceName}`)
  } catch (err) {
    console.log(err.message);
  }
};

// #endregion

const manualAddScanToday = async () => {
  //* Student ID P1 Lucas Davis SCFA
  const inputStudentID = "681b083d71989331c5615d0a"; // P1 Lucas Davis SCFA

  //* Time Client + Server Time
  const clientScanTime = new Date(1753362000000); // Jul 24, 2025, 1:00:00 PM UTC
  const serverScanTime = new Date(Date.now());
  // Time Test
  // console.log("Client epoch time: ",Number(clientScanTime), clientScanTime) //* Jul 24, 2025, 1:00:00 PM UTC - 1753362000000
  // console.log(serverScanTime)


//TODO - Test most efficient way. Redo backend schema
/*
Scan Route: Scan -> attendanceRecordsSchema -> scanEvents
Within scanEvents:
Options:
1. Auto Update to timeOut the highers epoch date?
2. Update timeOut and add it to scanEvents?
*/

// 1753315200000  - Jul 24, 2025, 12:00:00 AM
// 1753401599000 - Jul 24, 2025, 11:59:59 PM



  try {
    const studentId = await Student.findById(inputStudentID);
    // console.log((studentId))    //? working
    
    //* If student is Real.
    if(!studentId){
      console.log(`Student isn't in system.`)
    } else {
      // console.log(studentId)
    }

    //* If student attendance exist
    // YES - Add to array
    // NO - Create new Document

    //* Time Range check base on SG Time - Note - Mongo will revert to ISO time during recording. 
    const today = new Date(serverScanTime)
    const startDay = new Date(today)
    startDay.setHours(0,0,0)
    const endDay = new Date(today)
    endDay.setHours(23,59,59)
    
    // console.log(`Today: ${today}`)
    // console.log(`${Number(startDay)} - ${startDay} - should be epoch: 1753315200000`)
    // console.log(Number(endDay))

    //* Find student's attendance and record as attendance

    const attendance = await Attendance.find({
      attendanceName: inputStudentID,   // inputStudentID = "681b083d71989331c5615d18"
      attendanceDate: {
        // Testing UTC 24th July whole day
        $gte: Number(startDay),  //2025-07-24T12:00:00.000Z AM UTC
        $lte: Number(endDay),  //2025-07-24T12:59:59.000Z PM UTC
      },
      attendanceRecords: {
        $gte: Number(startDay),
        $lte: Number(endDay),
      },
    })

    console.log("attendance?",attendance)

































  } catch (err) {
    console.log("manual test", err.message);
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
  await testInsertAttendance(); //TODO Direct to DB works.
  // await testInsertAttendanceRecords();
  // await createTestAttendanceWithoutIds();
  // await testAttendanceRecordsScanEvents();
  // await manualAddScanToday();
};

connect();
