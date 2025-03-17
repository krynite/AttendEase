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

// New search, CORRRECTION!!
const getFilteredStudents = async (filters) => {
  console.log(`FILTERS ${filters}`);
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
      throw new Error(`Failed to fetch filtered students: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (err) {
    throw new Error(`Failed to fetch filtered students: ${err.message}`);
  }
};

const getSchoolOptions = async () => {
  try {
    const response = await fetch(`${BASE_URL}/school-options`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (!response.ok) {
      return { schools: [], totalCount: 0 };
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error(`Failed to fetch school options: ${err.message}`);
    return { schools: [], totalCount: 0 };
  }
};

const updateStudent = async (studentId, studentData) => {
  try {
    const response = await fetch(`${BASE_URL}/${studentId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(studentData),
    });

    if (!response.ok) {
      throw new Error(`Failed to update student: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (err) {
    throw new Error(`Failed to update student: ${err.message}`);
  }
};

export default {
  getAllStudents,
  getStudentById,
  getFilteredStudents,
  getSchoolOptions,
  updateStudent,
};
