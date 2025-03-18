# Project 4: AttendEase

This project is about developing an Attendance Tracking app targeting at student care centres in SG. It utilizes React as frontend, ExpressJS for Route Handling and MongoDB as database.

# Description

This project allows the user to track attendance of students with various requirements. As some students require SCFA support, this app allows the tracking of such students to meet the requirements set by SCFA. This allows the centre to inform their caregivers early on to prevent a situation they do not meeting the requirements. Some of the requirements include only counting attendance of the student if the student stays for atleast 4 hours.

Attendance taking is also automated, where students only need to scan in their ID, and the app will create a daily attendance for them. The app also doesn't require a separate scan-out system, as this is React as frontend, we can utilize windows Kiosk Mode to run the "Scan Attendance" as a terminal and determine the timeOut base on the attendance and updates accordingly.

For the purpose of this project, the Homepage explores the roles available for the user to have different permissions in the app.

### Role Permissions

1. Admin - Full Access and the only account that is allowed to delete or update entries of created attendences.
2. Staff - Limited Access to only filter and view the Student Profiles and their Attendance.
3. General - A shared Kiosk Terminal account, that has access to only the "Scan Attendance" feature and the Sign-in/up homepage.

![Homepage](https://imgur.com/ESAvUdO)

# User Story + Wireframe

User story can be found on this trello board [Trello](https://trello.com/invite/b/67c916f70b27b46ff09aeef3/ATTI2255dff2cdd81b3859f610ae32a95b0c7219F050/proj-4-attendease)
Wireframe can be found on this [DrawIO](https://app.diagrams.net/#G12QMcfNlioNEfuG7n2y5zXprSsUp4VPy2#%7B%22pageId%22%3A%22NXnltCqFs-8ik3Dpo3br%22%7D)

## Frontend (React)

### Pseudocode

There are a total of 15 components.

### Attendance Component:

- Attendance
  - AttendanceFilter
    - AttendanceFilterGrid
      - AttendanceFilterDetail

The purpose of the "Attendance" family of components is to break down the app into small and more focused components. This allows the components to be easily maintained and provides the developer with a clearer codes and how each component works.

In the "Attendance" family of components above, having the AttendanceFilter split from the Attandence allows the component "Attendance" to have a stretch goal to implement some charts giving this component more flexibility.

**AttendanceFilter**
This components provides the filtering for the attendance data. In collating all the filters into the "filters" state, this "filters" state object is then used to fetch "fetchFilteredAttendance" of the students. And this "fetchFilteredAttendance" data is than passed down to the component AttendanceFilterGrid to be displayed.

This component filters the attendance records by:

- Student Level (P1-P6, etc)
- Date Range
- Week Selection
  - Note that the Week Select actually stores in the filters.attendanceStartDate and filters.attendanceEndDate useState(). Both dates are Epoch with Miliseconds.

In the below code of this component, in the Week Selection, it will automatically select the Monday as the Start day and Saturday as the END day of the week.

This is done in the following manner:

- Function calculateWeekDates
  1.  get the DAY using the getDay(). This will return selected Days (Monday - Saturday)'s numeric value. E.g. Sunday = 0, Monday = 1, ... , Saturday = 6.
  2.  Selecting Monday with an offset from the selected date.
  3.  Selecting Saturday with an offset from the selected date.

```javascript
const date = new Date(selectedDate);
const day = date.getDay(); // 0 = Sunday, 1 = Monday, 2 = Tuesday

// Thursday (day=5)  1-5 = -4  || day is now 1 aka Monday
const mondayOffset = day === 0 ? -6 : 1 - day;
const monday = new Date(date);
monday.setDate(date.getDate() + mondayOffset);

// If today is already Saturday (6), offset is 0, otherwise calculate days until Saturday
const saturdayOffset = day === 6 ? 0 : 6 - day;
const saturday = new Date(date);
saturday.setDate(date.getDate() + saturdayOffset);
```

Having now the start and end date, we than set the filters.attendanceStartDate and filters.attendanceEndDate. Which is than used to fetch the "fetchFilteredAttendance", its data is than passed to the component "AttendanceFilterGrid".

**AttendanceFilterGrid**
This component's role is to display the "fetchFilteredAttendance", and to tag studentId params and a link to each individual student. This can be accessed via the component "AttendanceDetail".

**AttendanceDetail**
This component's role is to utilize the params of the student created in the "AttendanceFilterGrid" and fetch all the attendance detail of the student and display it.
Note: There is a "user" check here to determine if the attendance record can be deleted. At this time, only the user with the role of "admin" can delete.

User role check before delete:

```javascript
{
  user?.userRole === "admin" && (
    <section className="actions-section">
      <button onClick={handleDeleteAttendance} className="delete-button">
        Delete Attendance Record
      </button>
    </section>
  );
}
```

### Student Component

- Student
  - StudentGrid
    - StudentGridList
      - StudentDetails
        - StudentUpdate

The "Student" component family tree are designed similarly as the "Attendance" family tree above. The main difference is the school options. As there are different levels of students from various schools. The selection option to be filtered has to be fetched first before the display of the filtering options for the user to choose from. "useEffect" is then used to get the informatiopn first before mapping the options. Filters are also stored in the useState of "filters", which is used to fetch the "fetchFilteredStudents" and stored in "filteredStudents". This "filteredStudents" are then passed to the component "StudentGridList" to be displayed as a table.

```javascript
useEffect(() => {
  const fetchSchoolOptions = async () => {
    try {
      const response = await studentService.getSchoolOptions();
      setSchoolOptions(response.schools);
      setTotalStudentCount(response.totalCount);
    } catch (err) {
      console.log(`Error fetching school options: ${err.message}`);
      setSchoolOptions([]);
    }
  };

  fetchSchoolOptions();
}, []);
```

### Security Checks for User Roles

Every route has been checked to allow users with specific roles to access. Should there be an incident where the user with a denied role access a route they should'nt, they will be brought back to the "Homepage, '/'". And additional path "path="\*"" also grabs all loose routes to the "Homepage, '/'".

```javascript
const App = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (
      !user &&
      window.location.pathname !== "/sign-in" &&
      window.location.pathname !== "/sign-up"
    ) {
      navigate("/sign-in");
    }
  }, [user, navigate]);

  return (
    <div className="app-container">
      <NavBar user={user} />

      <main className="main-content">
        {user && (
          <p>
            Signed in as: {user.username} Role:
            {user.userRole ? `(${user.userRole})` : ""}
          </p>
        )}

        <Routes>
          {/* Public routes */}
          <Route path="/sign-in" element={<SignInForm />} />
          <Route path="/sign-up" element={<SignUpForm />} />
          <Route path="/" element={<Homepage />} />

          <Route
            path="/scanToday"
            element={
              user?.userRole === "general" ||
              user?.userRole === "admin" ||
              user?.userRole === "staff" ? (
                <ScanAttendance />
              ) : (
                <Navigate to="/" />
              )
            }
          />

          <Route
            path="/students"
            element={
              user?.userRole === "admin" || user?.userRole === "staff" ? (
                <Student user={user} />
              ) : (
                <Navigate to="/" />
              )
            }
          />

          <Route
            path="/students/:id"
            element={
              user?.userRole === "admin" || user?.userRole === "staff" ? (
                <StudentDetails user={user} />
              ) : (
                <Navigate to="/" />
              )
            }
          />

          <Route
            path="/attendance"
            element={
              user?.userRole === "admin" || user?.userRole === "staff" ? (
                <Attendance />
              ) : (
                <Navigate to="/" />
              )
            }
          />

          <Route
            path="/attendance/:id"
            element={
              user?.userRole === "admin" || user?.userRole === "staff" ? (
                <AttendanceDetail user={user} />
              ) : (
                <Navigate to="/" />
              )
            }
          />

          <Route
            path="/students/update/:id"
            element={
              user?.userRole === "admin" ? (
                <StudentUpdate user={user} />
              ) : (
                <Navigate to="/dashboard" />
              )
            }
          />

          <Route
            path="/dashboard"
            element={user ? <Dashboard /> : <Navigate to="/sign-in" />}
          />

          <Route path="*" element={<Navigate to={user ? "/" : "/sign-in"} />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
```

## Backend (ExpressJS + MongoDb)

### Main Key Learning Points:

**Mongoose: virtualize**
Documentation can be found here: [https://mongoosejs.com/docs/tutorials/virtuals.html]
In the schema below, virtualized "timeDuration" is tabulated rather than stored. Hence it is not stored in the database.
This is suitable for usage:
Example:

1. Calculating Age on a yearly basis.
2. Calculating School Level after each year.
3. In the case below: Calculate the individual attendanceRecordsSchema of the student's time duration between first and last scan.

```javascript
const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const attendanceRecordsSchema = new Schema(
  {
    timeIn: {
      type: Date,
      required: true,
    },
    timeOut: {
      type: Date,
      required: true,
    },
    requirementsMet: {
      type: String,
      enum: ["NA", "true", "false"], // NA for those not SCFA
      default: "NA",
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

attendanceRecordsSchema.virtual("timeDuration").get(function () {
  if (this.timeIn && this.timeOut) {
    return Math.abs(this.timeOut - this.timeIn);
  }
  return null;
});

const RecordsModel = model("Records", attendanceRecordsSchema);

module.exports = {
  schema: attendanceRecordsSchema,
  model: RecordsModel,
};
```

Note: For the above virtualized "timeDuration" data to be pulled out, since it is not stored in the database, its data is virtualized, it requires the following codes to work. Specifically the " { virtuals: true} ". Without this, normal pull of this Attendance data will by default not display the the "timeDuration" from the " [ attendanceRecordsSchema ] " shown below.

```javascript
const attendanceSchema = new Schema(
  {
    attendanceName: {
      type: Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
    attendanceDate: {
      type: Date,
      required: true,
    },
    attendanceRecords: [attendanceRecordsSchema],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    id: false, // Don't generate an id virtual
  }
);
```

**MongoDB method: distinct**
Documentation can be found here: [https://www.mongodb.com/docs/manual/reference/command/distinct/]
As shown in the above "StudentGrid" Component. Where we are required to fetch the different schools to be displayed in the filters options. This is done so with the help of method: distinct. What this does is that it goes through all the schoolNames and returns unique ones. Thus allowing all the different schools to be fetched.

Below is the route for "/school-options" that was used by the frontend to fetch the different school options.

```javascript
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
```

**Prevent Rapid Scans**
To prevent rapid scans and loading the backend, a buffer of 5 mins was created. This is introduced in the code below.

```javascript
router.post("/scanToday", verifyToken, async (req, res) => {
  const { id, timeAll } = req.body; // id = student mongodbId, timeAll = scanned Time or Timestamp to MILLESECONDS!! 13 digits

  if (!id) {
    return res.status(400).json({ err: "ID missing in body." });
  }
  if (!timeAll) {
    return res.status(400).json({ err: "Timestamp missing in body." });
  }
...
...
...
...
...
...
const timeDiff = Math.abs(convertedTimeAll - lastRecord.timeOut); //old (lastRecord.timeIn - lastRecord.timeOut)

        console.log(`Time since last scan: ${timeDiff / 60000} minutes`);

        // Only update if more than 5 minutes have passed
        if (timeDiff > 300000) {
          // 5 minutes aka 300000 milliseconds
          lastRecord.timeOut = convertedTimeAll; ...
...
...
```

# Planned future enhancements

1. Have the first created user to be admin. This is to prevent users of different roles to be admin during the sign-up phase.
   - Any users aside from the first user, will only be allowed the to select the roles other than "admin"
   - "admin" role during sign-up phase can only be accessed when the logged in user is an admin.
2. Introduce charts to the Attendance component. To display the different data visually from the results of their filters.
3. Allow for configuration of the SCFA requirements.

### Work Done

05/03/2025 - Checked the different methods of executing attendance checking. Did wireframe, working on schema required for method #2.

[Google Sheet] (https://docs.google.com/spreadsheets/d/1BvGv4GDCH6sHLFVHaXiad9WaoPsU6QSidF0pOPnRFIE/edit?gid=0#gid=0)
[Github] (https://github.com/krynite/AttendEase.git)
[Wireframe Draft #1 ] (https://app.diagrams.net/#G12QMcfNlioNEfuG7n2y5zXprSsUp4VPy2#%7B%22pageId%22%3A%22NXnltCqFs-8ik3Dpo3br%22%7D)
[Trello TBC]

Requirements:

1. Need to check the hours a user is in.
2. Need to check if some of the students meet the requirement of 4hrs.

Method #1
Front-end:

1. Request in body with route "/scan" (temp route). Body only contains uniqueid (preferrably MongoDb provided ID)
   (Note: Can be scanned in or keyed in.)

Back-end: 2. Authenticate and Identify if it is student or staff. If it matches either Staff or Student db. It will use the mongodb timestamp to edit the Record controller.
(Note: There is only one Record Controller. This Record controller will have a lot of reference to the StaffId and the StudentId) 3. Extracting the data will only be from this large Record collection.

Method #1 is easier to work with as the plan is to do most of the computing in the front end by grabbing data from specific dates. But it is not the recommended way.

Method #2
Front-end:

1. Same Front-end as Method #1.

Back-end: 2. Further breaking down the steps. 2. There will be one schema for "Record" checking, and another purely for "Attendence". 3. "Records" will receive and create a log. This schema will have 2 different timelog data. 1st Timelog = First login of the day. 2nd Timelog = Last login of the day. 4. Any new scanned keys after the first login will update only the 2nd Timelog. 5. Once there is data on the 2nd Timelog, will create a new data in "Attendence". 6. "Attendence" contains the information for if the special students meet the 4hrs.

We are separating the "Attendance" and Records, so "Attendance" can be quickly used for filters in the frontend. So most of the computing will be done on the back with the "Records".

07/03/2025 - Initial Tests

Consultation:

1. Streamlined schema. change status from bool type to string for future flexibility. Removed certain referencing to prevent future search issues.

07/03/2025

1. Ensure JWT token is working with Users (done)
2. Setup function in queries.js to clear and setup base Users. (done)
3. Create studentSchema and create base students (done)

10/3/2025

4. Setup base attendence in queries for the base students.(done)
5. Test attendanceRecords with queires. Manual insert data (done)

11/03/2025

6. Test attendanceRecords via Express: verify the method that is used for attendance.
   first post checks if there are records. if non, create timeIn. (done)
   second post checks if there are records, if yes, edit- udpate Records array (done)

12/3/2025

Backend:

1. Add buffer of 5 mins. Initial scans. (done)
2. requirementsMet not done yet (done)

13/3/2025
Frontend:

1. Init Frontend
2. Check Charts.js
3. Setup up service for list all items. Get it talking to backend.
4. Get base structure working with the different components.

- NavBar (partial)
- Login/Authenticate (signup done)
- Student List All
- List Targets

14/3/2025

1. Redid Frontend. Discovered that I was loading the Frontend instead of the Backend. Instead of fetching all data and sorting them, I should be requesting from Backend and filtering from there.
2. Added frontend useEffect to retrieve the school using Mongodb's own ".distinct".

15/3/2025

1. Fixed front end StudentGrid not displaying properly.
2. Added separate component for table.
3. Tested charts, not implementing. (optional)
4. created

16/3/2025

1. Fixed Single Day Attendance Filtering Works.
2. Added Date range for Attendance Filtering, bricked Single Day Attendance. Kept Date Range instead. Added backend to receive the filtering requirements from Frontend.
3. Fixed backend not retrieving Attandance Range.

17/3/2025

1. Added user roles and the sites they can go to.
2. Fixed Attendance Range displaying null on studentLevel. Fixed attendanceSchema and attendanceRecordsSchema virtual: true.
