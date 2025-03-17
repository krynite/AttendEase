const Homepage = () => {

    return (
        <>
            <h1>Welcome to AttendEase</h1>
            <p>This is a simple attendance tracking app to track students.  This app has 3 main user roles. </p>
            <ul> Roles
                <li> Admin - Has access to all site areas. Current settings only allows the Admin to update the students.  </li>
                <li> Staff - Has access to most sites with the exception of updating or deleting an entry.</li>
                <li> General - Only access to this Homepage and the Scan Attendance function.</li>
            </ul>
        </>
    )
}

export default Homepage