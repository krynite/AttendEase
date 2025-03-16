const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/attendance`;

const getAllAttendance = async () => {
  try {
    const response = await fetch(BASE_URL, {
      method: "GET",
      headers: {
        "Content-Type": "applicatiopn/json",
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
  try {
    // Use POST with request body instead of query params
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
    throw new Error(`Failed to fetch filtered attendance: ${err.message}`);
  }
};

export default {
  getAllAttendance,
  getFilteredAttendance,
};
