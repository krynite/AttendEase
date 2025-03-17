import '../../css/Homepage.css'

const Homepage = () => {
    return (
        <div className="homepage-container">
            <h1>Welcome to AttendEase</h1>
            <p>This is a simple attendance tracking app to track students. This app has 3 main user roles:</p>
            <ul>
                <li><span className="role-admin">Admin</span> - Has access to all site areas. Current settings only allow the Admin to update the students.</li>
                <li><span className="role-staff">Staff</span> - Has access to most sites with the exception of updating or deleting an entry.</li>
                <li><span className="role-general">General</span> - Only access to this Homepage and the Scan Attendance function.</li>
            </ul>
        </div>
    )
}

export default Homepage