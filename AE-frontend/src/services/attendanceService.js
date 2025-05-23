const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/attendance`;

const getAllAttendance = async () => {
  try {
    const response = await fetch(BASE_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch all attendance ${response.message}`);
    }

    const data = await response.json();
    return data;
  } catch (err) {
    throw new Error(`Failed to fetch all attendance ${err.message}`);
  }
};

const getFilteredAttendance = async (filters) => {
  console.log(
    `---------------------------filters ${JSON.stringify(filters)}`
  );
  try {
    const response = await fetch(`${BASE_URL}/filter`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(filters),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.err || "Failed to fetch filtered attendance");
    }
    const data = await response.json();
    return data;
  } catch (err) {
    throw new Error(
      `123123Failed to fetch filtered attendance: ${err.message}`
    );
  }
};

const postScanToday = async (formData) => {
  try {
    let retries = 2;
    let response;

    while (retries >= 0) {
      try {
        response = await fetch(`${BASE_URL}/scanToday`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) break;

        // If we get a 4xx client error, don't retry
        if (response.status >= 400 && response.status < 500) break;

        // Otherwise, it's a server error - retry if we have retries left
        if (retries > 0) {
          await new Promise((resolve) => setTimeout(resolve, 1000));
          retries--;
        } else {
          break;
        }
      } catch (fetchError) {
        // Network error, retry if possible
        if (retries > 0) {
          await new Promise((resolve) => setTimeout(resolve, 1000));
          retries--;
        } else {
          throw fetchError;
        }
      }
    }

    if (!response.ok) {
      try {
        const errorData = await response.json();

        // Special handling for the 5-minute buffer message
        if (
          errorData.message &&
          errorData.message.includes("less than 5 minutes")
        ) {
          return errorData; // Return this as a valid response
        }

        throw new Error(errorData.err || "Failed to record attendance");
      } catch (jsonError) {
        // If JSON parsing fails, use status code
        throw new Error(`Failed to record attendance: ${response.status}`);
      }
    }

    return await response.json();
  } catch (err) {
    console.error("Attendance scan error:", err);
    throw err;
  }
};

const getAttendanceById = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (!response.ok) {
      console.error(`Error fetching attendance: ${response.status}`);
      return null;
    }

    return await response.json();
  } catch (err) {
    console.error("Error:", err);
    return null;
  }
};

const deleteAttendance = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.err || "Failed to delete attendance record");
    }

    return await response.json();
  } catch (err) {
    throw new Error(`Failed to delete attendance record: ${err.message}`);
  }
};

export default {
  getAllAttendance,
  getFilteredAttendance,
  postScanToday,
  getAttendanceById,
  deleteAttendance,
};
