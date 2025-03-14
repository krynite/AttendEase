const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/student`;

const studentListAll = async () => {
  try {
    const response = await fetch(`${BASE_URL}/all`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      //   body: JSON.stringify({ status:  }),
    });

    if (!response.ok) {
      throw new Error(`Failed in listing All students.`);
    }

    const data = await response.json();
    return data;
  } catch (err) {
    throw new Error(`Failed in listing All students : ${err.message}`);
  }
};

export default {
  studentListAll,
};
