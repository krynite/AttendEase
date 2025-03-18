# Project 4: AttendEase

This project is about developing an Attendance Tracking app targeting at student care centres in SG. It utilizes React as frontend and ExpressJS and MongoDB as backend.

# Description

This project allows the user to track attendance of students with various requirements. As some students require SCFA support, this app allows the tracking of such students to meet the requirements set by SCFA. This allows the centre to inform their caregivers early on to prevent a situation of them not meeting the requirements.

Attendance taking is also automated, where students only need to scan in their \_id, and the app will create a daily attendance for them. The app also doesn't require a separate scan out system, it utilizes the same kiosk terminal and the same url/page, and determines the timeOut base on the attendance and updates accordingly.

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
