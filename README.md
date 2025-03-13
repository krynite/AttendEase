# AttendEase

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
-
