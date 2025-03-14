const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/students`;

const getAllStudents = async () => {
  try {
    const response = await fetch(BASE_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch students: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (err) {
    throw new Error(`Failed to fetch students: ${err.message}`);
  }
};

// For when you need to get a specific student by ID
const getStudentById = async (studentId) => {
  try {
    const response = await fetch(`${BASE_URL}/${studentId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch student: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (err) {
    throw new Error(`Failed to fetch student: ${err.message}`);
  }
};

export default {
  getAllStudents,
  getStudentById,
};
