import axios from "axios";
import ApiUrl from "../config/ApiUrl";

export const addWorkOrder = (itemData) => {
  return axios
    .post(`${ApiUrl.API_BASE_URL}/addworkorder`, { ...itemData })
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error adding item:", error);
      throw error; // Re-throw the error to handle it in the component
    });
};
