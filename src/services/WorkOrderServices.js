import axios from "axios";

const API_BASE_URL = "http://localhost:5000";

export const addWorkOrder = (itemData) => {
  return axios
    .post(`${API_BASE_URL}/addworkorder`, { ...itemData })
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error adding item:", error);
      throw error; // Re-throw the error to handle it in the component
    });
};
