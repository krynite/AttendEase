import { useState } from "react"
import attendanceService from "../../services/attendanceService"

const ScanAttendance = () => {
    const [id, setId] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState('false');

    const handleChange = (event) => {
        setId(event.target.value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!id) {
            setMessage("Please enter ID");
            return;
        }

        setLoading('true');
        setMessage('');



        try {
            const formData = {
                id: id.trim(),
                timeAll: Date.now() //+ (28888000)  // for sg time +8hrs  // Use libraries.
            };

            await attendanceService.postScanToday(formData);
            setMessage("Attendance recorded successfully");

            // Reset form
            setId('');
            setLoading('false');
            document.getElementById("scanData").value = "";
        } catch (err) {

            console.log(`Submit scan error msg: ${err.message}`)
        }
    }

    return (
        <div>
            <h1>Scan Attendance</h1>
            <ul>Sample ID
                {/* <li>67ce5322298c820947bc3726 - for Steven</li>
                <li>67ce5322298c820947bc3725 - for Jane</li>
                <li>67ce5322298c820947bc3724 - for Morgan</li> */}
                <li>681b083d71989331c5615d04 - for P1 Emily</li>
                <li>681b083d71989331c5615d06 - P1 Nora Nelson</li>
            </ul>
            {message && <p>{message}</p>}

            {/* Scan form */}
            <form onSubmit={handleSubmit}>
                <label htmlFor="scanData">Scan/Input ID here:</label> <br />
                <input
                    type="text"
                    id="scanData"
                    name="scanData"
                    onChange={handleChange}
                    disabled={loading === 'true'}
                    required
                /> <br />
                <button
                    type="submit"
                    disabled={loading === 'true'}
                >
                    {loading === 'true' ? "Processing..." : "Submit"}
                </button>
            </form>
        </div>
    )
}

export default ScanAttendance;